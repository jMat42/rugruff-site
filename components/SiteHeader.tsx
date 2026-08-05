"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  // Close the sheet on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock the page behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        stuck
          ? "border-b-[2.5px] border-ink bg-canvas/85 backdrop-blur-md"
          : "border-b-[2.5px] border-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="RugRuff — home"
        >
          <span className="grid size-11 place-items-center rounded-full border-[2.5px] border-ink bg-white transition-transform duration-300 group-hover:-rotate-12">
            <Image
              src="/brand/logo.png"
              alt=""
              width={44}
              height={44}
              className="size-8 object-contain"
              priority
            />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">
            RugRuff
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                isActive(item.href)
                  ? "text-ink"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-1 h-[0.3em] rounded-full bg-marigold"
                />
              )}
            </Link>
          ))}
          <Link href="/ordering" className="btn btn-orange ml-3 !py-2.5 !text-base">
            Ordering
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="grid size-12 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-white shadow-[0_4px_0_0_var(--color-ink)] transition-transform active:translate-y-1 active:shadow-none lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-[3px] w-6 rounded-full bg-ink transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[3px] w-6 rounded-full bg-ink transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[3px] w-6 rounded-full bg-ink transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`cloth-warm fixed inset-x-0 top-[4.5rem] bottom-0 z-40 border-t-[2.5px] border-ink transition-all duration-300 lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-2 py-8">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ transitionDelay: open ? `${i * 45 + 60}ms` : "0ms" }}
              className={`flex items-center justify-between rounded-2xl border-[2.5px] border-ink px-5 py-4 font-display text-2xl font-extrabold transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${
                isActive(item.href)
                  ? "bg-marigold shadow-[0_5px_0_0_var(--color-ink)]"
                  : "bg-white shadow-[0_5px_0_0_var(--color-ink)]"
              }`}
            >
              {item.label}
              <span aria-hidden="true" className="text-ink-3">
                &rarr;
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
