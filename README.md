# Alena Mitrofanova — resume

Static resume site. TypeScript, Nuxt 4, Vue 3 Composition API, native CSS. Built as SSG for GitHub Pages.

Live URL: `https://amitrofanova.github.io/resume/`

## Setup

```bash
pnpm install
pnpm dev
```

The app is served at [http://localhost:3000/resume/](http://localhost:3000/resume/).

**PDF** in the header downloads the current locale from `public/`. After editing `app/data/resume.ru.ts` or `resume.en.ts`, keep `pnpm dev` running and regenerate:

```bash
pnpm pdf
```

The first run may install Playwright Chromium. Commit the updated `public/*.pdf` files — `pnpm generate` only copies them into the GitHub Pages build and does not reprint.

```bash
pnpm lint
pnpm generate
```
