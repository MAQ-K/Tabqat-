# Size Reduction Report — Tabqat Project
**Date:** 2026-07-12 · **Current total: ~214 MB** = `.git` 122 MB + working files ~92 MB (mostly `assets/` 88 MB)

This is the file version of the Group Task 12 report (2026-07-11), re-measured and expanded. Numbers below were verified against actual disk usage and HTML references — nothing has been deleted yet.

---

## 🟢 Completely useless — safe to delete now (~17.5 MB)

| # | Item | Size | Why it's useless |
|---|---|---|---|
| 1 | `assets/my-images/our-services/Waterheat-insulation/swvr pssvrt.mhtml` | 2.0 MB | a saved browser page sitting in the images folder |
| 2 | `assets/fonts/fa-sharp-*` (6 files) | ~6 MB | Font Awesome "sharp" family — zero references anywhere |
| 3 | `assets/fonts/fa-duotone-900`, `fa-light-300`, `fa-thin-100` (.ttf+.woff2, 6 files) | ~5 MB | declared in `@font-face` but no `fa-duotone/fa-light/fa-thin` class is used in any HTML (only `fab`/`fas` are used) |
| 4 | Remixicon extras: `remixicon.svg`, `remixicon.symbol.svg`, `remixicon.styl` + demo html files | ~4.2 MB | font is loaded via woff2/woff/ttf; the giant SVG versions + demo/reference files are never requested |
| 5 | `assets/scss/` | 0.9 MB | Sass sources — never compiled or referenced; site only loads the compiled `assets/css/main.css` |
| 6 | `assets/maps/` + `assets/css/main.css.map` | 0.9 MB | source maps, dev-only |
| 7 | `assets/images/` — 14 theme demo folders (about, award, brand, contact, cta, faq, gallery, history, logo, portfolio, progress, services, shop, team) | ~1.8 MB | leftovers from the purchased template, zero references in any HTML (site uses `assets/my-images/`) |
| 8 | 5 duplicate HTML pages: `p-attach-1.html`, `p-attach-3.html`, `p-iso-2.html`, `p-iso-4.html`, `product-rain.html` | ~0.25 MB | already marked ❌ Delete in management.md — re-point inbound links first |

---

## 🟡 Worth doing, needs a small change first (~35 MB)

### 9. PNG images that have a `.webp` twin — ~31 MB
Almost every image in `assets/my-images/` exists twice (`1.png` + `1.webp`). Pages still reference the PNGs directly (~590 png refs vs ~140 webp refs), so the PNGs can't be deleted blindly — switch the HTML references to webp (or `<picture>` with webp only), then delete the PNG twins.

### 10. Recompress oversized banners — ~3–4 MB
`assets/my-images/banners/` has several 1–1.5 MB PNGs (`structural-strengthening.png`, `concrete-repair-injection.png`, `waterproofing-insulation.png`…). Converting to webp/optimized format cuts each to ~100–200 KB.

---

## 🔵 The `.git` folder — 122 MB (read before touching)

Measured honestly:
- Current site content (HEAD): **89 MB** — this part is unavoidable while the project is in git.
- Old versions of files kept in history: **~53 MB extra** (multiple committed versions of the heavy images from the "1st try" commits and merges).
- Unreachable garbage: **0 MB** — so a plain `git gc` will NOT reclaim meaningful space, it just repackages.

Options:
- **Do nothing** — 122 MB is normal for this history; costs nothing but disk.
- **Squash history to one commit** (destructive — erases all history/revert points; also must force-push and re-clone everywhere): `.git` drops to roughly the compressed size of the current site (~80 MB), saving **~40 MB**.
- **Best order if you want maximum shrink:** delete the unused files above → switch to webp → THEN squash. `.git` would land around **~45–50 MB**.

⚠️ Recommendation: don't squash until the rebuild is fully finished — history is the project's revert ability (management.md relies on commit hashes for rollback).

---

## 🟠 After the rebuild is finished

| Item | Size | Note |
|---|---|---|
| `updates/` (Word/Excel source materials) | 0.7 MB | keep until all groups are verified done, then archive outside the repo |
| `project-report.html`, `service-pages-plan.html` | ~0.1 MB | internal planning docs, not real site pages |
| Colored favicon variants (`favicon-blue/red/green/yellow/deep-blue/light-blue.png`) | small | only one favicon is used |

---

## Summary

| Action | Saving | Risk |
|---|---|---|
| Delete the 8 "completely useless" items | ~17.5 MB | none (verified unreferenced) |
| Switch PNG refs → webp, delete PNG twins | ~31 MB | needs HTML edits |
| Recompress banners | ~3–4 MB | none |
| Squash git history (only after rebuild done) | ~40 MB+ | destructive — loses revert points |
| **Realistic total** | **214 MB → ~120 MB** without touching git, **→ ~65 MB** with the git squash at the end | |
