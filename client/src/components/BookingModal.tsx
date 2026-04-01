import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Phone, Upload, X, CheckCircle2, Loader2, Clock } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";

const PHONE_NUMBER = "(408) 254-1949";
const PHONE_TEL = "tel:+14082541949";

const TIME_SLOTS = [
  "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
];

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showNumber, setShowNumber] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const bookingMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("date", preferredDate);
      formData.append("time", selectedTime);
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit");
      }
      return res.json();
    },
    onSuccess: () => {
      setStep("success");
    },
    onError: (err: Error) => {
      toast({
        title: "Submission Failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const canSubmit =
    name.trim() &&
    email.trim() &&
    phone.trim().length >= 7 &&
    !bookingMutation.isPending;

  const resetForm = () => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setFiles([]);
    setShowNumber(false);
    setPreferredDate("");
    setSelectedTime("");
  };

  const handleClose = (val: boolean) => {
    if (!val) resetForm();
    onOpenChange(val);
  };

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md" data-testid="booking-success-dialog">
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-serif text-center">Request Submitted!</DialogTitle>
              <DialogDescription className="text-center">
                Your cleaning request has been sent. We'll be in touch at{" "}
                <span className="font-semibold text-foreground">{email}</span>.
                {preferredDate && (
                  <> We'll confirm your appointment for{" "}
                  <span className="font-semibold text-foreground">
                    {new Date(preferredDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                  {selectedTime && <>{" "}at <span className="font-semibold text-foreground">{selectedTime}</span></>}.</>
                )}
              </DialogDescription>
            </DialogHeader>
            <a href={PHONE_TEL} data-testid="link-call-success">
              <Button
                data-testid="button-call-success"
                className="bg-accent text-accent-foreground font-semibold border border-accent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call {PHONE_NUMBER}
              </Button>
            </a>
            <Button
              data-testid="button-close-success"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" data-testid="booking-dialog">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif flex items-center gap-2">
            <Phone className="w-5 h-5 text-accent" />
            Book a Cleaning
          </DialogTitle>
          <DialogDescription>
            Fill in your details and pick a preferred date and time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking-name">Name</Label>
            <Input
              id="booking-name"
              data-testid="input-booking-name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-email">Email</Label>
            <Input
              id="booking-email"
              data-testid="input-booking-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-phone">Phone Number</Label>
            <Input
              id="booking-phone"
              data-testid="input-booking-phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Preferred Date <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <BookingCalendar
                value={preferredDate}
                onChange={setPreferredDate}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Time <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger data-testid="select-time" className={!selectedTime ? 'text-muted-foreground' : ''}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <SelectValue placeholder="Pick a time" />
                  </div>
                </SelectTrigger>
                <SelectContent className="z-[60] max-h-[200px]">
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time} data-testid={`option-time-${time}`}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-description">Describe Your Needs <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Textarea
              id="booking-description"
              data-testid="input-booking-description"
              placeholder="Tell us about your carpet care needs - rooms, stains, pets, etc..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Attach Photos (optional, max 5)</Label>
            <div
              data-testid="file-upload-area"
              className="border-2 border-dashed rounded-md p-3 text-center cursor-pointer transition-colors border-muted-foreground/25 hover:border-accent/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Click to upload images</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                data-testid="input-file-upload"
              />
            </div>
            {files.length > 0 && (
              <div className="space-y-1">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-muted rounded-md px-2 py-1">
                    <span className="truncate flex-1">{f.name}</span>
                    <button
                      type="button"
                      data-testid={`button-remove-file-${i}`}
                      onClick={() => removeFile(i)}
                      className="text-muted-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <Button
            data-testid="button-submit-booking"
            className="w-full bg-accent text-accent-foreground font-semibold tracking-wide border border-accent"
            disabled={!canSubmit}
            onClick={() => bookingMutation.mutate()}
          >
            {bookingMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit Request"
            )}
          </Button>

          <div className="relative flex items-center gap-2">
            <div className="flex-1 border-t border-muted-foreground/20" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
            <div className="flex-1 border-t border-muted-foreground/20" />
          </div>

          {showNumber ? (
            <a href={PHONE_TEL} className="block" data-testid="link-call-number">
              <Button
                variant="outline"
                className="w-full font-semibold"
                data-testid="button-call-number"
              >
                <Phone className="w-4 h-4 mr-2" />
                {PHONE_NUMBER}
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              className="w-full font-semibold"
              data-testid="button-call-to-book"
              onClick={() => {
                const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                if (isMobile) {
                  window.location.href = PHONE_TEL;
                } else {
                  setShowNumber(true);
                }
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call to Book Instead
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
