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

// Ship the redirects alongside the export so they are not silently lost.
const htaccess = `# Redirects carried over from the old WordPress URLs.
# next.config.ts cannot apply these in a static export, so they live here.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^collaberations/?$ /collaborations/ [R=301,L]
  RewriteRule ^contact-me/?$ /contact/ [R=301,L]
</IfModule>

ErrorDocument 404 /404.html
`;

const outDir = path.resolve("out");
fs.writeFileSync(path.join(outDir, ".htaccess"), htaccess);

console.log("\nWrote out/.htaccess with the two legacy redirects.");
console.log("Upload the CONTENTS of ./out into public_html.");
