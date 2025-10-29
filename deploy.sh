#!/usr/bin/env bash
set -euo pipefail

echo "Deploying dist/ to gh-pages..."

if [ "${SKIP_INSTALL:-}" != "true" ]; then
  echo "Installing dependencies (npm install)"
  npm install
fi

echo "Building production bundle (npm run build)"
npm run build

echo "Staging dist/ for gh-pages commit"
git add dist -f

echo "Committing deploy snapshot (ignore errors if nothing changed)"
git commit -m "Deploy to gh-pages" || true

echo "Ensure remote points at SVX-WEB-25-002 if you recently renamed the repo:"
echo "  git remote set-url origin <git-url>/SVX-WEB-25-002.git"

echo "Pushing dist subtree to gh-pages"
git subtree push --prefix dist origin gh-pages

echo "Deployment command completed. Enable GitHub Pages on branch gh-pages if not already active."
