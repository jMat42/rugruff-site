/**
 * Single source of truth for site content.
 *
 * Wording is carried over from rugruff.com, with the live site's spelling
 * mistakes corrected on request: "Premaid" -> "Premade", "Scence" ->
 * "Scene", "Collaberations" -> "Collaborations", and "Dm" -> "DM". The
 * phrasing is otherwise the client's own.
 */

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/my-work", label: "My Work" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact me" },
  { href: "/ordering", label: "Ordering" },
] as const;

/**
 * Independent-maker notice. This does not license anything — it exists to
 * make clear there is no affiliation or endorsement, which is the part a
 * trademark confusion argument actually turns on. Deliberately kept out of
 * page titles, meta descriptions and image alt text, since automated
 * brand-protection crawlers key off those.
 *
 * Legal-sounding copy on a minor's business site should be signed off by a
 * parent or guardian before it goes live.
 */
export const DISCLAIMER = {
  footer:
    "RugRuff is an independent maker. Rugs featuring recognisable characters, logos or teams are one-off pieces made to a customer's design, and are not licensed by, affiliated with, endorsed by or sponsored by any rights holder. All trademarks and characters remain the property of their respective owners.",
  gallery:
    "Some pieces here were made to a customer's own design and are shown as examples of past work.",
} as const;

export const CONTACT = {
  email: "rugruffbusiness@gmail.com",
  instagramHandle: "@rugruff",
  instagramUrl: "https://www.instagram.com/rugruff/",
  orderForm: "https://forms.gle/7UMgKsgimcgNkTws8",
} as const;

/**
 * Gmail's compose URL, used as the *primary* email action everywhere on
 * the site. A `mailto:` only fires when the device has a default mail
 * handler registered, which most of this audience does not — so Gmail
 * leads and `mailto:` is offered as the secondary route.
 */
export function gmailComposeUrl(
  subject = "Rug enquiry",
  email: string = CONTACT.email,
) {
  return (
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}` +
    `&su=${encodeURIComponent(subject)}`
  );
}

export const WHY = [
  {
    title: "Young",
    body: "Bright Ideas & Open To Change",
    color: "var(--color-marigold)",
  },
  {
    title: "Friendly",
    body: "Open Minded And Easy To Work With",
    color: "var(--color-bubble)",
  },
  {
    title: "Trusted",
    body: "Worked With Many Brands & Influencers",
    color: "var(--color-grape)",
  },
  {
    title: "Affordable",
    body: "Some Of The Lowest Prices In The Tufting Scene",
    color: "var(--color-orange)",
  },
] as const;

export type Piece = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

/**
 * Gallery order is interleaved on purpose: the masonry cycles blob shape,
 * pile seed and accent colour by index, so mixing older and newer pieces
 * keeps neighbouring frames from repeating a shape or colour.
 *
 * `ig-*` files came from the client's public Instagram (@rugruff) and are
 * his own finished pieces — one representative shot per post, process and
 * duplicate shots left out.
 */
export const WORK: Piece[] = [
  {
    src: "/work/rug-01.jpeg",
    alt: "Hand-tufted flower rug in black and white with purple leaves and a pink centre",
    w: 1152,
    h: 1536,
  },
  {
    src: "/work/ig-mask-mashup.jpg",
    alt: "Hand-tufted mash-up mask rug in red, green and black, photographed on grass",
    w: 1080,
    h: 1234,
  },
  {
    src: "/work/rug-04.jpeg",
    alt: "Hand-tufted smiling sun rug in yellow and orange with a white tufted border",
    w: 1152,
    h: 1536,
  },
  {
    src: "/work/ig-horse-head.jpg",
    alt: "Hand-tufted blue and orange horse-head rug lying on grass",
    w: 1080,
    h: 1080,
  },
  {
    src: "/work/ig-ninja-boy.jpg",
    alt: "Hand-tufted anime character rug in orange and yellow with a white pile outline",
    w: 1080,
    h: 1174,
  },
  {
    src: "/work/rug-05.jpeg",
    alt: "Two hand-tufted rugs on a wood floor: a grey character rug and a yellow dripping smiley",
    w: 1536,
    h: 1152,
  },
  {
    src: "/work/ig-blue-race-car.jpg",
    alt: "Hand-tufted blue rally car rug shown front-on, laid out on grass",
    w: 1080,
    h: 1438,
  },
  {
    src: "/work/ig-sweets-wrapper.jpg",
    alt: "Hand-tufted rug in pink and yellow with sweets arranged on top of it",
    w: 1080,
    h: 1440,
  },
  {
    src: "/work/ig-alchemist-duo.jpg",
    alt: "Hand-tufted rug of two anime characters, one blond in red, one in grey armour",
    w: 1080,
    h: 1440,
  },
  {
    src: "/work/shot-01.png",
    alt: "Hand-tufted pale blue box-logo rug with black leopard print lettering",
    w: 1200,
    h: 790,
  },
  {
    src: "/work/ig-red-black-figure.jpg",
    alt: "Hand-tufted rug of a caped figure in bold red, black and white",
    w: 1080,
    h: 1440,
  },
  {
    src: "/work/rug-02.jpeg",
    alt: "Hand-tufted custom rug laid out on the floor",
    w: 1152,
    h: 1536,
  },
  {
    src: "/work/ig-red-cloud.jpg",
    alt: "Hand-tufted red and white cloud-shaped rug propped against a kerb",
    w: 1080,
    h: 1440,
  },
  {
    src: "/work/shot-03.png",
    alt: "Hand-tufted black and white lettering rug photographed on a wood floor",
    w: 1200,
    h: 916,
  },
  {
    src: "/work/ig-pink-sports-car.jpg",
    alt: "Hand-tufted cream and pink sports car rug on a dark speckled floor",
    w: 1080,
    h: 1440,
  },
  {
    src: "/work/rug-03.jpeg",
    alt: "Hand-tufted custom rug with a thick white pile outline",
    w: 1152,
    h: 1536,
  },
  {
    src: "/work/ig-red-portrait.jpg",
    alt: "Hand-tufted portrait rug worked in red and cream, laid on concrete",
    w: 1080,
    h: 1440,
  },
  {
    src: "/work/shot-02.png",
    alt: "Hand-tufted white script lettering rug on a black base, photographed on grass",
    w: 1200,
    h: 1116,
  },
  {
    src: "/work/rug-06.jpeg",
    alt: "Finished RugRuff piece photographed from above",
    w: 1536,
    h: 2048,
  },
  {
    src: "/work/shot-04.png",
    alt: "Finished RugRuff commission photographed after trimming",
    w: 1200,
    h: 916,
  },
];

/**
 * `w`/`h` are the real pixel dimensions of each file. They were previously
 * hardcoded to 1200x900 for every entry on the page, which was wrong for
 * all of them — the ratios range from 0.58 to 1.31 — and reserved the
 * wrong space before the image loaded.
 */
export const COLLABS = [
  {
    name: "Cdp Media",
    src: "/collabs/cdp-media.png",
    alt: "Cdp Meetup collaboration with RugRuff",
    caption: "Cdp Meetup",
    href: "https://www.instagram.com/reel/DRoI9qZDRWD",
    linkLabel: "Watch the reel",
    color: "var(--color-marigold)",
    w: 448,
    h: 767,
  },
  {
    name: "Phantom Kai Boots",
    src: "/collabs/phantom-kai.png",
    alt: "Phantom Kai Giveaway collaboration with RugRuff",
    caption: "Phantom Kai Giveaway",
    href: null,
    linkLabel: null,
    color: "var(--color-bubble)",
    w: 895,
    h: 730,
  },
  {
    name: "Liam Abner Magic",
    src: "/collabs/liam-abner.png",
    alt: "Liam Abner Magic collaboration with RugRuff",
    caption: null,
    href: null,
    linkLabel: null,
    color: "var(--color-grape)",
    w: 880,
    h: 670,
  },
  {
    // Shares the gallery's copy of this photo rather than shipping a
    // second 600KB of the same image under /collabs.
    name: "ultimatespideyy",
    src: "/work/ig-mask-mashup.jpg",
    alt: "Hand-tufted mask rug, half red webbed mask and half green, photographed on grass",
    caption: "Spider-Man: Brand New Day giveaway",
    href: "https://www.instagram.com/ultimatespideyy/",
    linkLabel: "See the profile",
    color: "var(--color-orange)",
    w: 1080,
    h: 1235,
  },
] as const;
