#!/usr/bin/env bash
set -euo pipefail

echo "Deploying dist/ to gh-pages..."

if [ "${SKIP_INSTALL:-}" != "true" ]; then
  echo "Installing dependencies (npm install)"
  npm install
fi

if [ -z "${GITHUB_REPOSITORY:-}" ]; then
  remote_url=$(git remote get-url origin)
  if [[ $? -ne 0 ]]; then
    echo "Unable to detect git remote. Ensure this directory is a git repository." >&2
    exit 1
  fi

  if [[ "$remote_url" =~ github\.com[:/]+([^/.]+/[^/.]+)(\.git)?$ ]]; then
    export GITHUB_REPOSITORY="${BASH_REMATCH[1]}"
    echo "Detected repository: ${GITHUB_REPOSITORY}"
  else
    echo "Could not parse GitHub repository from remote URL '$remote_url'. Set GITHUB_REPOSITORY manually." >&2
    exit 1
  fi
fi

echo "Using base path for build: ${GITHUB_REPOSITORY}"

echo "Building production bundle (npm run build)"
npm run build

echo "Staging dist/ for gh-pages commit"
git add dist -f

echo "Committing deploy snapshot (ignore errors if nothing changed)"
git commit -m "Deploy to gh-pages" || true

echo "Pushing dist subtree to gh-pages"
git subtree push --prefix dist origin gh-pages

echo "Deployment command completed. Enable GitHub Pages on branch gh-pages if not already active."
