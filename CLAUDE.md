# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
```

No lint or test scripts are configured.

## Architecture

Next.js 15 App Router site (Japanese) serving Claude Code documentation and training materials.

**Data flow**: Training content lives as Markdown in `docs/training/`. The server component `app/training/page.tsx` reads the file at request time via `fs/promises`, extracts a TOC with `lib/markdown.ts`, and passes both to client components for rendering.

**Key files:**
- `lib/markdown.ts` — `slugify` (Unicode-aware, handles Japanese) and `extractToc`. Heading IDs must stay in sync between `MarkdownRenderer` and `TocSidebar` — both call `slugify`.
- `components/MarkdownRenderer.tsx` — Client component wrapping `react-markdown` + `remark-gfm`. All Tailwind prose styles are defined inline here (no `@tailwindcss/typography`).
- `components/TocSidebar.tsx` — Client component with `IntersectionObserver` for active-section highlighting. Sticky, xl-breakpoint only.
- `app/training/page.tsx` — Splits the `## 事前準備` section out of the markdown and wraps it in an amber callout box before rendering.

**Adding a new doc page**: Create a route under `app/`, read the markdown file server-side, use `MarkdownRenderer` + `TocSidebar` following the training page pattern. Add a link on `app/page.tsx`.

**Fonts**: Zen Kaku Gothic New (`--font-sans`, body) and Shippori Mincho (`--font-display`) loaded via `next/font/google` in `app/layout.tsx`.
