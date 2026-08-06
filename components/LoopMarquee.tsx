/**
 * An endless strand of yarn loops running across the page, carrying the
 * client's own tagline. Two identical halves translate -50% so the seam
 * never shows; `aria-hidden` on the duplicate keeps it out of the
 * accessibility tree.
 */

const ITEMS = ["Custom Rugs", "Premade Rugs", "Or Just Look Around"];

function Loop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 24"
      className="h-6 w-10 shrink-0"
      fill="none"
    >
      <path
        d="M2 18 C 2 4, 14 4, 14 14 C 14 22, 26 22, 26 12 C 26 2, 38 4, 38 18"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LoopMarquee({
  className = "",
}: {
  className?: string;
}) {
  const half = (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {ITEMS.map((item) => (
        <div key={item} className="flex items-center gap-8 md:gap-12">
          <span className="font-display text-xl font-extrabold whitespace-nowrap md:text-3xl">
            {item}
          </span>
          <Loop />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden border-y-[2.5px] border-coral-deep bg-coral py-4 text-white ${className}`}
    >
      <div className="marquee-track flex w-max">
        {half}
        <div aria-hidden="true" className="contents">
          {half}
        </div>
      </div>
    </div>
  );
}
