# Zoom Bible Study Website

A fast, custom-coded landing website for ZoomBibleStudy.com. No WordPress, Elementor, database, or build process is required.

## Files

- `index.html` — homepage
- `thank-you.html` — post-signup confirmation page
- `privacy.html` — privacy policy template
- `404.html` — custom error page
- `assets/styles.css` — all design styles
- `assets/site.js` — mobile menu, animations, and signup handling
- `assets/config.js` — signup form connection settings
- `_headers` — Cloudflare Pages security and caching rules

## Connect the signup form

Open `assets/config.js` and replace the empty `formEndpoint` value with your form provider endpoint.

Example using Formspree:

```js
window.SITE_CONFIG = {
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  successRedirect: "thank-you.html"
};
```

The page will deliberately show an error until a real endpoint is added. This prevents registrations from being silently lost.

## Publish with Cloudflare Pages

1. Upload all files in this folder to the root of your GitHub repository.
2. In Cloudflare, open **Workers & Pages**.
3. Choose **Create application → Pages → Connect to Git**.
4. Select the repository.
5. Framework preset: **None**.
6. Build command: leave blank.
7. Build output directory: `/`.
8. Deploy.
9. Add `zoombiblestudy.com` under **Custom domains** after reviewing the preview.

## Before launch

- Connect the signup form.
- Replace the contact placeholder in `privacy.html`.
- Verify the August 13 event details.
- Add analytics only if needed.
- Test one complete signup on desktop and mobile.
