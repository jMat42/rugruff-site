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
                  src="/brand/logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className="size-9 object-contain"
                />
              </span>
              <span className="font-display text-3xl font-extrabold">
                RugRuff
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-lg leading-relaxed text-ink-2">
              Custom Rugs, Premade Rugs Or Just Look Around.
            </p>
            <Link href="/ordering" className="btn btn-orange mt-7">
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
      </div>
    </footer>
  );
}
