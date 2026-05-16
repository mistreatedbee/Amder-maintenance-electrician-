import { createFileRoute } from "@tanstack/react-router";
import { FAQS, SITE } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";
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
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <div className="pt-40 pb-16 px-6 md:px-12 border-b border-[#E4DDD0]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>FAQs</SectionLabel>
          <RevealClip className="mt-6">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
              }}
            >
              Quick answers.
            </h1>
          </RevealClip>
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="mx-auto max-w-3xl px-6 md:px-12 py-20 md:py-28">
        <RevealLine />
        {FAQS.map((f, i) => (
          <div key={f.q} className="border-b border-[#E4DDD0]">
            <Reveal delay={i * 0.04}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-8 py-6 text-left group"
              >
                <span
                  className={`font-serif font-light leading-snug transition-colors duration-300 ${
                    open === i ? "text-[#C09A52]" : "text-[#1A1916] group-hover:text-[#C09A52]"
                  }`}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  }}
                >
                  {f.q}
                </span>
                <span
                  className={`shrink-0 mt-1 text-[0.7rem] transition-all duration-300 ${
                    open === i ? "text-[#C09A52] rotate-45" : "text-[#C4B49E]"
                  }`}
                  style={{ display: "inline-block" }}
                >
                  +
                </span>
              </button>
            </Reveal>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 text-sm font-light leading-relaxed text-[#7A7068]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
