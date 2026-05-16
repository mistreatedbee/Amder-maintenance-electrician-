import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SITE, waLink } from "@/lib/site";
import { Reveal, SectionLabel } from "@/components/site/Motion";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${SITE.shortName}` },
      { name: "description", content: `Get in touch with ${SITE.shortName} in Johannesburg CBD. Phone, WhatsApp, email or visit us.` },
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
    <>
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-12 md:pt-20">
        <SectionLabel>Get in touch</SectionLabel>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Let's talk about your <span className="text-amber-gradient">next project.</span>
        </h1>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <form onSubmit={onSubmit} className="rounded-3xl border border-border/60 bg-card/60 p-6 md:p-10">
            <h2 className="font-display text-2xl">Send a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
              <Field label="Phone" type="tel" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} />
            </div>
            <div className="mt-4">
              <Field label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
            </div>
            <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
              <textarea value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} rows={6} className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus:border-amber/60 focus:outline-none" />
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-gradient px-6 py-3 text-sm font-semibold text-background shadow-glow">
              <Send className="h-4 w-4" /> Send message
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4">
            <ContactCard icon={Phone} title="Call" body={SITE.phones.join(" • ")} href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} />
            <ContactCard icon={MessageCircle} title="WhatsApp" body="Tap to start chat" href={waLink()} external />
            <ContactCard icon={Mail} title="Email" body={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactCard icon={MapPin} title="Visit" body={SITE.location} href="#map" />
          </div>
        </Reveal>
      </section>

      <section id="map" className="mx-auto max-w-7xl px-4 pb-24">
        <div className="overflow-hidden rounded-3xl border border-border/60">
          <iframe
            title="Johannesburg CBD"
            src="https://www.google.com/maps?q=Johannesburg+CBD&output=embed"
            className="h-[420px] w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
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

function ContactCard({ icon: Icon, title, body, href, external = false }: { icon: any; title: string; body: string; href: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-center gap-5 rounded-2xl border border-border/60 bg-card/60 p-6 transition-all hover:border-amber/40 hover:shadow-glow">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber/10 text-amber"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
        <div className="mt-1 font-display text-base font-semibold group-hover:text-amber">{body}</div>
      </div>
    </a>
  );
}
