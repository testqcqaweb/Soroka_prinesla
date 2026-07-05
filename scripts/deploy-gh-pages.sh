#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/apps/web/out"

echo "→ Building static site for GitHub Pages..."
cd "$ROOT/apps/web"
GITHUB_PAGES=true npm run build
cp out/index.html out/404.html

echo "→ Publishing to gh-pages branch..."
cd "$OUT"
git init -q
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git branch -M gh-pages
git push -f "https://github.com/testqcqaweb/Soroka_prinesla.git" gh-pages

echo ""
echo "✓ Deployed to gh-pages branch"
echo "→ Enable Pages once: https://github.com/testqcqaweb/Soroka_prinesla/settings/pages"
echo "   Source: branch gh-pages, folder / (root)"
echo "→ Your link: https://testqcqaweb.github.io/Soroka_prinesla/"
