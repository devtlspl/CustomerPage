param(
  [switch]$SkipInstall
)

Write-Host "▶ Deploying dist/ to gh-pages..." -ForegroundColor Cyan

if (-not $SkipInstall) {
  Write-Host "→ Installing dependencies (npm install)" -ForegroundColor DarkCyan
  npm install
  if ($LASTEXITCODE -ne 0) {
    throw "npm install failed. Aborting deploy."
  }
}

Write-Host "→ Building production bundle (npm run build)" -ForegroundColor DarkCyan
npm run build
if ($LASTEXITCODE -ne 0) {
  throw "npm run build failed. Aborting deploy."
}

Write-Host "→ Staging dist/ for gh-pages commit" -ForegroundColor DarkCyan
git add dist -f

Write-Host "→ Committing deploy snapshot (ignore errors if nothing changed)" -ForegroundColor DarkCyan
git commit -m "Deploy to gh-pages" | Out-Null

Write-Host "→ Pushing dist subtree to gh-pages" -ForegroundColor DarkCyan
git subtree push --prefix dist origin gh-pages

Write-Host "✓ Deployment command completed. Enable GitHub Pages on branch gh-pages if not already active." -ForegroundColor Green
