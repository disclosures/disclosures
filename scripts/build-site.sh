#!/usr/bin/env bash
set -e

echo "==> Building unified site..."

# Clean
rm -rf dist

# Build core library
echo "==> Building @disclosures/core..."
pnpm --filter @disclosures/core build

# Assemble vanilla site at root
echo "==> Copying vanilla site to dist/..."
mkdir -p dist/core
cp packages/vanilla/*.html packages/vanilla/shared.css packages/vanilla/hero.webp dist/
cp packages/core/dist/styles.css packages/core/dist/tokens.css packages/core/dist/index.global.js dist/core/

# Build Starlight docs into dist/docs/
echo "==> Building Starlight docs..."
pnpm --filter @disclosures/docs build
mv site/dist dist/docs

echo "==> Done. dist/ ready for deployment."
