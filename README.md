# Customer Dashboard (Aurora Client Portal)

High-end IT asset portal built with React, TypeScript, Vite, and Tailwind CSS. Delivers a futuristic glassmorphism aesthetic for managing device fleets, software subscriptions, billing, and IT support workflows.

## Key Features
- **Premium UI shell:** Frosted sidebar navigation, translucent top bar, responsive layout with micro-interactions.
- **Dashboard insights:** Hero welcome panel, stat cards with sparklines, trend and distribution charts, activity timeline.
- **IT asset management:** Filterable table, status pills, and contextual detail drawer across laptops, networking gear, and SaaS.
- **Invoices & delivery challans:** Dual-tab view with cards, status chips, and historical timeline.
- **Payments analytics:** Summary cards, bar/donut charts, and segmented tracker list.
- **Support hub:** Contact options, guided ticket workflow, device return form, and history timeline.

## Getting Started

```bash
npm install
npm run dev
```

Visit the URL reported by Vite (default: `http://localhost:5173`).

## Tech Stack
- React 18 + TypeScript
- Vite 5 build tooling
- Tailwind CSS with custom glassmorphism theme
- Recharts for data visualizations
- Headless UI for responsive dialog/sidebar interactions

## Project Structure

```
src/
  components/
    layout/     # Sidebar, top bar, layout shell
    dashboard/  # Reusable cards & charts
    ui/         # Shared UI primitives (icons, glass card)
  pages/        # Route pages: Dashboard, Assets, Documents, Payments, Support
```

## Customization
- Adjust color tokens and shadows in `tailwind.config.ts`.
- Update reusable utility classes in `src/main.css`.
- Replace mock data in each page with real API integrations or state management.

## Scripts
- `npm run dev` - Start Vite dev server.
- `npm run build` - Type-check and build for production.
- `npm run preview` - Preview built assets locally.
- `powershell -ExecutionPolicy Bypass -File ./deploy.ps1` - Build and push `dist/` to `gh-pages` (Windows).

During `npm run build`, a `postbuild` step copies `dist/index.html` to `dist/404.html` so direct links to routes keep working on GitHub Pages.

## Automated Deployment
A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes the site whenever you push to the `main` branch:
1. Push commits to `main`.
2. The workflow installs dependencies, runs `npm run build`, uploads the `dist/` artifact, and deploys it to GitHub Pages.
3. In your repository settings, set **Pages** → **Build and deployment** → **Source = GitHub Actions** the first time to activate the workflow output.
