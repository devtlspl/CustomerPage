#!/usr/bin/env bash
npm install
npm run build
git add dist -f
git commit -m "Deploy to gh-pages" || true
git subtree push --prefix dist origin gh-pages
