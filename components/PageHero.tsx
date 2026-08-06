import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  // No `overflow-hidden` on the section: the colour wash is allowed to
  // bleed past it so it fades out instead of ending on a hard horizontal
  // edge. Sideways bleed is contained by `html { overflow-x: clip }`.
  return (
    <section className="relative pb-4 pt-10 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div className="absolute -left-28 -top-24 size-[24rem] rounded-full bg-coral/25 blur-3xl" />
        <div className="absolute -right-24 -top-4 size-[20rem] rounded-full bg-grape/15 blur-3xl" />
      </div>

      <div className="shell">
        <Reveal>
          <p className="eyebrow">
            <span
              aria-hidden="true"
              className="inline-block size-2.5 rounded-full bg-coral"
            />
            {eyebrow}
          </p>
          <h1 className="text-huge mt-4 max-w-4xl font-display font-extrabold">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={90}>
            <div className="mt-7 max-w-xl text-xl leading-relaxed text-ink-2">
              {lead}
            </div>
          </Reveal>
        )}
        {children && <Reveal delay={150}>{children}</Reveal>}
      </div>
    </section>
  );
}
