const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");

if (!fs.existsSync(indexPath)) {
  console.warn("postbuild: dist/index.html not found, skipping 404 fallback copy.");
  process.exit(0);
}

fs.copyFileSync(indexPath, fallbackPath);
console.log("postbuild: Created dist/404.html for SPA fallback.");
