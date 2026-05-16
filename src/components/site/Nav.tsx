import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHeroPage = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#F7F3EC]/90 backdrop-blur-md border-b border-[#E4DDD0]"
          : isHeroPage
          ? "bg-transparent"
          : "bg-[#F7F3EC]/95 border-b border-[#E4DDD0]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between py-5">
          <Logo dark={!scrolled && isHeroPage} />

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`relative text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      !scrolled && isHeroPage
                        ? active
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                        : active
                        ? "text-[#1A1916]"
                        : "text-[#7A7068] hover:text-[#1A1916]"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute -bottom-0.5 left-0 h-px w-full ${
                          !scrolled && isHeroPage ? "bg-white/60" : "bg-[#C09A52]"
                        }`}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
              className={`hidden text-[0.65rem] tracking-[0.1em] transition-colors lg:block ${
                !scrolled && isHeroPage
                  ? "text-white/50 hover:text-white"
                  : "text-[#7A7068] hover:text-[#1A1916]"
              }`}
            >
              {SITE.phones[0]}
            </a>
            <Link
              to="/booking"
              className={`text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                !scrolled && isHeroPage
                  ? "text-white/80 hover:text-white"
                  : "text-[#1A1916] hover:text-[#C09A52]"
              }`}
            >
              Get a Quote →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className={`grid h-9 w-9 place-items-center md:hidden transition-colors ${
              !scrolled && isHeroPage ? "text-white" : "text-[#1A1916]"
            }`}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#E4DDD0] bg-[#F7F3EC] md:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6">
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="border-b border-[#E4DDD0]"
                  >
                    <Link
                      to={item.to}
                      className="block py-4 text-sm font-light text-[#1A1916] hover:text-[#C09A52] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: NAV.length * 0.05 + 0.1 }}
                  className="pt-5"
                >
                  <Link
                    to="/booking"
                    className="text-xs uppercase tracking-[0.2em] text-[#C09A52] hover:text-[#1A1916] transition-colors"
                  >
                    Get a Quote →
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
