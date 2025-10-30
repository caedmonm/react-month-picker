import { mkdirSync, copyFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, "..");
const source = resolve(root, "src", "styles.css");
const destinationDir = resolve(root, "dist");
const destination = resolve(destinationDir, "styles.css");

mkdirSync(destinationDir, { recursive: true });
copyFileSync(source, destination);
