"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Same-site page change: soft fade. Opacity only — a transform here would break `position: fixed` headers inside. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return reduce ? <>{children}</> : (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
