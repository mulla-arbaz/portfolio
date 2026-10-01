# Arbaz Mulla — Portfolio Website

A responsive, accessible portfolio for **Arbaz Mulla, UI & Frontend Developer**, implemented from the supplied website structure, design system and content documents.

## Stack

- React
- TypeScript
- SCSS
- Vite
- Semantic HTML and inline SVG/CSS project visuals

## Local development

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Contact configuration

The source content did not include a public email address, so none was fabricated. To address project-brief emails, copy `.env.example` to `.env` and add the intended **public** contact email:

```bash
VITE_CONTACT_EMAIL=public-contact@example.com
```

`VITE_` variables are included in client bundles. Never place secrets, tokens or private API keys in them.

## Architecture

```text
src/
├── components/        Reusable navigation, cards, visuals and interactions
├── data/              Typed portfolio content
├── styles/            Design tokens and component styles
├── App.tsx            Semantic page sections
└── main.tsx           Application entry
```

## Included quality measures

- Mobile-first responsive layout
- Keyboard-accessible navigation, native dialog and FAQ disclosure controls
- Visible focus styles and skip navigation
- Reduced-motion support
- SEO metadata and semantic section hierarchy
- Lazy intersection-based section reveals
- No unsafe HTML rendering or client-side secrets
- Netlify (`public/_headers`) and Vercel (`vercel.json`) security-header configurations
- Production build verified with TypeScript and Vite

## Deployment

Deploy the project to any static host after `npm run build`. The generated site is in `dist/`. For hosts other than Netlify or Vercel, configure equivalent CSP, HSTS, `X-Content-Type-Options`, Referrer-Policy and Permissions-Policy headers at the platform level.
