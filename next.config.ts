import type { NextConfig } from "next";

/**
 * Two build targets from one codebase.
 *
 * Default (`npm run build`) is the real client site: server-rendered on its
 * own domain at the root, with redirects from the old WordPress URLs.
 *
 * Embed (`npm run build:embed`) produces a fully static export mounted under
 * a sub-path, for hosting the demo inside another site. It deliberately does
 * NOT change anything about the client deliverable — same components, same
 * content, just relinked and pre-rendered to flat files.
 */
const embedBasePath = process.env.EMBED_BASE_PATH;

const nextConfig: NextConfig = embedBasePath
  ? {
      output: "export",
      // basePath rewrites every <Link> and every next/image src; assetPrefix
      // does the same for the /_next/* bundles and self-hosted fonts.
      basePath: embedBasePath,
      assetPrefix: embedBasePath,
      // Emits `my-work/index.html` rather than `my-work.html`, which is what
      // static hosts resolve cleanly for a nested app.
      trailingSlash: true,
      // A static export has no image optimiser. `unoptimized: true` would
      // emit each src verbatim, dropping the basePath and 404ing every
      // photo — so use a loader that puts the prefix back instead.
      images: {
        loader: "custom",
        loaderFile: "./lib/embed-image-loader.ts",
      },
    }
  : {
      async redirects() {
        // The live WordPress site uses these paths. Keep inbound links —
        // and anything already shared on Instagram — working.
        return [
          {
            source: "/collaberations",
            destination: "/collaborations",
            permanent: true,
          },
          { source: "/contact-me", destination: "/contact", permanent: true },
        ];
      },
    };

export default nextConfig;
