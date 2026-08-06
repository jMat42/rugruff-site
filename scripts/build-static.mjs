/**
 * Builds the site as flat static files for a host with no Node runtime —
 * shared hosting such as Hostinger, where you upload a folder into
 * public_html over FTP or the file manager.
 *
 *   npm run build:static
 *
 * Output lands in ./out. Upload the CONTENTS of that folder (not the
 * folder itself) to public_html.
 *
 * Two things do not survive a static export and must be re-created on the
 * host, because there is no Node process left to run them:
 *   - the redirects in next.config.ts  -> .htaccess (see below)
 *   - next/image optimisation          -> images are served at full size
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_EXPORT: "1" },
});

if (result.status !== 0) process.exit(result.status ?? 1);

const outDir = path.resolve("out");

/*
 * The legacy WordPress redirects cannot come from next.config.ts in a
 * static export, so they ship as host config instead. Both formats are
 * written because each host ignores the other's file, which makes the
 * bundle portable between Apache shared hosting and Cloudflare Pages —
 * and means moving hosts cannot silently drop the redirects.
 */
const REDIRECTS = [
  ["/collaberations", "/collaborations/"],
  ["/contact-me", "/contact/"],
];

// Apache (Hostinger and most shared hosting).
const htaccess = `# Redirects carried over from the old WordPress URLs.
<IfModule mod_rewrite.c>
  RewriteEngine On
${REDIRECTS.map(([from, to]) => `  RewriteRule ^${from.slice(1)}/?$ ${to} [R=301,L]`).join("\n")}
</IfModule>

ErrorDocument 404 /404.html
`;
fs.writeFileSync(path.join(outDir, ".htaccess"), htaccess);

// Cloudflare Pages. Ignores .htaccess entirely, and serves 404.html itself.
const redirects = `# Redirects carried over from the old WordPress URLs.
${REDIRECTS.map(([from, to]) => `${from}  ${to}  301`).join("\n")}
`;
fs.writeFileSync(path.join(outDir, "_redirects"), redirects);

// Hashed build assets never change contents, so they can be cached hard.
const headers = `/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
`;
fs.writeFileSync(path.join(outDir, "_headers"), headers);

console.log("\nWrote out/.htaccess, out/_redirects and out/_headers.");
console.log("Apache reads .htaccess; Cloudflare Pages reads _redirects/_headers.");
