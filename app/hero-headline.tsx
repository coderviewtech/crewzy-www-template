"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Start the entrance after fonts and the initial page load are visible. */
export function HeroHeadline({ children, className }: { children: ReactNode; className: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let disposed = false;
    let frame = 0;
    const start = () => {
      void document.fonts.ready.then(() => {
        if (disposed) return;
        frame = requestAnimationFrame(() => setReady(true));
      });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("load", start);
    };
  }, []);
  return <h1 className={className} data-hero-ready={ready}>{children}</h1>;
}
