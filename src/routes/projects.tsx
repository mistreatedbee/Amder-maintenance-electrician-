import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES, SITE } from "@/lib/site";
import { Reveal, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects | ${SITE.shortName}` },
      { name: "description", content: "A gallery of recent projects across Johannesburg: electrical, renovations, ceilings, plumbing and commercial work." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [cat, setCat] = useState<(typeof PROJECT_CATEGORIES)[number]>("All");
  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <>
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-10 md:pt-20">
        <SectionLabel>Selected work</SectionLabel>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Crafted by hand. <span className="text-amber-gradient">Powered by precision.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Browse a selection of recent installs, renovations and commercial fit-outs across Johannesburg.
        </p>

        <div className="mask-fade-x mt-10 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === c && (
                  <motion.span layoutId="proj-pill" className="absolute inset-0 rounded-full bg-amber-gradient" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <AnimatePresence mode="popLayout">
          <div className="grid auto-rows-[260px] grid-cols-2 gap-3 md:auto-rows-[300px] md:grid-cols-4 md:gap-4">
            {filtered.map((p, i) => {
              const span = p.span === "wide" ? "md:col-span-2 md:row-span-2" : p.span === "tall" ? "md:row-span-2" : "";
              return (
                <Reveal key={p.title} delay={(i % 4) * 0.05}>
                  <motion.div
                    layout
                    className={`group relative h-full w-full overflow-hidden rounded-2xl border border-border/60 ${span}`}
                  >
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">{p.category} • {p.area}</div>
                      <div className="mt-1 font-display text-lg font-semibold md:text-xl">{p.title}</div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </AnimatePresence>
      </section>
    </>
  );
}
