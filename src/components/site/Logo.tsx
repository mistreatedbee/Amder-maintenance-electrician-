import { Link } from "@tanstack/react-router";

export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      to="/"
      className={`group inline-flex flex-col leading-none ${className}`}
      aria-label="Amber Maintenance home"
    >
      <span
        className={`font-serif text-xl font-light italic tracking-wide ${
          dark ? "text-white" : "text-[#1A1916]"
        }`}
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Amber
      </span>
      <span
        className={`text-[0.55rem] font-medium uppercase tracking-[0.25em] ${
          dark ? "text-white/40" : "text-[#7A7068]"
        }`}
      >
        Maintenance &amp; Electrical
      </span>
    </Link>
  );
}
