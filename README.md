# Customer Dashboard (Aurora Client Portal)

High-end customer portal built with React, TypeScript, Vite, and Tailwind CSS. Delivers a futuristic glassmorphism aesthetic for managing assets, invoices, payments, and support workflows.

## Key Features
- **Premium UI shell:** Frosted sidebar navigation, translucent top bar, responsive layout with micro-interactions.
- **Dashboard insights:** Hero welcome panel, stat cards with sparklines, trend and distribution charts, activity timeline.
- **Assets management:** Filterable table, status pills, and contextual detail drawer.
- **Invoices & delivery challans:** Dual-tab view with cards, status chips, and historical timeline.
- **Payments analytics:** Summary cards, bar/donut charts, and segmented tracker list.
- **Support hub:** Contact options, guided ticket workflow, asset return form, and history timeline.

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
- `npm run dev` – Start Vite dev server.
- `npm run build` – Type-check and build for production.
- `npm run preview` – Preview built assets locally.
