import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Five stars. My human says 'satset' then vanishes for six hours, but he always comes back with snacks and better ideas. Would get adopted again.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

const back = readFileSync(target, "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the review line exactly");
}
if (back.endsWith("\n") || back.length !== 143) {
  throw new Error("entry.txt must be exactly 143 characters with no trailing newline");
}
const byteCount = Buffer.byteLength(back, "utf8");
if (byteCount !== 143) {
  throw new Error(`entry.txt must be exactly 143 bytes, got ${byteCount}`);
}

console.log(`Wrote entry.txt (${line.length} characters, ${byteCount} bytes) to ${outDir}`);
