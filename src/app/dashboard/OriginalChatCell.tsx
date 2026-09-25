"use client";

import { useEffect, useRef, useState } from "react";

// Hover-only truncation (title attribute) never reveals the full text on
// touch devices — there's no hover state to trigger it. Tap-to-expand works
// on both: desktop still gets the tooltip as a bonus, mobile gets a real
// way to read the whole message.
//
// Clickability (pointer cursor, tooltip, onClick) is gated on actual
// overflow — measured via scrollWidth vs clientWidth — not just non-empty
// text. A short description or the fixed "[voice note]" placeholder never
// truncates, so it must never look clickable, or it invites a click hoping
// to hear the voice note.
export default function OriginalChatCell({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (expanded) return;
    const el = cellRef.current;
    if (el) setTruncated(el.scrollWidth > el.clientWidth);
  }, [text, expanded]);

  if (!text) {
    return <td className="px-4 py-3 text-gray-400 italic">—</td>;
  }

  const clickable = truncated || expanded;

  return (
    <td
      ref={cellRef}
      onClick={clickable ? () => setExpanded((prev) => !prev) : undefined}
      title={clickable && !expanded ? text : undefined}
      className={`px-4 py-3 italic ${clickable ? "cursor-pointer text-gray-500 hover:text-blue-600" : "text-gray-400"} ${
        expanded ? "whitespace-normal break-words" : "max-w-[220px] truncate"
      }`}
    >
      {text}
    </td>
  );
}
