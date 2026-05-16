import { Link } from "@tanstack/react-router";
import { SITE, SERVICES } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#1A1916] text-[#F7F3EC]">
      {/* Top editorial strip */}
      <div className="border-b border-white/10 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p
            className="font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1.1] text-white/90 max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            One contractor. Every trade. Johannesburg-wide.
          </p>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo dark />
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-white/45">
              {SITE.tagline}. Premium electrical, plumbing, renovations and
              property maintenance across Gauteng.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-white/30 mb-3">
                Stay updated
              </p>
              <form className="flex items-end gap-0 border-b border-white/20 pb-2">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-[0.6rem] uppercase tracking-[0.2em] text-[#C09A52] hover:text-white transition-colors shrink-0 ml-3"
                >
                  Subscribe →
                </button>
              </form>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-white/30">
              Services
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-white/50 hover:text-[#C09A52] transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-[#C09A52]/70 hover:text-[#C09A52] transition-colors">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-white/30">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {[
                { to: "/about", label: "About" },
                { to: "/projects", label: "Projects" },
                { to: "/pricing", label: "Pricing" },
                { to: "/faqs", label: "FAQs" },
                { to: "/contact", label: "Contact" },
                { to: "/privacy", label: "Privacy" },
                { to: "/terms", label: "Terms" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/50 hover:text-[#C09A52] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-white/30">
              Get in touch
            </h4>
            <ul className="space-y-4 text-sm font-light text-white/50">
              <li>{SITE.location}</li>
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="hover:text-[#C09A52] transition-colors"
                  >
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-[#C09A52] transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/35">{SITE.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-6 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/25">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p
            className="font-serif text-sm italic text-white/20"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Johannesburg, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
