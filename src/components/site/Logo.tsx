import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Amber Maintenance home">
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-amber-gradient text-background shadow-glow">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-amber-gradient">AMBER</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Maintenance & Electrical
        </span>
      </span>
    </Link>
  );
}
