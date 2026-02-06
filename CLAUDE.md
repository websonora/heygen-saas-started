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

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Reusable UI components (shadcn/ui style)
- `lib/utils.ts` - Utility functions including `cn()` for class merging
- `hooks/` - Custom React hooks (alias configured but directory created as needed)

### Path Aliases
Use `@/` prefix for imports (configured in tsconfig.json):
- `@/components` → components/
- `@/lib` → lib/
- `@/components/ui` → components/ui/
- `@/hooks` → hooks/

### Adding shadcn/ui Components
Use the CLI to add new components (configured via `components.json`):
```bash
npx shadcn@latest add <component-name>
```
Components are installed to `components/ui/` using the new-york style, RSC-compatible, with Lucide icons.

## Component Patterns

### UI Components
Components follow the shadcn/ui pattern:
- Use `"use client"` directive for interactive components
- Use CVA (Class Variance Authority) for style variants
- Support `className` prop and merge with `cn()` utility
- Use `data-slot` attributes for styling hooks
- Support `asChild` prop via Radix UI Slot for polymorphism

### Example Button Usage
```tsx
import { Button } from "@/components/ui/button"
// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg
<Button variant="outline" size="sm">Click</Button>
```

### Adding New UI Components
Follow existing patterns in `components/ui/`. Components use composition (e.g., Dialog has DialogTrigger, DialogContent, DialogHeader subcomponents).

## Styling

Theme colors are defined as CSS variables in `app/globals.css`. Dark mode is supported via `.dark` class. Use semantic color variables (e.g., `bg-primary`, `text-muted-foreground`) rather than raw colors.

## Supabase

The project uses `@supabase/ssr` for server-side Supabase client creation. When adding Supabase integration, create client utilities in `lib/` (e.g., `lib/supabase/client.ts` for browser, `lib/supabase/server.ts` for server components/actions). Environment variables needed: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
