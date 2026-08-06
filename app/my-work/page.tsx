import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { WORK, DISCLAIMER } from "@/lib/site";

export const metadata: Metadata = {
  title: "My Work",
  description:
    "Love Into Every Piece — a gallery of hand-tufted rugs made by RugRuff.",
};

export default function MyWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="My Work"
        title="Love Into Every Piece"
        lead="Every rug here was drawn, tufted, trimmed and finished by hand — one at a time."
      />

      <section className="shell pt-16 md:pt-20">
        <Reveal>
          <p className="mb-14 max-w-xl text-base leading-relaxed text-ink-3">
            {DISCLAIMER.gallery}
          </p>
        </Reveal>
        <Gallery pieces={WORK} />
      </section>

      <section className="shell pt-10 md:pt-16">
        <Reveal>
          <div className="card px-7 py-14 text-center md:px-14">
            <h2 className="text-big font-display font-extrabold">
              Want one of your own?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
              Send over an idea, a sketch or just a picture you like.
            </p>
            <Link href="/ordering" className="btn mt-8">
              View Options
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
