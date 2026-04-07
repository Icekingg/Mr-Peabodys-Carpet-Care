import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import rateLimit from "express-rate-limit";

const HOUSECALL_PRO_API_KEY = process.env.HOUSECALL_PRO_API_KEY || "";
const HOUSECALL_PRO_BASE_URL = "https://api.housecallpro.com";

async function housecallProRequest(endpoint: string, method: string, body?: any) {
  const res = await fetch(`${HOUSECALL_PRO_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Authorization": `Token ${HOUSECALL_PRO_API_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`Housecall Pro API error (${endpoint}):`, res.status, data);
    return { success: false, status: res.status, data };
  }
  return { success: true, status: res.status, data };
}

async function uploadFileToHousecallPro(endpoint: string, filePath: string, originalName: string) {
  const { Blob } = await import("buffer");
  const fileBuffer = await fs.promises.readFile(filePath);
  const ext = path.extname(originalName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
    ".gif": "image/gif", ".webp": "image/webp", ".heic": "image/heic",
  };
  const mimeType = mimeTypes[ext] || "application/octet-stream";

  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: mimeType });
  formData.append("file", blob as any, originalName);

  const res = await fetch(`${HOUSECALL_PRO_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${HOUSECALL_PRO_API_KEY}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Housecall Pro file upload error (${endpoint}):`, res.status, errText);
    return { success: false, status: res.status };
  }

  const data = await res.json().catch(() => ({}));
  return { success: true, status: res.status, data };
}

async function sendToHousecallPro(booking: {
  name: string;
  email: string;
  phone: string;
  description: string;
  date: string;
  time: string;
  filePaths: { path: string; originalName: string }[];
}): Promise<string | null> {
  if (!HOUSECALL_PRO_API_KEY) {
    console.warn("Housecall Pro API key not configured, skipping");
    return null;
  }

  try {
    const nameParts = booking.name.trim().split(/\s+/);
    const firstName = nameParts[0] || booking.name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const customerResult = await housecallProRequest("/customers", "POST", {
      first_name: firstName,
      last_name: lastName,
      email: booking.email,
      mobile_number: booking.phone.replace(/\D/g, ""),
      notifications_enabled: true,
    });

    if (!customerResult.success) {
      console.error("Failed to create Housecall Pro customer:", customerResult.data);
      return null;
    }

    const customerId = customerResult.data.id;

    const leadResult = await housecallProRequest("/leads", "POST", {
      customer_id: customerId,
      source: "Website Booking",
      note: `Website Estimate Request\n\nPreferred Date: ${booking.date}\nPreferred Time: ${booking.time}\n\nProject Description:\n${booking.description}`,
    });

    if (!leadResult.success) {
      console.error("Failed to create Housecall Pro lead:", leadResult.data);
      return null;
    }

    const leadId = leadResult.data.id;
    console.log("Successfully created Housecall Pro lead:", leadId);

    if (booking.filePaths.length > 0) {
      const jobResult = await housecallProRequest("/jobs", "POST", {
        customer_id: customerId,
        description: `Photos for Lead ${leadId}\n\nPreferred Date: ${booking.date}\nPreferred Time: ${booking.time}\n\nProject Description:\n${booking.description}`,
      });

      if (jobResult.success) {
        const jobId = jobResult.data.id;
        console.log("Created job for photo attachments:", jobId);

        for (const file of booking.filePaths) {
          try {
            const uploadResult = await uploadFileToHousecallPro(
              `/jobs/${jobId}/attachments`,
              file.path,
              file.originalName
            );
            if (uploadResult.success) {
              console.log(`Uploaded photo to job ${jobId}: ${file.originalName}`);
            } else {
              console.error(`Failed to upload photo ${file.originalName} to job ${jobId}`);
            }
          } catch (uploadErr) {
            console.error(`Error uploading photo ${file.originalName}:`, uploadErr);
          }
        }
      } else {
        console.error("Failed to create job for photo attachments:", jobResult.data);
      }
    }

    return leadId;
  } catch (err) {
    console.error("Housecall Pro integration error:", err);
    return null;
  }
}

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const ALLOWED_IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"]);
const ALLOWED_IMAGE_MIMES = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/heic", "image/heif",
]);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_IMAGE_EXTS.has(ext) && ALLOWED_IMAGE_MIMES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (JPG, PNG, GIF, WEBP, HEIC) are allowed."));
    }
  },
});

const bookingRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many booking requests. Please try again later." },
});

const bookingBodySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required").max(20),
  description: z.string().max(2000).optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").optional().default(""),
  time: z.string().optional().default(""),
  files: z.array(z.string()).optional().default([]),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/bookings", bookingRateLimiter, upload.array("files", 5), async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        files: (req.files as Express.Multer.File[])?.map(f => f.filename) || [],
      };

      const parsed = bookingBodySchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues[0]?.message || "Validation failed" });
      }

      const booking = await storage.createBooking(parsed.data);

      const uploadedFiles = (req.files as Express.Multer.File[] || []).map(f => ({
        path: f.path,
        originalName: f.originalname,
      }));

      sendToHousecallPro({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        description: parsed.data.description,
        date: parsed.data.date,
        time: parsed.data.time,
        filePaths: uploadedFiles,
      }).then((jobOrLeadId) => {
        if (jobOrLeadId) {
          storage.updateBookingLeadId(booking.id, jobOrLeadId).catch(err =>
            console.error("Failed to save Housecall Pro ID:", err)
          );
        }
      });

      return res.status(201).json(booking);
    } catch (err: any) {
      if (err?.constraint === "bookings_date_time_unique") {
        return res.status(409).json({ error: "This time slot is already booked." });
      }
      console.error("Booking error:", err);
      return res.status(500).json({ error: "Failed to create booking." });
    }
  });

  app.get("/api/bookings/slots", async (req, res) => {
    try {
      const { date } = req.query;
      if (!date || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: "Valid date query parameter required (YYYY-MM-DD)." });
      }
      const bookings = await storage.getBookingsByDate(date);
      const bookedTimes = bookings.map(b => b.time);
      return res.json({ bookedTimes });
    } catch (err) {
      console.error("Slots error:", err);
      return res.status(500).json({ error: "Failed to fetch slots." });
    }
  });

  return httpServer;
}
