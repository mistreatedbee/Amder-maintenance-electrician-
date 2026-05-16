import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { SectionLabel } from "@/components/site/Motion";
import { ArrowLeft, ArrowRight, Check, Phone, Sparkles } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: `Book a Service | ${SITE.shortName}` },
      { name: "description", content: "Book a contractor in Johannesburg. Free quotes within 24 hours, emergency callouts available 24/7." },
    ],
  }),
  component: Booking,
});

const URGENCY = [
  { id: "emergency", label: "Emergency", desc: "Same day, ASAP" },
  { id: "soon", label: "This week", desc: "Within 3–5 days" },
  { id: "scheduled", label: "Scheduled", desc: "Pick a date" },
  { id: "quote", label: "Just a quote", desc: "Planning only" },
] as const;

function Booking() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: SERVICES[0].slug,
    urgency: "soon",
    date: "",
    address: "",
    description: "",
    name: "",
    phone: "",
    email: "",
  });

  const steps = ["Service", "Urgency", "Details", "Contact", "Review"];
  const max = steps.length - 1;

  const next = () => setStep((s) => Math.min(max, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => {
    const msg = `Hi Amber, new booking:\n• Service: ${SERVICES.find(s => s.slug === data.service)?.name}\n• Urgency: ${data.urgency}\n• Date: ${data.date || "—"}\n• Address: ${data.address}\n• Description: ${data.description}\n• Name: ${data.name}\n• Phone: ${data.phone}\n• Email: ${data.email}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    toast.success("Booking sent via WhatsApp — we'll respond within 1 hour.");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 pt-8 pb-24 md:pt-16">
      <SectionLabel>Book a service</SectionLabel>
      <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
        Let's get your job <span className="text-amber-gradient">on the calendar.</span>
      </h1>

      <div className="mt-10 flex items-center gap-2 text-xs">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold ${i <= step ? "bg-amber-gradient text-background" : "bg-secondary text-muted-foreground"}`}>
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={`hidden text-[11px] uppercase tracking-[0.18em] sm:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-amber" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border/60 bg-card/60 p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.35 }}>
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl">Which service do you need?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => (
                    <button key={s.slug} onClick={() => setData({ ...data, service: s.slug })} className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${data.service === s.slug ? "border-amber/60 bg-amber/5 ring-amber" : "border-border/60 hover:border-amber/30"}`}>
                      <img src={s.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.short}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl">How urgent is it?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {URGENCY.map((u) => (
                    <button key={u.id} onClick={() => setData({ ...data, urgency: u.id })} className={`rounded-xl border p-5 text-left transition-all ${data.urgency === u.id ? "border-amber/60 bg-amber/5 ring-amber" : "border-border/60 hover:border-amber/30"}`}>
                      <div className="font-display text-lg">{u.label}</div>
                      <div className="text-xs text-muted-foreground">{u.desc}</div>
                    </button>
                  ))}
                </div>
                {data.urgency === "scheduled" && (
                  <div className="mt-5">
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preferred date</label>
                    <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus:border-amber/60 focus:outline-none" />
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl">Job details</h2>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Address / area</label>
                  <input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} placeholder="e.g. 12 Rivonia Rd, Sandton" className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus:border-amber/60 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Describe the job</label>
                  <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={5} placeholder="Tell us a bit about what needs doing…" className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus:border-amber/60 focus:outline-none" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl">How can we reach you?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
                  <Field label="Phone" type="tel" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
                </div>
                <Field label="Email" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl">Review & send</h2>
                <dl className="mt-6 grid gap-3 text-sm">
                  {[
                    ["Service", SERVICES.find(s => s.slug === data.service)?.name],
                    ["Urgency", URGENCY.find(u => u.id === data.urgency)?.label],
                    ["Date", data.date || "—"],
                    ["Address", data.address || "—"],
                    ["Description", data.description || "—"],
                    ["Name", data.name || "—"],
                    ["Phone", data.phone || "—"],
                    ["Email", data.email || "—"],
                  ].map(([k, v]) => (
                    <div key={k as string} className="flex justify-between gap-4 border-b border-border/40 pb-2">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 rounded-xl border border-amber/30 bg-amber/5 p-4 text-xs text-muted-foreground">
                  <Sparkles className="mb-1 inline h-3.5 w-3.5 text-amber" /> Pressing submit sends your booking to our team via WhatsApp for fastest response.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/50 px-5 py-2.5 text-sm font-medium disabled:opacity-40">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < max ? (
            <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-amber-gradient px-6 py-2.5 text-sm font-semibold text-background shadow-glow">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-amber-gradient px-6 py-2.5 text-sm font-semibold text-background shadow-glow">
              Send booking <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
        <span>or call us directly</span>
        <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-4 py-2 font-medium text-foreground hover:text-amber">
          <Phone className="h-4 w-4 text-amber" /> {SITE.phones[0]}
        </a>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus:border-amber/60 focus:outline-none" />
    </div>
  );
}
