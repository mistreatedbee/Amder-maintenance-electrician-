import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, SITE } from "@/lib/site";
import { Reveal, SectionLabel } from "@/components/site/Motion";
import { ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: `Services | ${SITE.name}` },
      { name: "description", content: "Electrical, plumbing, renovations, ceilings, tiling, welding, drywall, carports and maintenance across Johannesburg." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-12 md:pt-20">
        <SectionLabel>Our services</SectionLabel>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Ten trades. <span className="text-amber-gradient">One trusted team.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          From a single light fitting to a full home renovation — we handle every stage in-house and accountable to a single project manager.
        </p>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-500 hover:border-amber/40 hover:shadow-glow"
              >
                <div className="grid items-stretch sm:grid-cols-[1fr_1.1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                    <img src={s.image} alt={s.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card/40 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col justify-between gap-6 p-7 md:p-10">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber">From {s.startingFrom}</div>
                      <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{s.name}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="h-3.5 w-3.5 text-amber" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber">
                      Explore service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
