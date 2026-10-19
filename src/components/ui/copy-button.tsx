"use client";

/**
 * Copy-to-clipboard button.
 * Based on "Copy Button" by Özer (interior.dev, MIT) from 21st.dev:
 * https://21st.dev/@ddoemonn/components/copy-button
 * Kept: clipboard fallback, idle/copied/error states, live region, reduced-motion support.
 * Changed: site tokens instead of the stone/blue palette, no shadows or radius, no blur.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;
const CELL = {
  type: "spring",
  stiffness: 520,
  damping: 34,
  mass: 0.45,
} as const;
const CROSSFADE = {
  type: "spring",
  stiffness: 260,
  damping: 34,
  mass: 0.8,
} as const;
const DRAW = { duration: 0.26, ease: EASE } as const;
const INSTANT = { duration: 0 } as const;

export type CopyStatus = "idle" | "copied" | "error";

export type UseCopyToClipboardOptions = {
  timeout?: number;
  onCopy?: (value: string) => void;
  onError?: (reason: unknown) => void;
};

function writeFallback(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "0";
  area.style.opacity = "0";
  document.body.appendChild(area);

  const selection = document.getSelection();
  const previous = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(area);
  if (selection && previous) {
    selection.removeAllRanges();
    selection.addRange(previous);
  }
  return ok;
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
  onError,
}: UseCopyToClipboardOptions = {}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const [ticket, setTicket] = useState(0);

  const mounted = useRef(true);
  const copied = useRef(onCopy);
  const failed = useRef(onError);
  useEffect(() => {
    copied.current = onCopy;
    failed.current = onError;
  }, [onCopy, onError]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setTicket(0);
  }, []);

  const copy = useCallback(async (text: string) => {
    if (!text) return false;

    let ok = false;
    let reason: unknown = null;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        ok = writeFallback(text);
      }
    } catch (error) {
      reason = error;
      try {
        ok = writeFallback(text);
      } catch {
        ok = false;
      }
    }

    if (!mounted.current) return ok;

    setStatus(ok ? "copied" : "error");
    setTicket((t) => t + 1);

    if (ok) copied.current?.(text);
    else failed.current?.(reason);

    return ok;
  }, []);

  useEffect(() => {
    if (ticket === 0 || status === "idle") return;
    const id = setTimeout(() => setStatus("idle"), timeout);
    return () => clearTimeout(id);
  }, [ticket, status, timeout]);

  return { copy, reset, status, copied: status === "copied" };
}

export type CopyButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  errorLabel?: string;
  timeout?: number;
  onCopy?: (value: string) => void;
  onError?: (reason: unknown) => void;
  disabled?: boolean;
  className?: string;
};

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  errorLabel = "Failed",
  timeout = 2000,
  onCopy,
  onError,
  disabled = false,
  className = "",
  testId,
}: CopyButtonProps & { testId?: string }) {
  const { copy, status } = useCopyToClipboard({ timeout, onCopy, onError });
  const reduced = useReducedMotion();

  const fade = reduced ? INSTANT : CROSSFADE;
  const draw = reduced ? INSTANT : DRAW;

  const labels: Array<[CopyStatus, string]> = [
    ["idle", label],
    ["copied", copiedLabel],
    ["error", errorLabel],
  ];

  return (
    <LazyMotion features={domAnimation} strict>
      <m.button
        type="button"
        disabled={disabled}
        aria-label={label}
        onClick={() => {
          void copy(value);
        }}
        whileTap={disabled || reduced ? undefined : { y: 1 }}
        transition={CELL}
        style={{ touchAction: "manipulation" }}
        data-testid={testId}
        data-status={status}
        className={`inline-flex h-9 items-center gap-2 border border-ink px-3 font-mono text-xs text-ink transition-colors select-none hover:bg-ink hover:text-paper disabled:opacity-50 data-[status=copied]:border-pass data-[status=copied]:text-pass data-[status=copied]:hover:bg-transparent ${className}`}
      >
        <span className="grid size-[14px] shrink-0" aria-hidden="true">
          <m.svg
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="col-start-1 row-start-1 size-[14px]"
            initial={false}
            animate={{
              opacity: status === "idle" ? 1 : 0,
              scale: status === "idle" ? 1 : 0.92,
            }}
            transition={fade}
          >
            <path d="M9.6 5.1V3.7A1.7 1.7 0 0 0 7.9 2H3.7A1.7 1.7 0 0 0 2 3.7v4.2a1.7 1.7 0 0 0 1.7 1.7h1.4" />
            <rect x="5.1" y="5.1" width="6.9" height="6.9" rx="1.7" />
          </m.svg>

          <m.svg
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="col-start-1 row-start-1 size-[14px]"
            initial={false}
            animate={{
              opacity: status === "copied" ? 1 : 0,
              scale: status === "copied" ? 1 : 0.92,
            }}
            transition={fade}
          >
            <m.path
              d="M2.9 7.4 5.6 10.1 11.1 4"
              initial={false}
              animate={{ pathLength: status === "copied" ? 1 : 0 }}
              transition={draw}
            />
          </m.svg>

          <m.svg
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="col-start-1 row-start-1 size-[14px]"
            initial={false}
            animate={{
              opacity: status === "error" ? 1 : 0,
              scale: status === "error" ? 1 : 0.92,
            }}
            transition={fade}
          >
            <path d="M3.6 3.6 10.4 10.4" />
            <path d="M10.4 3.6 3.6 10.4" />
          </m.svg>
        </span>

        <span aria-hidden="true" className="relative grid">
          {labels.map(([key, text]) => (
            <m.span
              key={key}
              initial={false}
              animate={key === status ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={fade}
              className="col-start-1 row-start-1 whitespace-nowrap"
            >
              {text}
            </m.span>
          ))}
        </span>

        <span role="status" aria-live="polite" className="sr-only">
          {status === "copied" ? copiedLabel : status === "error" ? errorLabel : ""}
        </span>
      </m.button>
    </LazyMotion>
  );
}

export default CopyButton;
