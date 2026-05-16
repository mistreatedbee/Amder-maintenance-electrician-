import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero.jpg";
import founderImg from "@/assets/founder.jpg";
import { SERVICES, PROJECTS, TESTIMONIALS, STATS, SITE, waLink } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel, Counter } from "@/components/site/Motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | Johannesburg's Premium Contractors` },
      { name: "description", content: SITE.description },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesEditorial />
      <AboutTeaser />
      <ProjectsPreview />
      <Testimonials />
      <FinalCta />
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Cinematic image with parallax */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Amber construction excellence"
          className="h-full w-full object-cover animate-ken-burns"
          fetchPriority="high"
        />
        {/* Subtle vignette + bottom darkening */}
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY }}
        className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-0 md:px-12"
      >
        {/* Main oversized headline */}
        <div className="max-w-5xl pb-28 md:pb-36">
          <RevealClip delay={0.2}>
            <h1
              className="font-serif font-light text-white leading-[0.88]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(4.5rem, 13vw, 11rem)",
              }}
            >
              <span className="block">Crafting</span>
              <span className="block pl-[12%] italic">Premium</span>
              <span className="block">Spaces.</span>
            </h1>
          </RevealClip>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="mt-8 flex items-center gap-6"
          >
            <span className="inline-block h-px w-12 bg-[#C09A52]" />
            <p className="text-sm font-light text-white/60 tracking-wide max-w-xs">
              Johannesburg's premium contractors — electrical, plumbing, renovations and more.
            </p>
          </motion.div>
        </div>

        {/* Floating dark panel — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute right-6 bottom-28 md:right-12 md:bottom-36 dark-panel px-6 py-5 hidden sm:block"
          style={{ minWidth: "200px" }}
        >
          <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/35 mb-3">
            Est. 2012 · Johannesburg
          </p>
          <div className="h-px bg-[#C09A52]/40 mb-3" />
          <p className="text-xs font-light text-white/70">24/7 Emergency Service</p>
          <p className="text-xs font-light text-white/70">Certified &amp; Insured</p>
        </motion.div>

        {/* Bottom CTA bar — like PlazaCorp */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 right-0 bg-[#1A1916]/90 backdrop-blur-sm flex items-center justify-between px-6 py-5 md:px-12"
        >
          <p className="text-sm font-light text-white/70 italic hidden sm:block"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Let's build something extraordinary →
          </p>
          <div className="flex items-center gap-5">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 border border-[#C09A52] px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── STATS ─────────────────────────────────────────────────────────────── */
function Stats() {
  return (
    <section className="border-b border-[#E4DDD0] bg-[#F7F3EC]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-[#E4DDD0] md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="px-8 py-12 md:px-12">
                <div
                  className="font-serif text-5xl font-light text-[#1A1916] md:text-6xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#7A7068]">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES (editorial alternating) ──────────────────────────────────── */
function ServicesEditorial() {
  const featured = SERVICES.slice(0, 4);
  return (
    <section className="bg-[#F7F3EC] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:gap-16 md:items-end">
          <Reveal>
            <SectionLabel>What we do</SectionLabel>
            <h2
              className="mt-5 font-serif font-light leading-[1.05] text-[#1A1916]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              }}
            >
              Every trade your property needs.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm font-light leading-relaxed text-[#7A7068] md:max-w-xs md:ml-auto">
              From emergency callouts to full property renovations — one contractor,
              one invoice, zero stress.
            </p>
            <Link
              to="/services"
              className="mt-5 inline-block text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:text-[#1A1916] transition-colors"
            >
              View all services →
            </Link>
          </Reveal>
        </div>

        <RevealLine />

        {/* Alternating editorial rows */}
        {featured.map((s, i) => {
          const even = i % 2 === 0;
          return (
            <div key={s.slug}>
              <div className={`grid gap-0 md:grid-cols-[3fr_2fr] ${even ? "" : "md:grid-cols-[2fr_3fr]"}`}>
                {/* Image */}
                <div className={`img-cinematic aspect-[4/3] md:aspect-auto md:min-h-[360px] ${even ? "" : "md:order-2"}`}>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1400 hover:scale-[1.04]"
                    />
                  </Link>
                </div>
                {/* Text */}
                <Reveal delay={0.1} className={`flex items-center ${even ? "" : "md:order-1"}`}>
                  <div className="px-8 py-10 md:px-14 md:py-16">
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[#C09A52] mb-4">
                      From {s.startingFrom}
                    </p>
                    <h3
                      className="font-serif font-light text-[#1A1916] leading-tight"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      }}
                    >
                      {s.name}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#7A7068] max-w-xs">
                      {s.description}
                    </p>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="mt-7 inline-block text-[0.65rem] uppercase tracking-[0.2em] text-[#1A1916] border-b border-[#1A1916] pb-0.5 hover:text-[#C09A52] hover:border-[#C09A52] transition-colors"
                    >
                      Explore service →
                    </Link>
                  </div>
                </Reveal>
              </div>
              <RevealLine delay={0.05} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── ABOUT TEASER ───────────────────────────────────────────────────────── */
function AboutTeaser() {
  return (
    <section className="bg-[#F7F3EC] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <RevealLine />
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:items-start">
          {/* Left: oversized statement + facts */}
          <Reveal>
            <div>
              <SectionLabel>Our story</SectionLabel>
              <h2
                className="mt-6 font-serif font-light leading-[1.05] text-[#1A1916]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                }}
              >
                Built on trust.{" "}
                <span className="italic">Wired for excellence.</span>
              </h2>
              <p className="mt-7 text-sm font-light leading-relaxed text-[#7A7068] max-w-md">
                Founded in Johannesburg, Amber began as a two-man electrical crew with one
                obsession: a job done properly, the first time. A decade later we run a
                multi-trade team servicing high-end homes and commercial projects across Gauteng.
              </p>

              {/* 3-column thin facts */}
              <div className="mt-10 grid grid-cols-3 divide-x divide-[#E4DDD0]">
                {[
                  { num: "12+", label: "Years" },
                  { num: "10", label: "Trades" },
                  { num: "24/7", label: "Emergency" },
                ].map((f) => (
                  <div key={f.label} className="px-5 first:pl-0">
                    <p
                      className="font-serif text-3xl font-light text-[#1A1916]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {f.num}
                    </p>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#7A7068] mt-1">
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="mt-10 inline-block text-[0.65rem] uppercase tracking-[0.2em] text-[#1A1916] border-b border-[#1A1916] pb-0.5 hover:text-[#C09A52] hover:border-[#C09A52] transition-colors"
              >
                Read our story →
              </Link>
            </div>
          </Reveal>

          {/* Right: founder portrait with floating stat card */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={founderImg}
                  alt="Amber founder"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1400 hover:scale-[1.03]"
                />
              </div>
              {/* Floating dark stat */}
              <div className="absolute -bottom-6 -left-6 dark-panel px-6 py-5 hidden md:block">
                <p
                  className="font-serif text-3xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  1,200+
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/40 mt-1">
                  Projects Completed
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS PREVIEW ───────────────────────────────────────────────────── */
function ProjectsPreview() {
  return (
    <section className="bg-[#F0EAE0] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <SectionLabel>Recent work</SectionLabel>
            <h2
              className="mt-5 font-serif font-light text-[#1A1916]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              }}
            >
              Projects we're{" "}
              <span className="italic">proud of.</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden md:block text-[0.65rem] uppercase tracking-[0.2em] text-[#7A7068] hover:text-[#C09A52] transition-colors shrink-0"
          >
            Browse gallery →
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {PROJECTS.map((p, i) => {
            const spanClass =
              p.span === "wide"
                ? "md:col-span-2"
                : p.span === "tall"
                ? "md:row-span-2"
                : "";
            const heightClass =
              p.span === "tall"
                ? "aspect-[2/3] md:aspect-auto"
                : p.span === "wide"
                ? "aspect-[16/9] md:aspect-[16/8]"
                : "aspect-square";
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.06} className={spanClass}>
                <Link
                  to="/projects"
                  className={`group relative block overflow-hidden ${heightClass} ${spanClass}`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1400 group-hover:scale-[1.05]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] px-4 pb-4">
                    <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#C09A52]">
                      {p.category} · {p.area}
                    </p>
                    <p
                      className="mt-1 font-serif text-base text-white font-light"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {p.title}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link
            to="/projects"
            className="text-[0.65rem] uppercase tracking-[0.2em] text-[#7A7068] hover:text-[#C09A52] transition-colors"
          >
            Browse gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────────── */
function Testimonials() {
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  return (
    <section className="bg-[#F7F3EC] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <RevealLine />

        {/* Large featured testimonial */}
        <Reveal className="mt-16 max-w-4xl">
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#C09A52] mb-8">
            Client testimonials
          </p>
          <blockquote
            className="font-serif font-light italic text-[#1A1916] leading-[1.2]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            }}
          >
            "{featured.body}"
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <span className="inline-block h-px w-8 bg-[#C09A52]" />
            <span className="text-xs text-[#7A7068]">
              {featured.name} · {featured.area}
            </span>
          </div>
        </Reveal>

        {/* Scrollable smaller cards */}
        <div className="mt-16 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-12 md:px-12">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {rest.map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <article className="w-72 shrink-0 border border-[#E4DDD0] bg-white px-7 py-6 md:w-80">
                  <p className="text-sm font-light leading-relaxed text-[#7A7068]">
                    "{t.body}"
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="inline-block h-px w-5 bg-[#C09A52]" />
                    <div>
                      <p className="text-xs font-medium text-[#1A1916]">{t.name}</p>
                      <p className="text-[0.6rem] text-[#7A7068]">{t.area}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ──────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <section className="bg-[#1A1916] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionLabel dark>Ready when you are</SectionLabel>
            <h2
              className="mt-6 font-serif font-light text-white leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              }}
            >
              Let's make your next project{" "}
              <span className="italic text-[#C09A52]">unforgettable.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-sm font-light leading-relaxed text-white/50 max-w-sm">
              Free quotes within 24 hours. Emergency callouts 24/7. One contractor,
              one invoice, no hassle.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center border border-[#C09A52] px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300"
              >
                Book a Service
              </Link>
              <a
                href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
                className="inline-flex items-center border border-white/20 px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.2em] text-white/60 hover:border-white/50 hover:text-white transition-all duration-300"
              >
                {SITE.phones[0]}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
