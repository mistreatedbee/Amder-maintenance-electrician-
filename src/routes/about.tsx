import { createFileRoute, Link } from "@tanstack/react-router";
import founderImg from "@/assets/founder.jpg";
import { SITE } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About | ${SITE.name}` },
      { name: "description", content: "The story behind Amber Maintenance & Electrical — Johannesburg's premium multi-trade contractors." },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2012", event: "Founded as a two-man electrical crew in Johannesburg CBD." },
  { year: "2015", event: "Expanded into plumbing and property maintenance. First commercial contract." },
  { year: "2018", event: "Launched renovation division. Completed first luxury residential project in Sandton." },
  { year: "2021", event: "Grew to a 20-person multi-trade team. Added welding, ceilings, and drywall." },
  { year: "Today", event: "1,200+ completed projects. Johannesburg's trusted premium contractor." },
];

const VALUES = [
  { num: "01", title: "Precision", body: "Every job is measured twice, done once. We take pride in work that lasts and impresses." },
  { num: "02", title: "Reliability", body: "Quotes are honoured. Schedules are kept. You'll never wonder where we are." },
  { num: "03", title: "Craft", body: "We treat every property as if it were our own — with skill, care, and respect." },
  { num: "04", title: "Integrity", body: "Transparent pricing, honest advice, no upselling. One invoice, no surprises." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EC]">

      {/* ── HERO ── */}
      <div className="relative pt-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12 pt-12 pb-0">
          <SectionLabel>Est. 2012 · Johannesburg</SectionLabel>
          <RevealClip className="mt-6">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.92]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
              }}
            >
              Our Story
            </h1>
          </RevealClip>
        </div>

        {/* Full-bleed cinematic image */}
        <div className="mt-12 mx-6 md:mx-12 overflow-hidden">
          <Reveal>
            <div className="relative aspect-16/7 overflow-hidden">
              <img
                src={founderImg}
                alt="Amber founder and team"
                className="h-full w-full object-cover object-top transition-transform duration-1400 hover:scale-[1.03]"
              />
              {/* Dark overlay panel */}
              <div className="absolute bottom-6 right-6 dark-panel px-6 py-5 hidden sm:block">
                <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/35 mb-2">
                  Levine Petersen · Founder
                </p>
                <div className="h-px bg-[#C09A52]/40 mb-3" />
                <p className="text-xs font-light text-white/70">12+ Years of craft</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── MISSION STATEMENT ── */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <RevealLine />
          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-24 md:items-start">
            <Reveal>
              <h2
                className="font-serif font-light text-[#1A1916] leading-[1.05]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                }}
              >
                Built on trust.{" "}
                <span className="italic">Wired for excellence.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-sm font-light leading-relaxed text-[#7A7068]">
                Amber Maintenance & Electrical began as a two-man electrical crew with one
                obsession: a job done properly, the first time. A decade later we run a
                multi-trade team servicing high-end homes and commercial projects across Gauteng.
              </p>
              <p className="mt-5 text-sm font-light leading-relaxed text-[#7A7068]">
                What started in a single suburb of Johannesburg has grown into a full-service
                property maintenance company trusted by hundreds of homeowners, property managers,
                and commercial clients — all because we never compromised on craft.
              </p>
            </Reveal>
          </div>

          {/* 4 stat columns */}
          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-2 divide-x divide-[#E4DDD0] border border-[#E4DDD0] md:grid-cols-4">
              {[
                { num: "1,200+", label: "Projects Completed" },
                { num: "980+", label: "Happy Clients" },
                { num: "12", label: "Years Experience" },
                { num: "24/7", label: "Emergency Service" },
              ].map((s) => (
                <div key={s.label} className="px-6 py-8 md:px-10">
                  <p
                    className="font-serif text-4xl font-light text-[#1A1916] md:text-5xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {s.num}
                  </p>
                  <p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#7A7068]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#F0EAE0] py-24 md:py-36 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <SectionLabel>How we work</SectionLabel>
              <h2
                className="mt-5 font-serif font-light text-[#1A1916]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                Our core values
              </h2>
            </div>
          </div>
          <RevealLine />
          {VALUES.map((v, i) => (
            <div key={v.num}>
              <Reveal delay={i * 0.06}>
                <div className="grid gap-6 py-8 md:grid-cols-[80px_1fr_1.5fr] md:gap-12 md:items-start">
                  <span
                    className="font-serif text-[0.7rem] font-light text-[#C4B49E]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {v.num}
                  </span>
                  <h3
                    className="font-serif font-light text-[#1A1916]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[#7A7068]">{v.body}</p>
                </div>
              </Reveal>
              <RevealLine delay={i * 0.04} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#F7F3EC]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our journey</SectionLabel>
          <h2
            className="mt-5 font-serif font-light text-[#1A1916] mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            A decade of craft
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-[#E4DDD0] hidden md:block" />

            <div className="space-y-0">
              {TIMELINE.map((t, i) => (
                <div key={t.year}>
                  <Reveal delay={i * 0.08}>
                    <div className="grid gap-4 py-8 md:grid-cols-[120px_1fr] md:gap-16 md:items-center">
                      <p
                        className="font-serif font-light text-[#C09A52]"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                        }}
                      >
                        {t.year}
                      </p>
                      <p className="text-sm font-light leading-relaxed text-[#7A7068]">
                        {t.event}
                      </p>
                    </div>
                  </Reveal>
                  <RevealLine delay={i * 0.04} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A1916] py-24 md:py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionLabel dark>Start a project</SectionLabel>
            <h2
              className="mt-5 font-serif font-light text-white leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Let's build something{" "}
              <span className="italic text-[#C09A52]">exceptional.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex border border-[#C09A52] px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300"
              >
                Get a Free Quote
              </Link>
              <Link
                to="/contact"
                className="inline-flex border border-white/20 px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.2em] text-white/60 hover:border-white/50 hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
