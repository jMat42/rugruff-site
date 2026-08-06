import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Emitted as a static /robots.txt at build time, so it survives the
 * static export that gets uploaded to shared hosting.
 *
 * WordPress was generating this before; removing it took the file with
 * it, hence this replacement.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
