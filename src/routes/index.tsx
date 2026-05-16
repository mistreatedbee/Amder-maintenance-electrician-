import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Star, Zap, Shield, Clock, Sparkles, MapPin, ChevronRight, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import founderImg from "@/assets/founder.jpg";
import { SERVICES, PROJECTS, TESTIMONIALS, STATS, TRUST_STRIP, SITE, waLink } from "@/lib/site";
import { Counter, Reveal, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | Johannesburg's Premium Contractors` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.name },
      { property: "og:description", content: SITE.description },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Home,
});

const VERBS = ["WE BUILD", "WE REWIRE", "WE RENOVATE", "WE TRANSFORM"];

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Stats />
      <ServicesShowcase />
      <AboutTeaser />
      <ProjectsPreview />
      <Testimonials />
      <FinalCta />
    </>
  );
}

function Hero() {
  const [verb, setVerb] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setVerb((v) => (v + 1) % VERBS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative -mt-24 min-h-[100svh] overflow-hidden pt-24">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Amber electrician at work with amber sparks"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[800px] bg-radial-glow opacity-60" />

      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl grid-cols-1 items-center px-4 py-12">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Johannesburg • Est. 2012</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-balance">
              <span className="relative block h-[1.05em] overflow-hidden">
                {VERBS.map((v, i) => (
                  <motion.span
                    key={v}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{
                      y: i === verb ? "0%" : i === (verb - 1 + VERBS.length) % VERBS.length ? "-100%" : "100%",
                      opacity: i === verb ? 1 : 0,
                    }}
                    transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0 text-amber-gradient"
                  >
                    {v}
                  </motion.span>
                ))}
                <span className="invisible">{VERBS[0]}</span>
              </span>
              <span className="block text-foreground">
                Johannesburg's premium
              </span>
              <span className="block text-foreground/70">
                contractors.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Electrical, plumbing, renovations, ceilings, welding and full property maintenance — delivered
              with the precision of a tech company and the craft of master builders. 24/7 emergency response.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-gradient px-6 py-3.5 text-sm font-semibold text-background shadow-glow-lg transition-transform hover:scale-[1.03]"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/40 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-amber/50 hover:text-amber"
              >
                View Projects
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 px-2 text-sm font-medium text-muted-foreground hover:text-amber sm:inline-flex"
              >
                or chat on WhatsApp →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber text-amber" /> 4.9 rating</span>
              <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-amber" /> Insured & certified</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-amber" /> &lt;60 min response</span>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-8 w-px bg-amber"
          />
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [...TRUST_STRIP, ...TRUST_STRIP];
  return (
    <section className="border-y border-border/60 bg-surface/30 py-5">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="bg-surface/60 p-8 backdrop-blur-sm md:p-10">
              <div className="font-display text-5xl font-bold text-amber-gradient md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <SectionLabel>What we do</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Every trade your property needs, <span className="text-amber-gradient">under one roof.</span>
          </h2>
        </div>
        <Link to="/services" className="group inline-flex items-center gap-2 text-sm font-semibold text-amber">
          View all services
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, 6).map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.07}>
            <Link
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:border-amber/40 hover:shadow-glow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">From {s.startingFrom}</div>
                <h3 className="mt-1.5 font-display text-2xl font-semibold">{s.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-radial-glow opacity-70" />
            <div className="relative overflow-hidden rounded-3xl border border-border/60">
              <img src={founderImg} alt="Amber founder portrait" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl glass-strong p-5 md:block">
              <div className="font-display text-3xl text-amber-gradient">12+</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Years of craft</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionLabel>Our story</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
            Built on trust. <span className="text-amber-gradient">Wired for excellence.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Founded in Johannesburg, Amber Maintenance & Electrical began as a two-man electrical crew with one
            obsession: a job done properly, the first time. A decade later we run a multi-trade team servicing
            high-end homes and commercial projects across Gauteng.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Shield, label: "Insured & registered" },
              { icon: Zap, label: "Certified electricians" },
              { icon: Clock, label: "Always on time" },
              { icon: MapPin, label: "Johannesburg wide" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 px-4 py-3 text-sm">
                <Icon className="h-4 w-4 text-amber" />
                {label}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-amber/50 hover:text-amber"
          >
            Read our story <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <SectionLabel>Recent work</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Projects we're <span className="text-amber-gradient">proud of.</span>
          </h2>
        </div>
        <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-amber">
          Browse the gallery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
        {PROJECTS.map((p, i) => {
          const span =
            p.span === "wide" ? "md:col-span-2 md:row-span-2"
            : p.span === "tall" ? "md:row-span-2"
            : "";
          return (
            <Reveal key={p.title} delay={(i % 4) * 0.05}>
              <Link
                to="/projects"
                className={`group relative block h-full w-full overflow-hidden rounded-2xl border border-border/60 ${span}`}
              >
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">{p.category} • {p.area}</div>
                  <div className="mt-1 font-display text-base font-semibold md:text-lg">{p.title}</div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Testimonials() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative py-24">
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center">
        <SectionLabel>Client love</SectionLabel>
        <h2 className="mt-5 font-display text-4xl font-bold md:text-6xl">
          Trusted across <span className="text-amber-gradient">Johannesburg.</span>
        </h2>
      </div>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee-slow gap-5 px-4">
          {row.map((t, i) => (
            <article key={i} className="glass w-[340px] shrink-0 rounded-2xl p-6 md:w-[420px]">
              <Quote className="h-6 w-6 text-amber" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.body}"</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.area}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-amber/20 bg-surface/60 p-10 text-center md:p-20">
        <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-80" />
        <div className="pointer-events-none absolute inset-0 grain" />
        <div className="relative">
          <SectionLabel>Ready when you are</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Let's make your next project <span className="text-amber-gradient">unforgettable.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Free quotes within 24 hours. Emergency callouts 24/7. One contractor, one invoice, no hassle.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/booking" className="group inline-flex items-center gap-2 rounded-full bg-amber-gradient px-7 py-3.5 text-sm font-semibold text-background shadow-glow-lg transition-transform hover:scale-[1.03]">
              Book a Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-amber/50 hover:text-amber">
              Call {SITE.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
