# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16 with App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 4 with CSS variables (OKLch color space)
- **Components:** shadcn/ui pattern (new-york style) with Radix UI primitives
- **Icons:** Lucide React
- **Backend:** Supabase (PostgreSQL + Auth via `@supabase/ssr`)
- **Fonts:** Geist Sans and Geist Mono via `next/font/google` (CSS variables `--font-geist-sans`, `--font-geist-mono`)

## Architecture

### Path Aliases
Use `@/` prefix for imports (configured in tsconfig.json): `@/components`, `@/lib`, `@/hooks`.

### Route Structure
- **Public:** `/` (landing), `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/logout`
- **Protected:** `/dashboard`, `/dashboard/settings`
- **Auth handlers:** `/auth/callback` (code exchange for email verification/OAuth)

### Route Protection (Two Layers)
1. **Proxy** (`proxy.ts` → `lib/supabase/proxy.ts`): Runs `updateSession()` on every request. Calls `getClaims()` to refresh session, then redirects unauthenticated users to `/login` unless on a whitelisted public path. Next.js 16 uses `proxy()` (not `middleware()`).
2. **Dashboard layout** (`app/dashboard/layout.tsx`): Server-side `getUser()` check with redirect — defense in depth.

### Supabase Client Pattern
- **Browser client** (`lib/supabase/client.ts`): `createBrowserClient()` — used in client components (reset-password form, settings form)
- **Server client** (`lib/supabase/server.ts`): `createServerClient()` with async `cookies()` — used in server actions, server components, and layouts
- **Proxy helper** (`lib/supabase/proxy.ts`): `createServerClient()` with request/response cookie bridging — must call `getClaims()` before any other logic

Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Auth Flows
- **Login**: Server action → `signInWithPassword()` → redirect to `/dashboard`
- **Signup**: Server action → `signUp()` with `emailRedirectTo: /auth/callback` → user verifies email → callback exchanges code for session
- **Password reset**: Server action → `resetPasswordForEmail()` with redirect to `/auth/callback?next=/reset-password` → client component calls `updateUser({ password })`
- **Logout**: Server action calls `signOut()` and redirects

Errors are passed via URL query params (`?error=...`) and displayed on form pages.

### Component Organization
- `components/ui/` — shadcn/ui primitives (button, card, input, dialog, etc.)
- `components/landing/` — Public page sections (header, hero, features, pricing, footer)
- `components/dashboard/` — Authenticated UI (header, sidebar-nav, user-avatar, settings-form)

### Server Actions Pattern
Each route with form submissions has a co-located `actions.ts` file using `"use server"` with `FormData` input, `redirect()` for navigation, and URL-encoded error messages.

### Dashboard Layout
Server Component that fetches user profile from `profiles` table (`full_name`, `avatar_url`). Renders a two-column layout: sidebar (hidden on mobile, exposed via Sheet) + main content area. Props flow down to client components (Header, SidebarNav, UserAvatar).

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Components are installed to `components/ui/` using the new-york style. They use CVA for variants, `cn()` for class merging, `data-slot` attributes, and `asChild` via Radix Slot.

## Styling

Theme colors are CSS variables in `app/globals.css`. Dark mode via `.dark` class. Use semantic variables (`bg-primary`, `text-muted-foreground`) not raw colors.
