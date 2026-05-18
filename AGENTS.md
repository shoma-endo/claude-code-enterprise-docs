# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

For architecture, directory structure, key files, and commands, see [README.md](./README.md).

## Notes for Codex

- No lint or test scripts are configured.
- `app/page.tsx` reads the training markdown and calls `splitTrainingSections` (`lib/markdown.ts`) to split it into `intro` / `prep` / `session1` / `session2` / `session3`. The split depends on the headings `## 事前準備` and `## Session 1 — …` / `## Session 2 — …` / `## Session 3 — …` (with `---` separators) — keep these heading strings stable.
- `components/TrainingPage.tsx` renders the tabbed UI and wraps the `## 事前準備` section in a slate-background / blue-left-border callout inside the overview tab.
- Heading IDs must stay in sync between `MarkdownRenderer` and `TocSidebar` — both call `slugify` from `lib/markdown.ts`.
- GitHub-style alert blockquotes (`> [!NOTE]` / `[!TIP]` / `[!IMPORTANT]` / `[!WARNING]` / `[!CAUTION]`) are processed by `lib/remark-alerts.ts`; the visual styling lives in the `blockquote` override in `components/MarkdownRenderer.tsx`.
- `MermaidDiagram` is hard-coded to the `neutral` (light) theme — do not switch to a dark theme.
