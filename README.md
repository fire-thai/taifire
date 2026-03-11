<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c2740a90-f04c-4110-8fd4-df2ffb58ae69

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## CI/CD to GitHub Pages

The repository now includes an automatic deploy workflow in `.github/workflows/deploy.yml`.

How it works:
- Every push to `main` triggers a production build.
- The built `dist` folder is published to GitHub Pages with GitHub Actions.
- The Vite `base` path is set automatically in CI:
  - `/` for `<owner>.github.io` repositories.
  - `/<repo>/` for project repositories.

One-time GitHub setup:
1. Open **Settings → Pages**.
2. In **Source**, select **GitHub Actions**.
3. Save.

After that, each push to `main` will deploy your latest changes automatically.
