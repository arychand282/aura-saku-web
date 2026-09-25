"use client";

import { useState } from "react";

// Hover-only truncation (title attribute) never reveals the full text on
// touch devices — there's no hover state to trigger it. Tap-to-expand works
// on both: desktop still gets the tooltip as a bonus, mobile gets a real
// way to read the whole message.
export default function OriginalChatCell({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) {
    return <td className="px-4 py-2 text-gray-500 italic">—</td>;
  }

  return (
    <td
      onClick={() => setExpanded((prev) => !prev)}
      title={expanded ? undefined : text}
      className={`px-4 py-2 text-gray-500 italic cursor-pointer ${
        expanded ? "whitespace-normal break-words" : "max-w-[220px] truncate"
      }`}
    >
      {text}
    </td>
  );
}
