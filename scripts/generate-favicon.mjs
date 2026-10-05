import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Mechanical raster export of the existing brand artwork; no new logo design.
// Sharp is already installed by Next. The committed PNG needs no runtime renderer.
const source = fileURLToPath(new URL("../app/icon.svg", import.meta.url));
const target = fileURLToPath(new URL("../public/favicon.png", import.meta.url));
await sharp(source, { density: 216 }).resize(96, 96).png().toFile(target);
console.log("Generated public/favicon.png (96×96) from app/icon.svg");
