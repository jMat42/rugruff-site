import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hey, I'm Caleb — the guy behind RugRuff. I hand-tuft every rug myself, from initial sketch to final trim.",
};

const INTERESTS = [
  "Hand-tufting",
  "Photography",
  "Video production",
  "Music production",
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Me" title="My Life" />

      <section className="shell pt-14 md:pt-20">
        <div className="grid items-start gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
          <Reveal>
            <div className="mx-auto w-[86%] max-w-md md:mx-0 md:w-full md:max-w-none">
              <Tufted
                src="/brand/caleb.jpg"
                alt="Caleb smiling, holding his tufting gun, with finished rugs laid out on the floor around him"
                width={1600}
                height={1200}
                blob={3}
                seed="c"
                pile={19}
                accent="var(--color-bubble)"
                priority
                sizes="(max-width: 768px) 86vw, 36vw"
                className="aspect-[4/3]"
              />
            </div>
          </Reveal>

          <Reveal delay={110}>
            <p className="font-display text-3xl leading-tight font-extrabold md:text-[2.6rem]">
              Hey, I&rsquo;m Caleb &mdash; the guy behind RugRuff.
            </p>
            <p className="mt-7 text-xl leading-relaxed text-ink-2">
              I hand-tuft every rug myself, from initial sketch to final trim,
              so each piece is one-of-a-kind and made with a ton of care.
            </p>
            <p className="mt-6 text-xl leading-relaxed text-ink-2">
              When I&rsquo;m not tufting, you&rsquo;ll probably find me behind a
              camera. I&rsquo;m big into photography and video production
              &mdash; shooting everything from car meets to night skies &mdash;
              and I bring that same eye for color, composition, and detail into
              my rug designs. I&rsquo;m also slowly teaching myself music
              production, so who knows, a RugRuff soundtrack might be in the
              future.
            </p>
            <p className="mt-6 text-xl leading-relaxed text-ink-2">
              Every rug here is a mix of craft, creativity, and a little bit of
              chaos. Thanks for checking it out.
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
              <Link href="/my-work" className="btn">
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
