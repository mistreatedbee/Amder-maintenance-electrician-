import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setShow(false), 600);
      }
      setPct(Math.min(100, Math.round(p)));
    }, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#F7F3EC]"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center"
          >
            <span
              className="font-serif text-5xl font-light italic text-[#1A1916] tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Amber
            </span>
            <span className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.35em] text-[#7A7068]">
              Maintenance &amp; Electrical
            </span>
          </motion.div>

          {/* Full-width thin progress bar at very bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4DDD0]">
            <motion.div
              className="h-full bg-[#C09A52] origin-left"
              style={{ scaleX: pct / 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
