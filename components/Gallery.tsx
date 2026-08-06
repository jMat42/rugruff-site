"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";
import type { Piece } from "@/lib/site";

const BLOBS = [1, 3, 2, 4, 2, 1, 4, 3, 1, 2] as const;
const SEEDS = ["a", "b", "c"] as const;
const ACCENTS = [
  "var(--color-marigold)",
  "var(--color-bubble)",
  "var(--color-grape)",
  "var(--color-orange)",
];

export default function Gallery({ pieces }: { pieces: Piece[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + pieces.length) % pieces.length,
      ),
    [pieces.length],
  );

  // Always reopen fitted — carrying a zoom across to the next photo would
  // land the viewer somewhere arbitrary in it.
  useEffect(() => {
    setZoomed(false);
  }, [open]);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const active = open === null ? null : pieces[open];

  return (
    <>
      {/* A rug wall — masonry columns so portrait and landscape pieces
          can sit together without being cropped to a common ratio. */}
      <div className="columns-1 gap-x-12 sm:columns-2 lg:columns-3 lg:gap-x-16">
        {pieces.map((p, i) => (
          <Reveal
            key={p.src}
            delay={(i % 3) * 90}
            className="mb-20 break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
            >
              <Tufted
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                blob={BLOBS[i % BLOBS.length]}
                seed={SEEDS[i % SEEDS.length]}
                pile={15}
                accent={ACCENTS[i % ACCENTS.length]}
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 28vw"
                className="transition-transform duration-500 group-hover:-rotate-2"
                imgClassName="!h-auto"
              />
              <span className="mt-9 inline-flex items-center gap-2 font-semibold text-ink-2 transition-colors group-hover:text-ink">
                View larger
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  &rarr;
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* ---- Lightbox ----
           On a phone the thumbnail is already full-bleed, and its tufted
           ring makes it *look* wider still — so the old layout, which
           inset the image by p-4 and stacked the controls underneath,
           opened the photo smaller than the thumbnail it came from.
           Now it goes edge to edge, the controls float over the image
           instead of stealing height, and tapping zooms, because at full
           width a portrait photo on a portrait screen has nowhere left
           to grow. */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          className="fixed inset-0 z-[80] bg-ink/85 backdrop-blur-sm"
          onClick={close}
        >
          {/* Sized from this container, never from the image's own
              intrinsic dimensions.

              In the static export there is no image optimiser, so every
              srcset candidate is the same file under a different width
              descriptor. The browser applies density correction and
              concludes a 1152px photo is 292px wide, which silently
              collapsed an intrinsic-sized layout to a third of its size.
              Aspect ratio survives that correction, so object-contain
              still letterboxes correctly — only absolute sizing is
              untrustworthy. The Next server build optimises properly and
              never showed this, which is exactly why it has to be sized
              this way. */}
          <div
            className={`absolute inset-0 pb-24 sm:p-8 sm:pb-28 md:p-12 md:pb-28 ${
              zoomed
                ? "overflow-auto"
                : "flex items-center justify-center overflow-hidden"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.w}
              height={active.h}
              sizes="(max-width: 768px) 250vw, 60rem"
              onClick={() => setZoomed((z) => !z)}
              className={
                zoomed
                  ? "h-auto w-[220%] max-w-none cursor-zoom-out sm:w-[160%]"
                  : "h-full w-full cursor-zoom-in object-contain"
              }
            />
          </div>

          {/* Controls float above the photo so they cost it no height. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-4 pb-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white/90">
              {open! + 1} of {pieces.length} &middot;{" "}
              {zoomed ? "tap to fit" : "tap photo to zoom"}
            </p>
            <div className="pointer-events-auto flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => step(-1)}
                className="btn btn-plain !bg-white !px-4 !py-2.5"
              >
                &larr; Prev
              </button>
              <button type="button" onClick={close} className="btn !py-2.5">
                Close
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="btn btn-plain !bg-white !px-4 !py-2.5"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
