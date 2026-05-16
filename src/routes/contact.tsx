import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SITE, waLink } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${SITE.shortName}` },
      { name: "description", content: `Get in touch with ${SITE.shortName} in Johannesburg CBD.` },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name || !f.message) return toast.error("Please add your name and message.");
    window.open(waLink(`Hi Amber, my name is ${f.name}. ${f.message}`), "_blank", "noopener,noreferrer");
    toast.success("Sent to WhatsApp — we'll reply within an hour.");
    setF({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <div className="pt-40 pb-16 px-6 md:px-12 border-b border-[#E4DDD0]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Get in touch</SectionLabel>
          <RevealClip className="mt-6">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
              }}
            >
              Let's talk.
            </h1>
          </RevealClip>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24 lg:items-start">
          {/* Form */}
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-10">
              <h2
                className="font-serif font-light text-[#1A1916]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                }}
              >
                Send a message
              </h2>
              <RevealLine />
              <div className="grid gap-10 sm:grid-cols-2">
                <LuxField label="Name *" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
                <LuxField label="Phone" type="tel" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} />
              </div>
              <LuxField label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
              <div>
                <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#7A7068] mb-3">
                  Message *
                </label>
                <textarea
                  value={f.message}
                  onChange={(e) => setF({ ...f, message: e.target.value })}
                  rows={5}
                  placeholder="Describe what you need…"
                  className="w-full bg-transparent border-b border-[#E4DDD0] pb-2 text-sm font-light text-[#1A1916] placeholder:text-[#C4B49E] focus:outline-none focus:border-[#C09A52] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex border border-[#C09A52] px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300"
              >
                Send via WhatsApp →
              </button>
            </form>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.15}>
            <div className="space-y-0">
              {[
                { label: "Phone", value: SITE.phones[0], href: `tel:${SITE.phones[0].replace(/\s/g, "")}` },
                { label: "Phone 2", value: SITE.phones[1], href: `tel:${SITE.phones[1].replace(/\s/g, "")}` },
                { label: "WhatsApp", value: "Start a chat", href: waLink(), external: true },
                { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { label: "Location", value: SITE.location },
                { label: "Hours", value: SITE.hours },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-start justify-between gap-8 py-5">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#7A7068] shrink-0 pt-0.5">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-sm font-light text-[#1A1916] hover:text-[#C09A52] transition-colors text-right"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-light text-[#1A1916] text-right">{item.value}</span>
                    )}
                  </div>
                  <div className="h-px bg-[#E4DDD0]" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Map */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-24">
        <div className="overflow-hidden">
          <iframe
            title="Johannesburg CBD"
            src="https://www.google.com/maps?q=Johannesburg+CBD&output=embed"
            className="h-[360px] w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

function LuxField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#7A7068] mb-3">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-[#E4DDD0] pb-2 text-sm font-light text-[#1A1916] placeholder:text-[#C4B49E] focus:outline-none focus:border-[#C09A52] transition-colors"
      />
    </div>
  );
}
