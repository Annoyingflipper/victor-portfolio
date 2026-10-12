/**
 * Vertical timeline.
 * Based on "Timeline" by Mohammad Shehadeh (Hirael, MIT) from 21st.dev:
 * https://21st.dev/@mohammadshehadeh/components/timeline
 * Trimmed to the two states this site uses (current / past), restyled with the site tokens,
 * and the icon-dot and colour-tone variants removed.
 */
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol data-slot="timeline" className={cn("relative flex flex-col", className)} {...props} />
);

const TimelineItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li
    data-slot="timeline-item"
    className={cn(
      "group relative flex gap-5 pb-14 last:pb-0",
      "before:absolute before:start-[5px] before:top-5 before:bottom-0 before:w-px before:bg-rule",
      "last:before:hidden",
      className,
    )}
    {...props}
  />
);

const timelineDotVariants = cva(
  "relative z-10 mt-2 inline-flex size-[11px] shrink-0 rounded-full",
  {
    variants: {
      state: {
        current: "bg-pass",
        past: "border border-ink-muted bg-paper",
      },
    },
    defaultVariants: { state: "past" },
  },
);

const TimelineDot = ({
  className,
  state,
  ...props
}: React.ComponentProps<"span"> & { state?: "current" | "past" }) => (
  <span
    data-slot="timeline-dot"
    aria-hidden="true"
    className={cn(timelineDotVariants({ state }), className)}
    {...props}
  />
);

const TimelineContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="timeline-content"
    className={cn("flex min-w-0 flex-1 flex-col", className)}
    {...props}
  />
);

const TimelineTime = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    data-slot="timeline-time"
    className={cn("font-mono text-xs text-ink-muted", className)}
    {...props}
  />
);

const TimelineTitle = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <h3
    data-slot="timeline-title"
    className={cn("mt-2 font-serif text-3xl leading-tight md:text-4xl", className)}
    {...props}
  />
);

const TimelineDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    data-slot="timeline-description"
    className={cn("mt-3 max-w-[60ch] text-ink-muted", className)}
    {...props}
  />
);

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTime,
  TimelineTitle,
  TimelineDescription,
};
