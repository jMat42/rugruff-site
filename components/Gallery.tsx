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

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + pieces.length) % pieces.length,
      ),
    [pieces.length],
  );

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

      {/* ---- Lightbox ---- */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm md:p-10"
          onClick={close}
        >
          <div
            className="relative max-h-full w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.w}
              height={active.h}
              sizes="(max-width: 768px) 92vw, 48rem"
              className="mx-auto max-h-[76vh] w-auto rounded-3xl border-[3px] border-white object-contain shadow-2xl"
            />

            <p className="mt-5 text-center text-sm font-medium text-white/85">
              {open! + 1} of {pieces.length}
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="btn !bg-white !py-2.5"
              >
                &larr; Prev
              </button>
              <button
                type="button"
                onClick={close}
                className="btn btn-orange !py-2.5"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="btn !bg-white !py-2.5"
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
