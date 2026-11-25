// Lists every [placeholder] value left in the editable content files.
// Run before launch: npm run check:placeholders
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dirs = ["src/content", "src/lib"];
const pattern = /"(\[[^\]"]+\])"/g;
let count = 0;

for (const dir of dirs) {
  for (const file of readdirSync(dir)) {
    const path = join(dir, file);
    readFileSync(path, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (line.trim().startsWith("//")) return;
        for (const m of line.matchAll(pattern)) {
          count++;
          console.log(`${path}:${i + 1}  ${m[1]}`);
        }
      });
  }
}

console.log(count ? `\n${count} placeholder(s) to replace before launch.` : "No placeholders found.");
process.exitCode = count ? 1 : 0;
