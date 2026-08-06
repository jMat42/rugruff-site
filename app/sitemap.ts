import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

/**
 * Built from NAV so the sitemap cannot drift from the real navigation —
 * adding a page to NAV adds it here automatically.
 *
 * `force-static` matters: without it this would not be emitted into the
 * static export that gets uploaded to shared hosting.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return NAV.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
