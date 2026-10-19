"use client";

import { useEffect, useRef, useState } from "react";

/** "01 / Work" style heading. The "✓ passed" tag ticks in once when the heading scrolls into view. */
export function SectionHeading({ index, title, id }: { index: number; title: string; id: string }) {
  const tag = useRef<HTMLSpanElement>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = tag.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPassed(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-4">
      <h2 id={id} className="font-mono text-sm">
        <span className="text-ink-muted">{String(index).padStart(2, "0")} /</span> {title}
      </h2>
      <span
        ref={tag}
        aria-hidden="true"
        data-passed={passed}
        className="-translate-x-1 font-mono text-xs text-pass opacity-0 transition-[opacity,translate] delay-250 duration-350 data-[passed=true]:translate-x-0 data-[passed=true]:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none"
      >
        ✓ passed
      </span>
    </div>
  );
}
