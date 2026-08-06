import Link from "next/link";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";
import LoopMarquee from "@/components/LoopMarquee";
import YarnThread from "@/components/YarnThread";
import { WHY } from "@/lib/site";

const GATEWAYS = [
  {
    href: "/collaborations",
    kicker: "Collaborations",
    title: "View Our Collaborations",
    src: "/collabs/cdp-media.png",
    alt: "RugRuff collaboration piece being shown off at the Cdp Meetup",
    w: 1200,
    h: 900,
    blob: 2 as const,
    seed: "b" as const,
    color: "var(--color-grape)",
  },
  {
    href: "/my-work",
    kicker: "My Work",
    title: "Love Into Every Piece",
    src: "/work/rug-01.jpeg",
    alt: "Hand-tufted flower rug with a thick white pile border",
    w: 1152,
    h: 1536,
    blob: 3 as const,
    seed: "a" as const,
    color: "var(--color-bubble)",
  },
  {
    href: "/about",
    kicker: "About Me",
    title: "The Person Behind The Gun",
    src: "/brand/portrait.jpeg",
    alt: "Portrait of the maker behind RugRuff",
    w: 1152,
    h: 1536,
    blob: 4 as const,
    seed: "c" as const,
    color: "var(--color-marigold)",
  },
];

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-14">
        {/* Yarn-coloured blooms, well behind everything */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
        >
          <div className="absolute -left-24 top-4 size-[26rem] rounded-full bg-coral/25 blur-3xl" />
          <div className="absolute -right-20 top-40 size-[22rem] rounded-full bg-grape/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-[20rem] rounded-full bg-bubble/15 blur-3xl" />
        </div>

        <div className="shell">
          <Reveal>
            <p className="eyebrow">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-full bg-coral"
              />
              Get Started with me!
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-mega mt-4 font-display font-extrabold">
              RugRuff
            </h1>
          </Reveal>

          {/* The hero rug is a wide, landscape piece, so it gets its own
              column rather than being cropped into a portrait frame and
              floated over the wordmark. One block for every breakpoint. */}
          <div className="mt-10 grid items-center gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
            <Reveal delay={120}>
              <p className="max-w-md font-display text-2xl leading-tight font-bold text-ink md:text-3xl">
                Custom Rugs, Premade Rugs{" "}
                <span className="yarn-underline">Or Just Look Around</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/ordering" className="btn btn-lg">
                  View Options
                </Link>
                <Link href="/my-work" className="btn btn-lg btn-plain">
                  See My Work
                </Link>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="sway mx-auto w-[86%] max-w-md md:w-full md:max-w-none">
                <Tufted
                  src="/work/shot-01.png"
                  alt="Hand-tufted pale blue box-logo rug with black leopard print lettering, laid on grass"
                  width={1200}
                  height={790}
                  blob={2}
                  seed="b"
                  pile={18}
                  accent="var(--color-marigold)"
                  priority
                  sizes="(max-width: 768px) 86vw, 45vw"
                  className="aspect-[3/2]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LoopMarquee className="mt-6" />

      {/* ---------------- Gateways + Why: stitched together ---------------- */}
      <div className="relative">
        {/* The strand only has room to weave on wide screens. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 hidden w-[42rem] -translate-x-1/2 lg:block"
        >
          <YarnThread />
        </div>

        <section className="shell pt-24 md:pt-32">
          <Reveal>
            <h2 className="text-huge max-w-3xl font-display font-extrabold">
              Three ways in.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-y-20 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-14">
            {GATEWAYS.map((g, i) => (
              <Reveal key={g.href} delay={i * 110}>
                <Link
                  href={g.href}
                  className="group block focus-visible:outline-none"
                >
                  <Tufted
                    src={g.src}
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    blob={g.blob}
                    seed={g.seed}
                    pile={15}
                    accent={g.color}
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 28vw"
                    className="aspect-[4/5] transition-transform duration-500 group-hover:-rotate-2"
                  />
                  <p className="eyebrow mt-10">{g.kicker}</p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold">
                    <span className="bg-gradient-to-r from-coral to-coral bg-[length:0%_0.3em] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_0.3em]">
                      {g.title}
                    </span>
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 font-semibold text-ink-2">
                    Take a look
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Why Choose RugRuff ---------------- */}
        <section className="shell pt-28 md:pt-40">
          <Reveal>
            <p className="eyebrow">Why Choose RugRuff</p>
            <h2 className="text-huge mt-4 max-w-2xl font-display font-extrabold">
              Four reasons to
              <span className="text-coral"> pick me.</span>
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 90}>
                <div className="card card-lift h-full p-7">
                  <span
                    aria-hidden="true"
                    className="grid size-14 place-items-center rounded-full border-[2.5px] border-ink font-display text-xl font-extrabold"
                    style={{ background: item.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-lg leading-snug text-ink-2">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="shell pt-28 md:pt-40">
        <Reveal>
          <div className="card relative overflow-hidden px-7 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
            >
              <div className="absolute -left-10 -top-10 size-56 rounded-full bg-coral/30 blur-2xl" />
              <div className="absolute -bottom-12 -right-6 size-64 rounded-full bg-bubble/30 blur-2xl" />
            </div>
            <div className="relative">
              <h2 className="text-huge mx-auto max-w-3xl font-display font-extrabold">
                Got an idea? Let&rsquo;s tuft it.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-xl text-ink-2">
                Either Email, DM Or Fill out the form &mdash; whichever is
                easiest for you.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/ordering" className="btn btn-lg">
                  Start an order
                </Link>
                <Link href="/contact" className="btn btn-lg btn-plain">
                  Contact me
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
