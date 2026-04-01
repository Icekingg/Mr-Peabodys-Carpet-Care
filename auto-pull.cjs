const https = require("https");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO = "Icekingg/Mr-Peabodys-Carpet-Care";
const BRANCH = "main";
const ROOT = __dirname;

function apiGet(url) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { "User-Agent": "auto-pull", "Accept": "application/vnd.github.v3+json" } };
    https.get(url, opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch { reject(new Error("JSON parse failed")); }
      });
    }).on("error", reject);
  });
}

function getLocalHead() {
  try {
    return fs.readFileSync(path.join(ROOT, ".git/refs/heads/main"), "utf8").trim();
  } catch {
    try {
      const head = fs.readFileSync(path.join(ROOT, ".git/HEAD"), "utf8").trim();
      if (head.startsWith("ref: ")) {
        const ref = head.slice(5);
        return fs.readFileSync(path.join(ROOT, ".git", ref), "utf8").trim();
      }
      return head;
    } catch { return null; }
  }
}

function applyGitPull() {
  const gitCandidates = [
    "git",
    "/usr/bin/git",
    "/usr/local/bin/git",
    "/home/runner/.nix-profile/bin/git",
    "/nix/var/nix/profiles/default/bin/git",
  ];
  for (const g of gitCandidates) {
    try {
      execSync(`${g} pull origin main`, { stdio: "inherit", shell: true });
      return true;
    } catch {}
  }
  return false;
}

async function check() {
  try {
    const data = await apiGet(`https://api.github.com/repos/${REPO}/commits/${BRANCH}`);
    const remotesha = data.sha;
    if (!remotesha) return;

    const localsha = getLocalHead();
    if (localsha === remotesha) return;

    const time = new Date().toLocaleTimeString();
    console.log(`${time} New changes detected (${remotesha.slice(0,7)}), pulling...`);

    const pulled = applyGitPull();
    if (!pulled) {
      console.log("git not found in PATH, trying GitHub API file sync...");
      const compare = await apiGet(
        `https://api.github.com/repos/${REPO}/compare/${localsha}...${remotesha}`
      );
      if (compare.files) {
        for (const file of compare.files) {
          if (file.status === "removed") continue;
          try {
            const raw = await new Promise((resolve, reject) => {
              const url = `https://raw.githubusercontent.com/${REPO}/${remotesha}/${file.filename}`;
              https.get(url, { headers: { "User-Agent": "auto-pull" } }, (res) => {
                let d = "";
                res.on("data", (c) => (d += c));
                res.on("end", () => resolve(d));
              }).on("error", reject);
            });
            const dest = path.join(ROOT, file.filename);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, raw);
            console.log(`  Updated: ${file.filename}`);
          } catch (e) {
            console.log(`  Failed: ${file.filename} - ${e.message}`);
          }
        }
        fs.writeFileSync(path.join(ROOT, ".git/refs/heads/main"), remotesha + "\n");
        console.log("Sync complete.");
      }
    }
  } catch {}
}

console.log("Auto-pull started. Checking for updates every 5 seconds...");
setInterval(check, 5000);
