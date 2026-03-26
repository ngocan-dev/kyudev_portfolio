#  Portfolio (Next.js)

A production-oriented personal portfolio and project showcase built with **Next.js App Router**, **TypeScript**, **Prisma**, and **Clerk**.

This project includes:
- Public portfolio pages and project/repository detail views
- GitHub-powered data fetching and caching routes
- Role-aware authentication/authorization flows
- Admin/CMS sections for user role and repository management

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, Radix UI primitives, Framer Motion / Anime.js
- **Auth:** Clerk (`@clerk/nextjs`)
- **Database:** Prisma + PostgreSQL (via `DATABASE_URL`)
- **Data integrations:** GitHub API, SWR
- **Tooling:** ESLint, PostCSS

---

## Project Structure

```txt
.
├── prisma/
│   └── schema.prisma
├── public/
│   └── ...static assets (svgs, images)
├── src/
│   ├── app/                    # App Router routes, layouts, API routes
│   ├── components/             # Shared UI + page components
│   │   ├── dev/                # Development-only diagnostics widgets
│   │   ├── providers/          # React providers (e.g., SWR provider)
│   │   ├── preview/            # README/repository preview components
│   │   └── ui/                 # Design-system style primitives
│   ├── features/
│   │   └── auth/
│   │       ├── authentication/ # Auth state wrappers
│   │       ├── authorization/  # Role checks + admin guards
│   │       ├── components/     # Auth feature components (AuthButton)
│   │       ├── constants/      # Role constants
│   │       ├── middleware/     # Route matcher helpers for auth middleware
│   │       └── types/          # Auth-related types
│   ├── hooks/                  # Reusable React hooks
│   ├── lib/                    # API clients, DB access, utils, mappers
│   │   └── db/
│   ├── types/                  # Global declaration/types
│   └── middleware.ts           # Next.js middleware entrypoint
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

### Notes on organization

- `src/features/auth` now centralizes authentication + authorization concerns.
- Role constants and guards are separated to avoid implicit string usage in route and server action logic.
- Story/demo-only files were removed to keep the repository focused on runtime application code.

---

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env.local` (and/or `.env`) with values matching your environment:

```bash
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Database
DATABASE_URL=postgresql://...

# GitHub integration
GITHUB_TOKEN=...
NEXT_PUBLIC_GITHUB_TOKEN=... # optional fallback for selected routes

# Optional integrations used by specific routes/features
REDIS_URL=...
RESEND_API_KEY=...
CRON_SECRET=...
```

### 3) Prisma setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 4) Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

- `npm run dev` – Start local development server (Turbopack)
- `npm run build` – Build production bundle
- `npm run start` – Start production server
- `npm run lint` – Run Next.js ESLint checks

---

## Development Guide

### App Router conventions

- Keep route entrypoints inside `src/app/**`.
- Keep feature-specific business logic in `src/features/**`.
- Keep shared rendering/UI concerns in `src/components/**`.
- Keep API/client helpers in `src/lib/**`.

### Import strategy

The project uses a TypeScript alias:

- `@/*` → `src/*`

Prefer alias-based imports for predictable, maintainable module resolution.

---

## Authentication & Authorization

This project uses Clerk and enforces role-aware access controls.

- **Authentication:** handled via Clerk provider + route/session auth checks.
- **Authorization:** centralized in `src/features/auth/authorization`.
- **Roles:** managed through `src/features/auth/constants/roles.ts`.
- **Middleware enforcement:** route matching helpers in `src/features/auth/middleware` are consumed by `src/middleware.ts`.

Current role model includes:
- `admin`
- `moderator`

Admin-only sections are grouped under App Router route groups such as `src/app/(admin-only)/...`.

---

## Prisma / Database

- Prisma schema lives in `prisma/schema.prisma`.
- Database client access is centralized under `src/lib/db`.
- Admin CMS actions use Prisma for project/token management workflows.

If schema changes are made:

```bash
npx prisma migrate dev
npx prisma generate
```

---

## SVG, Assets, and Styles

- Static assets are served from `public/`.
- App-wide global styles live at `src/app/globals.css`.
- Reusable UI components are in `src/components/ui`.

Guideline:
- Keep static/file-served assets in `public/`.
- Keep component-driven visual primitives in `src/components/**`.

---

## Deployment

Recommended: **Vercel** for seamless Next.js deployments.

General deployment checklist:

1. Set all required environment variables in the target platform.
2. Ensure DB is reachable from deployment environment.
3. Run Prisma migrations as part of release workflow.
4. Validate Clerk production keys and allowed redirect URLs.

Build command:

```bash
npm run build
```

---

## Future Improvements

- Add automated tests (unit/integration/e2e) for auth guards and API routes.
- Add CI pipeline (lint, typecheck, build, migration validation).
- Improve domain segmentation for non-auth features under `src/features/*`.
- Add stronger typed environment validation (e.g., Zod-based env schema).
- Add architecture decision records (ADR) for major patterns and constraints.

---

## License

This project is private/internal unless explicitly relicensed by the repository owner.
