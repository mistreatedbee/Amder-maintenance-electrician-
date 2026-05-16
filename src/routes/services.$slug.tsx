import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { SectionLabel } from "@/components/site/Motion";
import { ArrowRight, Check, Phone } from "lucide-react";

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
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Service not found</h1>
      <Link to="/services" className="mt-6 inline-flex rounded-full bg-amber-gradient px-5 py-2.5 text-sm font-semibold text-background">View all services</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="mx-auto max-w-3xl px-4 py-24 text-center text-muted-foreground">{error.message}</div>,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <section className="relative mx-auto max-w-7xl px-4 pt-8 md:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionLabel>{s.startingFrom !== "Quote" ? `From ${s.startingFrom}` : "By quotation"}</SectionLabel>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              {s.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{s.description}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.features.map((f: string) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/40 px-4 py-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-amber-gradient px-6 py-3.5 text-sm font-semibold text-background shadow-glow-lg transition-transform hover:scale-[1.03]">
                Book this service <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={waLink(`Hi Amber, I'd like a quote for ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/40 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-amber/50 hover:text-amber">
                WhatsApp Quote
              </a>
              <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/40 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-amber/50 hover:text-amber">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-border/60">
              <div className="pointer-events-none absolute -inset-10 -z-10 bg-radial-glow opacity-50" />
              <img src={s.image} alt={s.name} className="aspect-[4/5] h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Other services you may need</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-amber/40 hover:shadow-glow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              </div>
              <div className="p-5">
                <div className="font-display text-lg font-semibold">{o.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{o.short}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
