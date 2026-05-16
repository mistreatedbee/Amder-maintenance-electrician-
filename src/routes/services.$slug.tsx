import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { Reveal, RevealClip, RevealLine, SectionLabel } from "@/components/site/Motion";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.name} in Johannesburg | ${SITE.shortName}` },
          { name: "description", content: loaderData.service.description },
          { property: "og:title", content: loaderData.service.name },
          { property: "og:description", content: loaderData.service.description },
          { property: "og:image", content: loaderData.service.image },
        ]
      : [],
  }),
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#F7F3EC] grid place-items-center px-6">
      <div className="text-center">
        <p className="font-serif text-6xl font-light italic text-[#C09A52]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Not found
        </p>
        <Link
          to="/services"
          className="mt-8 inline-flex border border-[#1A1916] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#1A1916] hover:bg-[#1A1916] hover:text-white transition-colors duration-300"
        >
          View all services
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[#F7F3EC] grid place-items-center px-6">
      <p className="text-sm text-[#7A7068]">{error.message}</p>
    </div>
  ),
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Hero */}
      <div className="pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionLabel>
            {s.startingFrom !== "Quote" ? `From ${s.startingFrom}` : "By quotation"}
          </SectionLabel>
          <RevealClip className="mt-5">
            <h1
              className="font-serif font-light text-[#1A1916] leading-[0.92]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
              }}
            >
              {s.name}
            </h1>
          </RevealClip>
        </div>

        {/* Full-width image */}
        <div className="mt-12 mx-6 md:mx-12 overflow-hidden">
          <Reveal>
            <div className="aspect-[16/7] overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                className="h-full w-full object-cover transition-transform duration-1400 hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-28">
        <RevealLine />
        <div className="mt-16 grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24 md:items-start">
          {/* Description */}
          <Reveal>
            <h2
              className="font-serif font-light text-[#1A1916] leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              }}
            >
              {s.short}
            </h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-[#7A7068]">
              {s.description}
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="inline-flex border border-[#C09A52] px-7 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#C09A52] hover:bg-[#C09A52] hover:text-white transition-all duration-300"
              >
                Book this service
              </Link>
              <a
                href={waLink(`Hi Amber, I'd like a quote for ${s.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-[#1A1916]/30 px-7 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#1A1916]/70 hover:border-[#1A1916] hover:text-[#1A1916] transition-all duration-300"
              >
                WhatsApp Quote
              </a>
            </div>
          </Reveal>

          {/* Features list */}
          <Reveal delay={0.15}>
            <p className="text-[0.6rem] uppercase tracking-[0.25em] text-[#7A7068] mb-6">
              What's included
            </p>
            <div className="space-y-0">
              {s.features.map((f: string, i: number) => (
                <div key={f}>
                  <div className="flex items-center gap-5 py-4">
                    <span
                      className="font-serif text-[0.65rem] text-[#C4B49E] shrink-0"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-light text-[#1A1916]">{f}</span>
                  </div>
                  <div className="h-px bg-[#E4DDD0]" />
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="mt-8 flex items-center gap-4">
              <span className="inline-block h-px w-8 bg-[#C09A52]" />
              <a
                href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
                className="text-xs text-[#7A7068] hover:text-[#C09A52] transition-colors"
              >
                Or call {SITE.phones[0]}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Other services */}
      <div className="bg-[#F0EAE0] py-20 md:py-28 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>More from Amber</SectionLabel>
          <h2
            className="mt-5 font-serif font-light text-[#1A1916] mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            Other services you may need
          </h2>
          <RevealLine />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 mt-0">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                className="group block overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={o.image}
                    alt={o.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1400 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="pt-4 pb-2">
                  <p
                    className="font-serif font-light text-[#1A1916] text-lg leading-tight group-hover:text-[#C09A52] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {o.name}
                  </p>
                  <p className="mt-1 text-[0.6rem] text-[#7A7068] uppercase tracking-[0.15em]">
                    From {o.startingFrom}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
