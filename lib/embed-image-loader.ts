/**
 * Image loader for the embedded static export.
 *
 * `basePath` rewrites <Link> hrefs and the /_next/* bundles automatically,
 * but it does NOT rewrite a next/image `src` when the optimiser is off —
 * the src is emitted verbatim, so every photo 404s under a sub-path. This
 * loader puts the prefix back.
 *
 * The value has to be a NEXT_PUBLIC_* var because the loader is bundled
 * into the client, not just run at build time. Only used by the embed
 * build; the client site never loads this file.
 */
type LoaderArgs = { src: string; width: number; quality?: number };

export default function embedImageLoader({ src }: LoaderArgs): string {
  const base = process.env.NEXT_PUBLIC_EMBED_BASE_PATH ?? "";

  // Leave absolute and already-prefixed URLs alone.
  if (/^https?:\/\//.test(src)) return src;
  if (base && src.startsWith(`${base}/`)) return src;

  return `${base}${src}`;
}
