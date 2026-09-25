"use client";

import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

// Native <select> popups are OS-rendered chrome — on Android Chrome the
// option rows shrink to the trigger's font-size and end up too small to tap
// accurately, and desktop "mobile view" emulation doesn't reproduce a mobile
// picker at all, so a CSS font-size bump can't fix it either way. Rendering
// the menu as real page DOM instead gives full control over row size and
// looks/behaves identically everywhere.
export default function Dropdown({
  value,
  options,
  onChange,
  triggerClassName,
  ariaLabel,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  triggerClassName: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const current = options.find((o) => o.value === value);

  // Flip the panel above the trigger when there isn't enough room below —
  // a trigger near the bottom of the viewport (e.g. "Rows per page" next to
  // the pager) would otherwise open a menu that's mostly off-screen,
  // forcing a scroll before any option can be tapped.
  function toggle() {
    if (!open) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const estimatedMenuHeight = options.length * 48 + 12;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        setOpenUpward(spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow);
      }
    }
    setOpen((prev) => !prev);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={`inline-flex cursor-pointer items-center gap-1.5 ${triggerClassName}`}
      >
        {current?.label ?? value}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          className={`absolute left-0 z-20 min-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl shadow-blue-100/60 ${
            openUpward ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-6 whitespace-nowrap px-4 py-3 text-left text-base font-medium transition ${
                opt.value === value ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt.label}
              {opt.value === value && (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-blue-600">
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 0 1 0 1.42l-7.5 7.5a1 1 0 0 1-1.42 0l-3.5-3.5a1 1 0 1 1 1.42-1.42l2.79 2.79 6.79-6.79a1 1 0 0 1 1.42 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
