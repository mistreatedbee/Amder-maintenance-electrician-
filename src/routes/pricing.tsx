import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, SITE } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";

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
    featured: false,
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
    featured: false,
  },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <div className="pt-40 pb-16 px-6 md:px-12 border-b border-[#E4DDD0]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Pricing</SectionLabel>
          <RevealClip className="mt-6">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
              }}
            >
              Fair pricing.
            </h1>
          </RevealClip>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-[#7A7068]">
              Every project starts with a free written quote. These starting points give you an
              idea of where we land.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Tiers */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-28">
        <RevealLine />
        <div className="mt-0 grid gap-0 md:grid-cols-3 md:divide-x md:divide-[#E4DDD0]">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className={`px-0 py-12 md:px-10 ${t.featured ? "relative" : ""}`}>
                {t.featured && (
                  <span className="inline-block mb-4 text-[0.55rem] uppercase tracking-[0.25em] text-[#C09A52] border border-[#C09A52] px-3 py-1">
                    Most booked
                  </span>
                )}
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#7A7068]">{t.name}</p>
                <p
                  className="mt-3 font-serif font-light text-[#1A1916]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                  }}
                >
                  {t.price}
                </p>
                <p className="mt-2 text-sm font-light text-[#7A7068]">{t.blurb}</p>
                <div className="my-7 h-px bg-[#E4DDD0]" />
                <ul className="space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C09A52]" />
                      <span className="font-light text-[#1A1916]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`mt-8 inline-flex border px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                    t.featured
                      ? "border-[#C09A52] text-[#C09A52] hover:bg-[#C09A52] hover:text-white"
                      : "border-[#1A1916]/30 text-[#1A1916]/60 hover:border-[#1A1916] hover:text-[#1A1916]"
                  }`}
                >
                  Request quote →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Service starting points */}
      <div className="bg-[#F0EAE0] py-20 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Per service</SectionLabel>
          <h2
            className="mt-5 font-serif font-light text-[#1A1916] mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            Service starting points
          </h2>
          <RevealLine />
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex items-center justify-between gap-8 py-5 border-b border-[#E4DDD0]">
              <div>
                <p className="text-sm font-light text-[#1A1916]">{s.name}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.15em] text-[#7A7068] mt-0.5">{s.short}</p>
              </div>
              <p
                className="font-serif font-light text-[#C09A52] shrink-0"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}
              >
                {s.startingFrom}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
