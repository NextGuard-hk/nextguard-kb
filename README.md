# Nextguard Knowledge Base Portal

A public-facing Knowledge Base (KB) portal for Nextguard Technology — built with **Next.js 14**, **MDX**, **Tailwind CSS**, and deployed on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NextGuard-hk/nextguard-kb)

---

## Features

- **MDX-powered articles** — write documentation in Markdown with React components
- **Full-text search** — built-in server-side search across all KB articles
- **Structured navigation** — sidebar with categories, sections, and articles
- **Breadcrumb navigation** — clear path context for every page
- **Responsive design** — mobile-first layout with Tailwind CSS
- **SEO optimised** — metadata, Open Graph tags, sitemap-ready
- **Zero database** — content stored as MDX files in the repo

---

## Project Structure

```
nextguard-kb/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── search/
│   │   │       └── route.ts       # Full-text search API
│   │   ├── kb/
│   │   │   └── [...slug]/
│   │   │       └── page.tsx       # Dynamic KB article pages
│   │   ├── globals.css
│   │   ├── layout.tsx             # Root layout with header/footer
│   │   └── page.tsx               # Homepage with category grid
│   ├── components/
│   │   ├── SearchBar.tsx          # Debounced search component
│   │   └── Breadcrumb.tsx         # Breadcrumb navigation
│   ├── content/
│   │   └── kb/                    # All MDX content lives here
│   │       ├── getting-started/
│   │       │   ├── what-is-nextguard.mdx
│   │       │   └── quick-start.mdx
│   │       ├── dlp/
│   │       │   └── overview.mdx
│   │       └── ucss/
│   │           └── initial-setup.mdx
│   └── lib/
│       └── navigation.ts          # Navigation tree configuration
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started (Local Development)

### Prerequisites

- Node.js 18.17 or later
- npm / yarn / pnpm

### 1. Clone the repository

```bash
git clone https://github.com/NextGuard-hk/nextguard-kb.git
cd nextguard-kb
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## Deploy to Vercel

### Option A: One-click Deploy

Click the **Deploy with Vercel** button at the top of this README.

### Option B: Manual Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option C: Connect GitHub Repo

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `NextGuard-hk/nextguard-kb`
4. Keep all default settings (Framework: Next.js is auto-detected)
5. Click **Deploy**

Vercel will automatically deploy on every push to `main`.

---

## Adding New KB Articles

### 1. Create an MDX file

Create a new `.mdx` file under `src/content/kb/<category>/`:

```bash
src/content/kb/dlp/email-scanning.mdx
```

### 2. Add frontmatter

```mdx
---
title: Email Scanning Configuration
description: How to configure DLP rules for email traffic monitoring
category: DLP
order: 3
---

# Email Scanning Configuration

Your content here...
```

### 3. Register in navigation

Edit `src/lib/navigation.ts` and add the article to the appropriate section:

```typescript
{
  title: 'Email Scanning',
  slug: 'dlp/email-scanning',
},
```

### 4. Commit and push

```bash
git add .
git commit -m "docs: add email scanning configuration guide"
git push
```

Vercel will auto-deploy the updated site within ~30 seconds.

---

## Content Categories

| Category | Path | Description |
|----------|------|-------------|
| Getting Started | `/kb/getting-started/*` | Onboarding, overview, quick-start |
| DLP | `/kb/dlp/*` | Data Loss Prevention policies and rules |
| UCSS | `/kb/ucss/*` | Unified Control & Security Server setup |
| Troubleshooting | `/kb/troubleshooting/*` | Common issues and resolutions |
| API Reference | `/kb/api/*` | REST API documentation |

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|----------|
| Next.js | 14.x | App framework (App Router) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| next-mdx-remote | 4.x | MDX rendering |
| gray-matter | 4.x | Frontmatter parsing |
| Vercel | — | Hosting & deployment |

---

## License

Copyright © 2024 Nextguard Technology Limited. All rights reserved.

This repository contains proprietary documentation. Content may not be reproduced without permission.
