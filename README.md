# Remedy Rex's Bouncy House & Inflatables

Official website for Remedy Rex's Bouncy House & Inflatables — Glendora, Gloucester Township, NJ.

## Pages
- `index.html` — Home
- `about.html` — About Us
- `inventory.html` — Full Inventory
- `contact.html` — Contact & Quote Form

## Tech Stack
- Plain HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Fredoka One + Nunito
- No build step required — deploy directly

## Deploying to Vercel
1. Push this repo to GitHub
2. Import the GitHub repo in [Vercel](https://vercel.com)
3. Framework preset: **Other** (static HTML)
4. Output directory: `.` (root)
5. Click Deploy — done!

## Updating Social Links
In each HTML file, search for `remedyrexbounce` and replace with the correct handles once confirmed.

## Contact Form
The contact form currently uses `mailto:` — to connect it to a real backend (email delivery), consider:
- [Formspree](https://formspree.io) — free tier, just swap the form `action` URL
- [Netlify Forms](https://netlify.com) — if migrating to Netlify

## DNS (pointing domain to Vercel)
After deploying on Vercel:
1. Go to your Vercel project → Settings → Domains
2. Add `remedyrexbounce.com` and `www.remedyrexbounce.com`
3. Vercel will give you DNS records to add at your domain registrar
4. Update your registrar's DNS with the A record and CNAME provided

© 2025 Remedy Rex's Bouncy House & Inflatables
