import Link from "next/link";
import Image from "next/image";
import { NAV, CONTACT, DISCLAIMER, gmailComposeUrl } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="cloth-warm relative mt-24 border-t-[2.5px] border-ink md:mt-32">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border-[2.5px] border-ink bg-white">
                <Image
                  src="/brand/logo-transparent.png"
                  alt=""
                  width={429}
                  height={407}
                  className="size-[32px] object-contain"
                />
              </span>
              <span className="font-display text-3xl font-extrabold">
                RugRuff
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-lg leading-relaxed text-ink-2">
              Custom Rugs, Premade Rugs Or Just Look Around.
            </p>
            <Link href="/ordering" className="btn mt-7">
              View Options
            </Link>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Pages</h2>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Get in touch</h2>
            <ul className="mt-5 space-y-2.5">
              <li>
                {/* Opens Gmail compose rather than firing a mailto:, to
                    match the primary email action on every other surface. */}
                <a
                  href={gmailComposeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold break-words text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Instagram {CONTACT.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 max-w-3xl border-t-2 border-ink/15 pt-7 text-xs leading-relaxed text-ink-3">
          {DISCLAIMER.footer}
        </p>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm font-medium text-ink-2">
            Copyright &copy; 2026 RugRuff
          </p>
          <a
            href="#content"
            className="text-sm font-bold text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Scroll to Top &uarr;
          </a>
        </div>

        {/* Studio credit. Deliberately the quietest thing on the page. */}
        <div className="mt-5 flex justify-start sm:justify-end">
          <a
            href="https://hatchbench.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-3 transition-colors hover:text-ink-2"
          >
            <HatchMark className="size-3 shrink-0" />
            Made by Hatchbench
          </a>
        </div>
      </div>
    </footer>
  );
}

function HatchMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 17 C2.5 7 6 2 11 2 C16 2 19.5 7 19.5 17 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1="2.5"
        y1="17"
        x2="19.5"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="11"
        y1="2"
        x2="11"
        y2="17"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
      />
    </svg>
  );
}
