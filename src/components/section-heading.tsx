"use client";

import { motion } from "motion/react";

/** "01 / Work" style heading. The "✓ passed" tag ticks in once when the heading scrolls into view. */
export function SectionHeading({ index, title, id }: { index: number; title: string; id: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-4">
      <h2 id={id} className="font-mono text-sm">
        <span className="text-ink-muted">{String(index).padStart(2, "0")} /</span> {title}
      </h2>
      <motion.span
        className="font-mono text-xs text-pass"
        initial={{ opacity: 0, x: -4 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.35, delay: 0.25 }}
        aria-hidden="true"
      >
        ✓ passed
      </motion.span>
    </div>
  );
}
