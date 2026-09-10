"use client";

import katex from "katex";
import { useMemo } from "react";

function render(tex: string, display: boolean) {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      output: "html",
      trust: false,
      strict: "ignore",
    });
  } catch {
    return tex;
  }
}

export function TeX({ children, display = false }: { children: string; display?: boolean }) {
  const html = useMemo(() => render(children, display), [children, display]);
  if (display) {
    return (
      <div
        className="my-3 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
        role="math"
        aria-label={children}
      />
    );
  }
  return (
    <span
      className="inline-block"
      dangerouslySetInnerHTML={{ __html: html }}
      role="math"
      aria-label={children}
    />
  );
}

/** Split on $...$ and $$...$$. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => tokenize(text), [text]);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.type === "text" ? (
          <span key={i}>{p.value}</span>
        ) : (
          <TeX key={i} display={p.type === "display"}>
            {p.value}
          </TeX>
        ),
      )}
    </span>
  );
}

function tokenize(src: string): { type: "text" | "inline" | "display"; value: string }[] {
  const out: { type: "text" | "inline" | "display"; value: string }[] = [];
  let i = 0;
  while (i < src.length) {
    if (src.startsWith("$$", i)) {
      const end = src.indexOf("$$", i + 2);
      if (end === -1) {
        out.push({ type: "text", value: src.slice(i) });
        break;
      }
      out.push({ type: "display", value: src.slice(i + 2, end) });
      i = end + 2;
    } else if (src[i] === "$") {
      const end = src.indexOf("$", i + 1);
      if (end === -1) {
        out.push({ type: "text", value: src.slice(i) });
        break;
      }
      out.push({ type: "inline", value: src.slice(i + 1, end) });
      i = end + 1;
    } else {
      const next = nextDollar(src, i);
      out.push({ type: "text", value: src.slice(i, next) });
      i = next;
    }
  }
  return out;
}

function nextDollar(src: string, from: number) {
  const a = src.indexOf("$", from);
  return a === -1 ? src.length : a;
}
