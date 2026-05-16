import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, SITE } from "@/lib/site";
import { SectionLabel } from "@/components/site/Motion";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: `Pricing | ${SITE.shortName}` },
      { name: "description", content: "Transparent starting prices for our most-booked contracting services in Johannesburg." },
    ],
  }),
  component: PricingPage,
});

const TIERS = [
  {
    name: "Callout",
    price: "R 450",
    blurb: "On-site diagnosis & minor fix.",
    features: ["Within 30km of CBD", "Up to 1 hour on-site", "Written report", "Quote for further work"],
  },
  {
    name: "Project",
    price: "From R 5,000",
    blurb: "Single-trade installations & repairs.",
    features: ["Free site visit", "Itemised quotation", "All materials supplied", "12-month workmanship guarantee"],
    featured: true,
  },
  {
    name: "Full build",
    price: "By quotation",
    blurb: "Renovations & multi-trade builds.",
    features: ["Dedicated project manager", "3D plans on request", "Weekly progress updates", "Snag list & handover"],
  },
];

function PricingPage() {
  return (
    <>
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-12 md:pt-20">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Fair pricing. <span className="text-amber-gradient">Zero surprises.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Every project starts with a free written quote. These starting points give you an idea of where we land.
        </p>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className={`relative flex flex-col rounded-3xl border bg-card/60 p-8 ${t.featured ? "border-amber/40 shadow-glow" : "border-border/60"}`}>
              {t.featured && <span className="absolute -top-3 left-8 rounded-full bg-amber-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-background">Most booked</span>}
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.name}</div>
              <div className="mt-3 font-display text-5xl font-bold text-amber-gradient">{t.price}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <ul className="mt-6 grid gap-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" /> {f}</li>
                ))}
              </ul>
              <Link to="/booking" className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${t.featured ? "bg-amber-gradient text-background" : "border border-border/80 hover:border-amber/50 hover:text-amber"}`}>
                Request quote
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Service starting points</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/60 p-5">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.short}</div>
              </div>
              <div className="font-display text-lg text-amber-gradient">{s.startingFrom}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
