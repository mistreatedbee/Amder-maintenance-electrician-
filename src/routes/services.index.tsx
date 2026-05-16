import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, SITE } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: `Services | ${SITE.name}` },
      { name: "description", content: "Premium electrical, plumbing, renovations, ceilings, welding and property maintenance in Johannesburg." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Page header */}
      <div className="pt-40 pb-16 px-6 md:px-12 border-b border-[#E4DDD0]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>What we offer</SectionLabel>
          <RevealClip className="mt-6">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
              }}
            >
              Our Services
            </h1>
          </RevealClip>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-[#7A7068]">
              Ten specialist trades under one roof. From emergency callouts to
              full luxury renovations — one contractor, one invoice, zero hassle.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Editorial numbered list */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-24">
        {/* Desktop: split layout with image preview */}
        <div className="hidden md:grid md:grid-cols-[1fr_420px] md:gap-16 md:items-start">
          {/* Left: numbered list */}
          <div>
            {SERVICES.map((s, i) => (
              <div key={s.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex items-start gap-8 py-8 transition-colors"
                    onMouseEnter={() => setHovered(s.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Number */}
                    <span
                      className={`font-serif text-[0.7rem] font-light pt-1 shrink-0 transition-colors duration-300 ${
                        hovered === s.slug ? "text-[#C09A52]" : "text-[#C4B49E]"
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Service info */}
                    <div className="flex-1 grid grid-cols-[1fr_auto] gap-8 items-start">
                      <div>
                        <h2
                          className={`font-serif font-light leading-tight transition-colors duration-300 ${
                            hovered === s.slug ? "text-[#C09A52]" : "text-[#1A1916]"
                          }`}
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                          }}
                        >
                          {s.name}
                        </h2>
                        <p className="mt-2 text-sm font-light text-[#7A7068] max-w-md">
                          {s.short}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#C09A52]">
                          From {s.startingFrom}
                        </p>
                        <p
                          className={`mt-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                            hovered === s.slug ? "text-[#C09A52]" : "text-[#C4B49E]"
                          }`}
                        >
                          Explore →
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
                <RevealLine delay={i * 0.03} />
              </div>
            ))}
          </div>

          {/* Right: sticky image preview */}
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={SERVICES.find((s) => s.slug === hovered)?.image}
                    alt={hovered}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="aspect-[3/4] bg-[#E4DDD0] flex items-end p-8"
                >
                  <p
                    className="font-serif text-2xl font-light italic text-[#C4B49E]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Hover a service to preview
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: list layout */}
        <div className="md:hidden space-y-0">
          {SERVICES.map((s, i) => (
            <div key={s.slug}>
              <Reveal delay={i * 0.04}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex gap-5 py-6"
                >
                  <span
                    className="font-serif text-[0.65rem] font-light text-[#C4B49E] pt-1 shrink-0"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2
                        className="font-serif font-light text-[#1A1916] text-xl leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {s.name}
                      </h2>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#C09A52] shrink-0 pt-1">
                        {s.startingFrom}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-light text-[#7A7068]">{s.short}</p>
                  </div>
                </Link>
              </Reveal>
              <div className="h-px bg-[#E4DDD0]" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-[#1A1916] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p
            className="font-serif font-light italic text-white/80"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Need something specific?
          </p>
          <div className="flex gap-4">
            <Link
              to="/booking"
              className="inline-flex border border-[#C09A52] px-7 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              className="inline-flex border border-white/20 px-7 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-white/60 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
