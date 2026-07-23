# ZoomBibleStudy.com — Cloudflare & GitHub Ready

This is a lightweight static website. It does not require WordPress, Elementor, a database, a framework, or a build command.

## What is included

- Elegant, responsive landing page
- Approved ZoomBibleStudy.com logo
- Free *Steps to Christ* ebook offer
- Live Zoom Bible discussion offer
- Signup form with configurable endpoint
- Thank-you page
- Privacy page
- 404 page
- SEO metadata, sitemap, robots file, security headers, and favicon
- Cloudflare Pages and GitHub Pages compatibility

## Required before collecting signups

Open `assets/config.js` and replace:

```js
formEndpoint: "REPLACE_WITH_YOUR_FORM_ENDPOINT"
```

with the form endpoint from your email or form provider, such as Formspree, Kit, Mailchimp, Brevo, GoHighLevel, or another service that accepts form POST requests.

You may also add optional direct links:

```js
ebookUrl: "https://your-link-to-the-ebook"
zoomUrl: "https://your-zoom-registration-link"
```

Those optional links will appear on the thank-you page.

## Upload to Cloudflare Pages

1. Open **Workers & Pages** in Cloudflare.
2. Choose **Pages** and then **Direct Upload**.
3. Upload the ZIP file without changing its internal folder structure.
4. Set `zoombiblestudy.com` as the custom domain.
5. No build command or output directory is needed.

## Upload to GitHub

Upload all files and folders in this package to the root of your repository. The homepage must remain named `index.html` at the repository root.

For automatic Cloudflare deployment, connect the GitHub repository to Cloudflare Pages and use:

- Framework preset: **None**
- Build command: leave blank
- Build output directory: `/`

## Editing

Most wording is in `index.html`. Colors and layout are in `assets/styles.css`. The three brand colors are:

- Dark blue: `#011C45`
- Yellow: `#FAC228`
- Light Mist: `#F0F4F8`
