# RedCity Dental Care — Digital Platform

Official web application, patient portal, and operational suite for **RedCity Dental** (Dr. Arvind Sahu), located in Ludhiana, Punjab.

---

## 🏗️ Architecture & Monorepo Structure

Built with a pnpm workspace monorepo:

- **`apps/web`**: Public-facing patient website built with Next.js 14 (App Router), Tailwind CSS, and full SEO metadata / schema.org clinical integration.
- **`apps/portal`**: Patient portal and internal operations console.
- **`apps/api`**: Backend FastAPI service for scheduling and integrations.
- **`packages/ui`**: Shared design system components and Tailwind presets.
- **`supabase/`**: Database migrations and storage bucket configurations.
- **`scripts/`**: Workflow scripts, including `ai-images.mjs` for illustrations and asset optimization.
- **`guides/`**: Interactive guides including the WhatsApp Business setup and prompt guide.

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Development

```bash
# Run web application (localhost:3000)
pnpm dev:web

# Run patient portal (localhost:3001)
pnpm dev:portal

# Run API backend (localhost:8000)
pnpm dev:api
```

### Production Build

```bash
pnpm build
# or specifically for the web application:
pnpm --filter @redcity/web build
```

---

## 🎨 AI Illustrations

Illustrations are managed through `apps/web/src/lib/illustration-prompts.ts` and `AI_IMAGE_PROMPTS.md`:

```bash
# Optimize, crop, and convert images to production specs:
pnpm ai-images:optimize

# Update prompt checklist status:
pnpm ai-images
```

---

## 🌐 Deployments

- **Production URL:** [https://redcity-web-lac.vercel.app](https://redcity-web-lac.vercel.app)
