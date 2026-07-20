# FLEET B LOGISTICS — Deployment Instructions (this folder)

This folder is the complete, ready-to-upload website for any Apache/cPanel
hosting (Hostinger, GoDaddy, Namecheap, etc.).

## How to deploy

1. Open your hosting File Manager (or connect via FTP).
2. Go to `public_html/` (or your domain's document root).
3. Upload **everything inside this folder** (not the folder itself), including
   the hidden `.htaccess` file — enable "show hidden files" if you don't see it.
4. Make sure your domain has SSL enabled (the `.htaccess` forces HTTPS).
5. Done. The site is live.

## What's included

- All website pages (pre-rendered, fast, SEO-ready)
- `.htaccess` — HTTPS redirect, legacy URL redirects, caching, compression, security headers
- `php-api/` — the form handlers (contact, owner-operator application, onboarding kit)
- `admin/` — the owner admin panel (see below)
- `sitemap.xml` + `robots.txt` — submit the sitemap in Google Search Console
- `404.html` — custom not-found page
- `documents/` — the onboarding kit + lease termination checklist PDFs

## ⭐ Owner admin panel — `https://yourdomain.com/admin/`

Password-protected page for the business owner (default password in
`php-api/config.php`, change it from the panel after first login):

- **Submissions inbox** — every contact message, driver application, and
  signed onboarding kit is SAVED on the server the moment it's submitted
  (`php-api/data/`, blocked from the web). Nothing is lost even if an
  email fails to send. Unread items are marked with a red dot.
- **Company Info** — the owner can change the phone number, public email,
  address, hours, and the notification email. The live website, forms,
  and outgoing emails update immediately, no rebuild or developer needed.

## ⭐ One thing to check: email delivery

Form submissions are emailed to **fleetblogistics@gmail.com** using PHP `mail()`.

For reliable delivery (not spam):
1. In your hosting panel, create a mailbox on the domain, e.g. `no-reply@yourdomain.com`.
2. Open `php-api/config.php` and set `FROM_EMAIL` to that address
   (by default it auto-uses `no-reply@<your-domain>`).
3. Send a test through the website's quote form and check the inbox (and spam folder).

To change where submissions are delivered, edit `NOTIFY_EMAIL` in `php-api/config.php`.

## Changing a rate/price later

Rates shown on the site are baked in at build time from `src/lib/rates.ts`
(in the source project). Rates used inside the **emails** can be edited live
in `php-api/config.php` on the server. For site-wide changes: edit
`src/lib/rates.ts`, run `bash scripts/build-deploy.sh https://yourdomain.com`,
and re-upload the `deploy/` folder.

## Rebuilding this package

From the source project:

```bash
bash scripts/build-deploy.sh https://www.yourdomain.com
```

(The domain argument sets the sitemap/canonical/email-link URLs.)
