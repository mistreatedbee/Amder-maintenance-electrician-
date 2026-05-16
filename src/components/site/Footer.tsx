import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Logo } from "./Logo";
import { SITE, SERVICES } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border/60 bg-surface/40">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 bg-radial-glow opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}. Trusted by hundreds of homes and businesses across Johannesburg for premium electrical,
              plumbing, renovations and property maintenance.
            </p>
            <form className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-border/60 bg-background/50 p-1.5">
              <input
                type="email"
                required
                placeholder="Your email for updates"
                className="flex-1 bg-transparent px-4 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-amber-gradient text-background"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="text-muted-foreground hover:text-amber">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-amber/80 hover:text-amber">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-amber">About</Link></li>
              <li><Link to="/projects" className="text-muted-foreground hover:text-amber">Projects</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-amber">Pricing</Link></li>
              <li><Link to="/faqs" className="text-muted-foreground hover:text-amber">FAQs</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-amber">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-amber">Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-amber">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber">Get in touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>{SITE.location}</span>
              </li>
              {SITE.phones.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-amber">{p}</a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <a href={`mailto:${SITE.email}`} className="hover:text-amber break-all">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-display tracking-wide">Built with precision in Johannesburg</p>
        </div>
      </div>
    </footer>
  );
}
