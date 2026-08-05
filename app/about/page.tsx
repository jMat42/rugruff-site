import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "A high school student who likes creating things and trying new ideas — the maker behind RugRuff.",
};

const INTERESTS = ["Music", "Skiing", "Photography", "Hands-on projects"];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Me" title="My Life" />

      <section className="shell pt-14 md:pt-20">
        <div className="grid items-start gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
          <Reveal>
            <div className="mx-auto w-[72%] max-w-xs md:mx-0 md:w-full md:max-w-none">
              <Tufted
                src="/brand/portrait.jpeg"
                alt="Portrait of the maker behind RugRuff"
                width={1152}
                height={1536}
                blob={3}
                seed="c"
                pile={19}
                accent="var(--color-bubble)"
                priority
                sizes="(max-width: 768px) 72vw, 32vw"
                className="aspect-[3/4]"
              />
            </div>
          </Reveal>

          <Reveal delay={110}>
            <p className="font-display text-3xl leading-tight font-extrabold md:text-[2.6rem]">
              I&rsquo;m a high school student who likes creating things and
              trying new ideas.
            </p>
            <p className="mt-7 text-xl leading-relaxed text-ink-2">
              I&rsquo;m into music, skiing, and photography, and I enjoy working
              on hands-on projects.
            </p>

            <ul className="mt-10 flex flex-wrap gap-3">
              {INTERESTS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border-[2.5px] border-ink bg-white px-5 py-2.5 font-display font-bold shadow-[0_4px_0_0_var(--color-ink)]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/my-work" className="btn btn-orange">
                See My Work
              </Link>
              <Link href="/contact" className="btn btn-plain">
                Contact me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed Denver banner, carried over from the original page. */}
      <Reveal className="mt-24 md:mt-32">
        <div className="relative h-48 overflow-hidden border-y-[2.5px] border-ink md:h-72">
          <Image
            src="/brand/denver.jpg"
            alt="The Denver skyline in winter"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </>
  );
}
