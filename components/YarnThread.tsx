"use client";

import { useEffect, useRef } from "react";

/**
 * A single continuous strand of yarn that stitches the page together.
 *
 * The path draws itself as you scroll — stroke-dashoffset tied to how
 * far through the section stack you are — so the page literally gets
 * tufted as you read it. `pathLength="1"` normalises the maths so the
 * dash values are just 0→1 regardless of the real path length, and
 * `vector-effect` keeps the strand an even weight while the SVG is
 * stretched to whatever height the content ends up being.
 */
export default function YarnThread() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 when the strand's top reaches the middle of the screen,
      // 1 when its bottom does.
      const total = rect.height - vh * 0.35;
      const scrolled = vh * 0.65 - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / Math.max(total, 1)));

      path.style.strokeDashoffset = String(1 - progress);

      // The SVG is stretched non-uniformly, so a circle drawn inside it
      // would render as an ellipse. Place the bead in the DOM instead and
      // map the path point from viewBox units into real pixels.
      const bead = beadRef.current;
      if (bead) {
        const pt = path.getPointAtLength(path.getTotalLength() * progress);
        const x = (pt.x / 100) * rect.width;
        const y = (pt.y / 1000) * rect.height;
        bead.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        bead.style.opacity = progress > 0.002 && progress < 0.998 ? "1" : "0";
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M50 0 C 33 90, 67 150, 50 250 C 32 350, 68 400, 50 500 C 31 600, 69 650, 50 750 C 34 850, 66 910, 50 1000"
          stroke="var(--color-ink-3)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="0.012 0.02"
          opacity={0.28}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
        />
        <path
          ref={pathRef}
          d="M50 0 C 33 90, 67 150, 50 250 C 32 350, 68 400, 50 500 C 31 600, 69 650, 50 750 C 34 850, 66 910, 50 1000"
          stroke="var(--color-marigold)"
          strokeWidth={3.5}
          opacity={0.85}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      </svg>

      <div
        ref={beadRef}
        className="absolute left-0 top-0 size-4 rounded-full border-[2.5px] border-ink bg-orange will-change-transform"
        style={{ opacity: 0, transition: "opacity .35s ease" }}
      />
    </div>
  );
}
