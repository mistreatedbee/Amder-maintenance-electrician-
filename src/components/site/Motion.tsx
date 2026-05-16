import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as const;

/* ─── Reveal ─────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── RevealClip (text clip-path reveal) ─────────────────────────────── */
export function RevealClip({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.0, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── RevealLine (thin line expanding left→right) ─────────────────────── */
export function RevealLine({
  delay = 0,
  className = "",
  dark = false,
}: {
  delay?: number;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: EASE_CINEMATIC }}
        style={{ originX: 0 }}
        className={`h-px w-full ${dark ? "bg-white/12" : "bg-[#E4DDD0]"}`}
      />
    </div>
  );
}

/* ─── SectionLabel ────────────────────────────────────────────────────── */
export function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.3em] ${
        dark ? "text-white/50" : "text-[#7A7068]"
      }`}
    >
      <span
        className={`inline-block h-px w-8 ${dark ? "bg-[#C09A52]/60" : "bg-[#C09A52]"}`}
      />
      {children}
    </span>
  );
}

/* ─── Counter ─────────────────────────────────────────────────────────── */
export function Counter({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 18, mass: 1 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
