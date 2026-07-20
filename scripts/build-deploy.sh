#!/bin/bash
# ================================================================
# Builds the static "deploy/" package for Apache/cPanel hosting.
# Usage:  bash scripts/build-deploy.sh [https://www.yourdomain.com]
# ================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL="${1:-https://www.fleetblogistics.com}"
echo "▶ Building static package for: $SITE_URL"

# API route handlers can't be statically exported — set them aside for this build.
API_BACKUP=".api-routes-backup"
restore() { [ -d "$API_BACKUP" ] && rm -rf src/app/api && mv "$API_BACKUP" src/app/api; }
trap restore EXIT
mv src/app/api "$API_BACKUP"

rm -rf .next out deploy

STATIC_EXPORT=1 \
NEXT_PUBLIC_FORM_API=/php-api \
NEXT_PUBLIC_SITE_URL="$SITE_URL" \
npx next build

# Assemble deploy/
mkdir deploy
cp -R out/. deploy/
cp static-hosting/.htaccess deploy/.htaccess
cp -R static-hosting/php-api deploy/php-api
cp -R static-hosting/admin deploy/admin
cp static-hosting/DEPLOY-INSTRUCTIONS.md deploy/DEPLOY-INSTRUCTIONS.md

echo ""
echo "✅ deploy/ is ready — upload its CONTENTS to your hosting's public_html/"
echo "   (includes .htaccess, php-api/ mail handlers, sitemap.xml, robots.txt)"
