import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES, SITE } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects | ${SITE.name}` },
      { name: "description", content: "Browse our portfolio of premium electrical, renovation and construction projects across Johannesburg." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <div className="pt-40 pb-16 px-6 md:px-12 border-b border-[#E4DDD0]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our work</SectionLabel>
          <RevealClip className="mt-6">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
              }}
            >
              Selected Projects
            </h1>
          </RevealClip>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-[#7A7068]">
              A curated selection of our finest work across Johannesburg — from
              precision electrical installations to complete property transformations.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-20 z-30 bg-[#F7F3EC]/95 backdrop-blur-sm border-b border-[#E4DDD0]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex items-center gap-0 overflow-x-auto">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative shrink-0 px-5 py-4 text-[0.6rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                  active === cat
                    ? "text-[#1A1916]"
                    : "text-[#7A7068] hover:text-[#1A1916]"
                }`}
              >
                {cat}
                {active === cat && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#1A1916]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 md:auto-rows-[240px]"
          >
            {filtered.map((p, i) => {
              const spanClass =
                p.span === "wide"
                  ? "md:col-span-2"
                  : p.span === "tall"
                  ? "md:row-span-2"
                  : "";
              const mobileAspect =
                p.span === "tall"
                  ? "aspect-[2/3]"
                  : p.span === "wide"
                  ? "aspect-video"
                  : "aspect-square";

              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className={`group relative overflow-hidden ${spanClass} ${mobileAspect} md:aspect-auto`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1400 group-hover:scale-[1.05]"
                  />
                  {/* Overlay slides up on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    <p className="text-[0.5rem] uppercase tracking-[0.25em] text-[#C09A52]">
                      {p.category} · {p.area}
                    </p>
                    <p
                      className="mt-1 font-serif font-light text-white text-base md:text-lg"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {p.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl font-light italic text-[#C4B49E]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-[#1A1916] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p
            className="font-serif font-light italic text-white/80"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Ready to start your project?
          </p>
          <a
            href="/booking"
            className="inline-flex border border-[#C09A52] px-7 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300 self-start md:self-auto"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}
