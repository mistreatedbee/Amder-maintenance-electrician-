import { createFileRoute, Link } from "@tanstack/react-router";
import founderImg from "@/assets/founder.jpg";
import { SITE } from "@/lib/site";
import { Reveal, SectionLabel } from "@/components/site/Motion";
import { ArrowRight, Award, Wrench, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${SITE.shortName} | Johannesburg Contractors` },
      { name: "description", content: `Founded in Johannesburg, ${SITE.shortName} delivers premium electrical, plumbing, renovations and maintenance across Gauteng.` },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2012", title: "Two-man electrical crew", text: "Started in Johannesburg CBD with a single van and a promise: do it right the first time." },
  { year: "2015", title: "Multi-trade expansion", text: "Added plumbing, ceilings and welding to serve clients end-to-end." },
  { year: "2018", title: "Commercial division", text: "First office fit-out and corporate maintenance contract." },
  { year: "2021", title: "24/7 emergency desk", text: "Launched round-the-clock callouts across greater Johannesburg." },
  { year: "Today", title: "Premium contractor brand", text: "1,200+ projects, certified team, and a reputation built on craftsmanship." },
];

function AboutPage() {
  return (
    <>
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20">
        <SectionLabel>About us</SectionLabel>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          A decade of <span className="text-amber-gradient">precision contracting.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          We're a Johannesburg-grown multi-trade team obsessed with craftsmanship, accountability, and the kind of finish you brag about.
        </p>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/60">
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-radial-glow opacity-60" />
            <img src={founderImg} alt="Amber founder" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-bold md:text-5xl">Our mission</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            To raise the standard of the South African contracting industry — by combining old-school craftsmanship with modern tooling, transparent pricing, and the customer service of a five-star brand.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Award, label: "12+ years experience" },
              { icon: Wrench, label: "10 in-house trades" },
              { icon: Users, label: "Certified technicians" },
              { icon: Sparkles, label: "Guaranteed workmanship" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 px-4 py-3 text-sm">
                <Icon className="h-4 w-4 text-amber" /> {label}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <SectionLabel>Our journey</SectionLabel>
        <h2 className="mt-5 font-display text-4xl font-bold md:text-6xl">A decade in <span className="text-amber-gradient">five chapters.</span></h2>

        <div className="mt-12 grid gap-6">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <div className="group relative grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 md:grid-cols-[140px_1fr] md:items-center md:p-8 hover:border-amber/40 transition-colors">
                <div className="font-display text-4xl font-bold text-amber-gradient md:text-5xl">{t.year}</div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-amber/20 bg-surface/60 p-10 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
          <h2 className="relative font-display text-3xl font-bold md:text-5xl">Want to work with us?</h2>
          <p className="relative mt-3 text-muted-foreground">Get a free, no-obligation quote within 24 hours.</p>
          <Link to="/booking" className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-amber-gradient px-6 py-3.5 text-sm font-semibold text-background shadow-glow">
            Start your project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
