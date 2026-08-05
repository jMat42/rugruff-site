import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";
import { COLLABS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collaborations",
  description:
    "RugRuff has worked with brands and influencers including Cdp Media, Phantom Kai Boots and Liam Abner Magic.",
};

export default function CollaborationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collaborations"
        title="Worked With Many Brands & Influencers"
        lead="Giveaways, meetups and one-off pieces made with people I like working with."
      />

      <section className="shell space-y-24 pt-20 md:space-y-32 md:pt-28">
        {COLLABS.map((c, i) => (
          <Reveal key={c.name}>
            <article
              className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Tufted
                src={c.src}
                alt={c.alt}
                width={1200}
                height={900}
                blob={((i % 4) + 1) as 1 | 2 | 3 | 4}
                seed={(["a", "b", "c"] as const)[i % 3]}
                pile={17}
                accent={c.color}
                sizes="(max-width: 768px) 82vw, 42vw"
                imgClassName="!h-auto"
              />

              <div>
                <p className="eyebrow">
                  Collab {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-big mt-3 font-display font-extrabold">
                  {c.name}
                </h2>
                {c.caption && (
                  <p className="mt-4 text-xl text-ink-2">{c.caption}</p>
                )}
                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-grape mt-8"
                  >
                    {c.linkLabel}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <div className="card px-7 py-14 text-center md:px-14">
            <h2 className="text-big font-display font-extrabold">
              Brand or creator?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
              Open Minded And Easy To Work With — get in touch and let&rsquo;s
              make something.
            </p>
            <Link href="/contact" className="btn btn-orange mt-8">
              Contact me
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
