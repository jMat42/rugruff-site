/**
 * Builds the embeddable static export.
 *
 * Exists so the base path can be set without a cross-platform env-var
 * dependency, and so the sub-path lives in one place rather than being
 * retyped on every build.
 *
 *   node scripts/build-embed.mjs [basePath]
 *
 * Output lands in ./out and is served from <basePath> on the host site.
 */
import { spawnSync } from "node:child_process";

const basePath =
  process.argv[2] ?? process.env.EMBED_BASE_PATH ?? "/rugruff-site-preview";

if (!basePath.startsWith("/") || basePath.endsWith("/")) {
  console.error(
    `Base path must start with "/" and must not end with one. Got: ${basePath}`,
  );
  process.exit(1);
}

console.log(`Building static export mounted at ${basePath} ...`);

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    EMBED_BASE_PATH: basePath,
    // Read by the custom image loader, which is bundled into the client.
    NEXT_PUBLIC_EMBED_BASE_PATH: basePath,
  },
});

process.exit(result.status ?? 1);
