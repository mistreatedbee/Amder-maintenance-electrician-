import { createFileRoute } from "@tanstack/react-router";
import { FAQS, SITE } from "@/lib/site";
import { SectionLabel } from "@/components/site/Motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: `FAQs | ${SITE.shortName}` },
      { name: "description", content: "Answers to common questions about our contracting services across Johannesburg." },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-4 pt-12 pb-24 md:pt-20">
      <SectionLabel>FAQs</SectionLabel>
      <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
        Quick <span className="text-amber-gradient">answers.</span>
      </h1>
      <div className="mt-12 grid gap-3">
        {FAQS.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-border/60 bg-card/60">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 p-6 text-left">
              <span className="font-display text-base font-semibold md:text-lg">{f.q}</span>
              <Plus className={`h-5 w-5 shrink-0 text-amber transition-transform ${open === i ? "rotate-45" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
