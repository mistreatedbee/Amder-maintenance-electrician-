import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setShow(false), 320);
      }
      setPct(Math.min(100, Math.round(p)));
    }, 110);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="relative grain w-[min(90vw,420px)]">
            <div className="pointer-events-none absolute -inset-24 bg-radial-glow opacity-70" />
            <div className="relative flex flex-col items-center gap-8">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="font-display text-5xl font-bold tracking-tight text-amber-gradient">
                  AMBER
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  Maintenance & Electrical
                </div>
              </motion.div>

              <div className="w-full">
                <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-amber-gradient"
                    style={{ width: `${pct}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>Loading</span>
                  <span className="tabular-nums text-amber">{pct}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
