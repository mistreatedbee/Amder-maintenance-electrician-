import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SERVICES, SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: `Book a Service | ${SITE.name}` },
      { name: "description", content: "Request a free quote or book a service from Amber Maintenance & Electrical." },
    ],
  }),
  component: BookingPage,
});

const STEPS = ["Service", "Timing", "Details", "Contact", "Review"];

const URGENCY_OPTIONS = [
  { id: "emergency", label: "Emergency", sub: "Need help now" },
  { id: "soon", label: "This week", sub: "Within 7 days" },
  { id: "scheduled", label: "Schedule", sub: "Pick a date" },
  { id: "quote", label: "Quote only", sub: "No rush" },
];

type FormData = {
  service: string;
  urgency: string;
  date: string;
  address: string;
  description: string;
  name: string;
  phone: string;
  email: string;
};

const EASE = [0.76, 0, 0.24, 1] as const;

function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    service: "",
    urgency: "",
    date: "",
    address: "",
    description: "",
    name: "",
    phone: "",
    email: "",
  });

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canNext = [
    !!form.service,
    !!form.urgency,
    !!form.address,
    !!form.name && !!form.phone,
    true,
  ][step];

  function handleSend() {
    const svc = SERVICES.find((s) => s.slug === form.service);
    const msg = [
      `*New Booking Request*`,
      `Service: ${svc?.name ?? form.service}`,
      `Urgency: ${form.urgency}`,
      form.date ? `Date: ${form.date}` : null,
      `Address: ${form.address}`,
      form.description ? `Details: ${form.description}` : null,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank");
    toast.success("Opening WhatsApp with your request.");
  }

  return (
    <div className="min-h-screen bg-[#1A1916]">
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-white/10">
        <motion.div
          className="h-full bg-[#C09A52]"
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24 md:px-12">
        {/* Step indicator */}
        <div className="mb-12 flex items-center gap-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <button
                onClick={() => i < step && setStep(i)}
                className={`text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  i === step
                    ? "text-white"
                    : i < step
                    ? "text-[#C09A52] cursor-pointer hover:text-white"
                    : "text-white/20"
                }`}
              >
                {s}
              </button>
              {i < STEPS.length - 1 && (
                <span className={`h-px w-5 ${i < step ? "bg-[#C09A52]/60" : "bg-white/15"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {step === 0 && <StepService form={form} set={set} />}
            {step === 1 && <StepTiming form={form} set={set} />}
            {step === 2 && <StepDetails form={form} set={set} />}
            {step === 3 && <StepContact form={form} set={set} />}
            {step === 4 && <StepReview form={form} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
              className={`inline-flex border px-8 py-3 text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                canNext
                  ? "border-[#C09A52] text-[#C09A52] hover:bg-[#C09A52] hover:text-white"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSend}
              className="inline-flex border border-[#C09A52] bg-[#C09A52] px-8 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-white hover:bg-[#D4AF6A] transition-all duration-300"
            >
              Send via WhatsApp →
            </button>
          )}
        </div>

        {/* Fallback */}
        <p className="mt-8 text-center text-[0.6rem] text-white/20">
          Or call us directly:{" "}
          <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="text-[#C09A52]/70 hover:text-[#C09A52]">
            {SITE.phones[0]}
          </a>
        </p>
      </div>
    </div>
  );
}

/* ── STEP 1: Service ── */
function StepService({ form, set }: { form: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#C09A52] mb-4">Step 01</p>
      <h2
        className="font-serif font-light text-white leading-tight mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        What service do you need?
      </h2>
      <div className="space-y-0">
        {SERVICES.map((s, i) => (
          <div key={s.slug}>
            <button
              onClick={() => set("service", s.slug)}
              className={`w-full flex items-center justify-between py-4 text-left transition-colors duration-200 group ${
                form.service === s.slug ? "text-[#C09A52]" : "text-white/60 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-6">
                <span
                  className="font-serif text-[0.65rem] font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-light">{s.name}</span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#C09A52]/60">
                {s.startingFrom}
              </span>
            </button>
            <div className="h-px bg-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── STEP 2: Timing ── */
function StepTiming({ form, set }: { form: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#C09A52] mb-4">Step 02</p>
      <h2
        className="font-serif font-light text-white leading-tight mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        When do you need us?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {URGENCY_OPTIONS.map((u) => (
          <button
            key={u.id}
            onClick={() => set("urgency", u.id)}
            className={`border p-6 text-left transition-all duration-300 ${
              form.urgency === u.id
                ? "border-[#C09A52] text-white"
                : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
            }`}
          >
            <p className="text-sm font-light">{u.label}</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-white/30">{u.sub}</p>
          </button>
        ))}
      </div>
      {form.urgency === "scheduled" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/30 mb-3">
            Preferred date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm font-light text-white focus:outline-none focus:border-[#C09A52] transition-colors"
          />
        </motion.div>
      )}
    </div>
  );
}

/* ── STEP 3: Details ── */
function StepDetails({ form, set }: { form: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#C09A52] mb-4">Step 03</p>
      <h2
        className="font-serif font-light text-white leading-tight mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Tell us about the job.
      </h2>
      <div className="space-y-10">
        <LuxInput
          label="Property address"
          value={form.address}
          onChange={(v) => set("address", v)}
          placeholder="Street, suburb, Johannesburg"
          required
        />
        <div>
          <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/30 mb-3">
            Additional details <span className="text-white/15 normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe what you need done…"
            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#C09A52] transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ── STEP 4: Contact ── */
function StepContact({ form, set }: { form: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#C09A52] mb-4">Step 04</p>
      <h2
        className="font-serif font-light text-white leading-tight mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        How do we reach you?
      </h2>
      <div className="space-y-10">
        <LuxInput label="Your name" value={form.name} onChange={(v) => set("name", v)} placeholder="Full name" required />
        <LuxInput label="Phone number" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+27 __ ___ ____" required />
        <LuxInput label="Email address" value={form.email} onChange={(v) => set("email", v)} placeholder="name@example.com" />
      </div>
    </div>
  );
}

/* ── STEP 5: Review ── */
function StepReview({ form }: { form: FormData }) {
  const svc = SERVICES.find((s) => s.slug === form.service);
  const urgencyLabel = URGENCY_OPTIONS.find((u) => u.id === form.urgency)?.label;

  const rows = [
    { label: "Service", value: svc?.name },
    { label: "Urgency", value: urgencyLabel },
    form.date ? { label: "Date", value: form.date } : null,
    { label: "Address", value: form.address },
    form.description ? { label: "Details", value: form.description } : null,
    { label: "Name", value: form.name },
    { label: "Phone", value: form.phone },
    form.email ? { label: "Email", value: form.email } : null,
  ].filter(Boolean) as { label: string; value: string | undefined }[];

  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#C09A52] mb-4">Step 05</p>
      <h2
        className="font-serif font-light text-white leading-tight mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Review your request.
      </h2>
      <div className="space-y-0">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-8 py-4 border-b border-white/8">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30 shrink-0 pt-0.5">
              {r.label}
            </span>
            <span className="text-sm font-light text-white/80 text-right">{r.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs font-light text-white/30">
        Submitting will open WhatsApp with this request pre-filled. We'll confirm within 2 hours.
      </p>
    </div>
  );
}

/* ── Luxury Input ── */
function LuxInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/30 mb-3">
        {label}
        {required && <span className="ml-1 text-[#C09A52]">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/20 pb-2 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#C09A52] transition-colors"
      />
    </div>
  );
}
