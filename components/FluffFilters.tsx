/**
 * The engine behind the tufted look.
 *
 * Each filter roughs up the edge of whatever it's applied to using
 * fractal noise as a displacement map — the same way a tufting gun
 * leaves an uneven, fuzzy pile edge. Three seeds so neighbouring
 * frames never fray identically.
 *
 * Applied only to the white/coloured ring behind an image (see
 * `.tufted::before` in globals.css), never to the photo itself.
 */
export default function FluffFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0"
    >
      <defs>
        <filter id="fluff" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves={4}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={22}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="fluff-b" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.055"
            numOctaves={4}
            seed={23}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={19}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="fluff-c" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves={5}
            seed={41}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={26}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
