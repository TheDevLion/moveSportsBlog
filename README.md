# Move Sports Blog

## Product description
Move Sports Blog is a lightweight sports events showcase that lists upcoming activities, pricing, and status, pulling content from a Hygraph (GraphCMS) Hybrid GraphQL API. It is designed for quick browsing of confirmed or completed events while keeping draft content available for admins.

## Technical description
This is an Angular 15 single-page application that queries Hygraph using a GraphQL POST request. The app reads API configuration from `src/environment.ts` (ignored by git) and uses a read-only Content API token to fetch published or draft event entries.

## Technology stack (versions)
- Angular: 15.1.x
- Angular CLI: 15.1.1
- TypeScript: 4.9.4
- RxJS: 7.8.0
- Zone.js: 0.12.0
- Node.js: 18.x recommended
- Build tooling: @angular-devkit/build-angular 15.1.1

## Run locally
1) Install dependencies:
   - `npm ci`
2) Create your local environment file:
   - Copy `src/environment.example.ts` to `src/environment.ts`
   - Set `apiUrl` and `apiKey` to your Hygraph project values
3) Start the dev server:
   - `npm start`
4) Open `http://localhost:4200/`

## Deploy to GitHub Pages (CI)
This repo includes a GitHub Actions workflow that builds and deploys to `gh-pages` on every push to `main`.

1) Add repository secrets:
   - `HYGRAPH_API_URL`: your Hygraph Hybrid GraphQL endpoint
   - `HYGRAPH_API_KEY`: a **read-only Content API token** (safe for client-side use)
2) Enable GitHub Pages:
   - Settings -> Pages -> Source: `gh-pages` branch, `/ (root)` folder
3) Push to `main` and the workflow will publish the site

## Deploy to GitHub Pages (local)
If you prefer local deployment, ensure `src/environment.ts` is set and run:
- `npx ng build --configuration production --base-href "/<repo-name>/"`
- `npx ng deploy --base-href "https://<username>.github.io/<repo-name>/" --no-silent`

## Secrets guidance (Hygraph)
- Use a **public, read-only Content API token** with minimal permissions.
- Do not use management/admin tokens in client-side apps.
- Keep `src/environment.ts` out of git (already ignored) and store CI values in GitHub Secrets.
