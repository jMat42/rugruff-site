import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmailActions from "@/components/EmailActions";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact me",
  description: `Email ${CONTACT.email} or DM ${CONTACT.instagramHandle} on Instagram.`,
};

function Badge({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className="grid size-14 place-items-center rounded-full border-[2.5px] border-ink"
      style={{ background: color }}
    >
      {children}
    </span>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact me"
        title="Say hey."
        lead="Two ways to reach me — whichever you already have open."
      />

      <section className="shell pt-14 md:pt-20">
        {/* `min-w-0` on each item stops the long email address setting a
            min-content floor that blows the grid out on phones. */}
        <ul className="grid gap-7 md:grid-cols-2">
          {/* Email. Deliberately not a wrapping link — it carries its own
              buttons, and a button can't legally nest inside an anchor. */}
          <Reveal as="li" className="min-w-0">
            <div className="card flex h-full flex-col p-8 md:p-10">
              <Badge color="var(--color-marigold)">
                <svg
                  viewBox="0 0 24 24"
                  className="size-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <path d="m3.5 6.5 8.5 6 8.5-6" />
                </svg>
              </Badge>

              <p className="eyebrow mt-7">Email</p>
              <p
                id="email-address-value"
                className="mt-2 font-display text-xl leading-tight font-extrabold [overflow-wrap:anywhere] sm:text-2xl md:text-3xl"
              >
                {CONTACT.email}
              </p>
              <p className="mt-4 text-lg text-ink-2">
                Best for order details and anything with pictures attached.
              </p>

              <EmailActions email={CONTACT.email} className="mt-auto pt-8" />
            </div>
          </Reveal>

          {/* Instagram has a single destination, so the whole card links. */}
          <Reveal as="li" delay={110} className="min-w-0">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-lift group flex h-full flex-col p-8 md:p-10"
            >
              <Badge color="var(--color-bubble)">
                <svg
                  viewBox="0 0 24 24"
                  className="size-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
              </Badge>

              <p className="eyebrow mt-7">Instagram</p>
              <p className="mt-2 font-display text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl">
                {CONTACT.instagramHandle}
              </p>
              <p className="mt-4 text-lg text-ink-2">Or instagram dm.</p>

              <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-ink-2 transition-colors group-hover:text-ink">
                Open Instagram
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  &rarr;
                </span>
              </span>
            </a>
          </Reveal>
        </ul>
      </section>

      <section className="shell pt-20 md:pt-28">
        <Reveal>
          <div className="card px-7 py-14 text-center md:px-14">
            <h2 className="text-big font-display font-extrabold">
              Ready to order?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
              There&rsquo;s a short form that covers everything I need to know.
            </p>
            <Link href="/ordering" className="btn mt-8">
              Go to Ordering
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
