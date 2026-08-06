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

/**
 * The track holds COPIES identical groups and slides left by exactly one
 * group width, then snaps back — so the seam never shows.
 *
 * The constraint that is easy to miss: the group that scrolls in behind the
 * first one has to be able to fill the screen on its own. Concretely,
 * (COPIES - 1) x groupWidth must exceed the viewport, or bare band appears
 * at the right edge near the end of every cycle. One group is ~1115px here,
 * so two copies only held up to 1115px wide and left a 765px gap at 1920.
 * Five copies cover ~4460px, past any ultrawide.
 *
 * The slide distance is 100%/COPIES, so adding copies does not change the
 * scroll speed — it still travels one group width per cycle.
 */
const COPIES = 5;

export default function LoopMarquee({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border-y-[2.5px] border-coral-deep bg-coral py-4 text-white ${className}`}
    >
      <div className="marquee-track flex w-max">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            // Only the first group is real content to a screen reader.
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
          >
            {ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-8 md:gap-12">
                <span className="font-display text-xl font-extrabold whitespace-nowrap md:text-3xl">
                  {item}
                </span>
                <Loop />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
