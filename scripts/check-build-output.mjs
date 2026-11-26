// Fails the build if any [bracketed placeholder] text reaches a prerendered page.
// Runs automatically after `npm run build` (see "postbuild" in package.json).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = "dist";
if (!existsSync(root)) {
  console.error(`check-build-output: ${root} not found. Run "npm run build" first.`);
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith(".html")) yield path;
  }
}

/** Visible text only: drop scripts, styles and tags (class names like text-[1rem] live in attributes). */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

const placeholder = /\[[A-Za-z+][^\][]{1,600}\]/g;
let found = 0;

for (const file of htmlFiles(root)) {
  const html = readFileSync(file, "utf8");
  const hits = new Set([
    ...(visibleText(html).match(placeholder) ?? []),
    // Placeholders inside attributes that are user-visible or crawled (meta, alt, title, href).
    ...[...html.matchAll(/(?:content|alt|title|aria-label|href)="([^"]*)"/g)].flatMap(
      (m) => m[1].match(placeholder) ?? [],
    ),
  ]);
  if (hits.size) {
    found += hits.size;
    console.log(`\n${relative(root, file)}`);
    for (const h of hits) console.log(`  ${h}`);
  }
}

if (found) {
  console.error(`\ncheck-build-output: ${found} placeholder(s) found in production pages.`);
  process.exit(1);
}
console.log("check-build-output: no placeholders in production pages.");
