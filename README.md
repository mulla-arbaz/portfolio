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

## Contact & Webhook configuration

Project brief submissions are sent directly to the configured n8n webhook endpoint:
```text
https://arbazmulla.app.n8n.cloud/webhook/6ddbf314-95bf-4593-bc92-c45fb71bb08a
```

To override this endpoint or add an optional public contact email, copy `.env.example` to `.env`:

```bash
VITE_BRIEF_WEBHOOK_URL=https://your-custom-webhook-endpoint
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
