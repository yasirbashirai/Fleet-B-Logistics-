---
name: verify
description: Build, run, and drive the Fleet B Logistics site to verify changes at the browser surface.
---

# Verify Fleet B Logistics changes

## Build & launch
```bash
# NEVER build while `next dev` is running (shared .next corrupts) — check first:
lsof -i :3000 -i :3001 | grep -i listen
npx next build
npx next start -p 3111 &   # prod server; pages at http://localhost:3111
```

## Drive
- Content checks: `curl -s http://localhost:3111/<page> | grep ...`
- Redirects: `curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://localhost:3111/<old-url>`
- Forms (no SMTP locally — mailer logs instead of sending, watch server log):
  `curl -X POST http://localhost:3111/api/{contact,apply,onboarding} -H "Content-Type: application/json" -d '{...}'`
  Required onboarding fields: fullLegalName, email, signature.
- Browser/interaction/screenshots: no puppeteer in repo — `npm install puppeteer-core` in scratchpad and use system Chrome at
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Mobile viewport: 390x844.
  React inputs need the native value-setter + `input` event trick to fill programmatically.

## Gotchas
- Sticky header + anchor nav ≈ 170px; the OnboardingWizard scrolls itself to that offset on step change.
- All rates/percentages render from `src/lib/rates.ts` — verify displayed numbers against it.
- Static-hosting variant (`deploy/`, `scripts/build-deploy.sh`) is a separate build (STATIC_EXPORT=1); Vercel is the live deployment.
