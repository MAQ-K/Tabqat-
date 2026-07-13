# Management — Tabqat Website Rebuild

This file (renamed from `the-rebuild.md`) is the working log for the Tabqat website rebuild. Every task gets logged here after it's done, tasks are organized into groups, and there's a timeline + revert reference so any change can be traced and undone.

***each time we make an edit this file gets updated***

---

## 📌 Current Status (updated 2026-07-13)

**Groups 1–16 are all DONE.** Group 14 (services layout: H3 size + side-image rows) finished its full rollout on 2026-07-12. **Group 16 (2 new services: تيرازو + مايكروسمنت) finished 2026-07-13** — 2 new pages built, nav/hub/mind-map updated everywhere. Nothing active right now.

**Still open (standing cleanup items):**
| # | Item | Where tracked |
|---|---|---|
| 1 | Delete the 5 leftover duplicate HTML files (`p-attach-1`, `p-attach-3`, `p-iso-2`, `p-iso-4`, `product-rain`) after re-pointing links | Leftover cleanup table below |
| 2 | Full-site scan for stale internal links (old slugs / typos like `p-attacg-2.html`) | Pages Names change → open points |
| 3 | Size cleanup (~17.5 MB safe deletions + more) — pending user go-ahead | `size-reduction-report.md` |
| 4 | "Images Gallery" from the original nav plan — same as `projects.html` or a new page? | Open questions |
| 5 | `polyurea-spray-waterproofing.html` has no Arabic title in the Excel | Open questions |
| 6 | `embed-components.js` re-bake script has a truncation bug (non-greedy regex stops at first nested `</div>`) — never run it as-is; every page's *baked* header/footer is stale (still shows old 4-item services submenu) even though the *live* JS-injected nav is correct everywhere | Group Task 16 note |

---

## 🧠 READ THIS FIRST — Full Context (written so a fresh session can pick up with zero memory)

**What this project is:** a static HTML website for Tabqat (طبقات) — a Saudi construction-services company (waterproofing, thermal insulation, epoxy flooring, concrete repair, structural support). All pages are flat `.html` files in the repo root. Content is Arabic (RTL). Assets live in `assets/`, shared header/footer components in `components/`.

**The main job (now complete):** rebuild the ~34 service pages. For EVERY service page, two passes:
1. **Content pass** — replace the page text with the new content from its Word file, insert the new images, rearrange sections to fit.
2. **SEO pass** — meta title/description, canonical, Open Graph, headings, image alts, fix internal links.
A page is only Done when both passes are done.

**The 3 unbreakable rules:**
1. **The Word file is law.** Each service page has a `.docx` in `updates/` saying exactly what its content should be. Implement it EXACTLY — no inventing, no rewording, no skipping.
2. **Use ALL the images.** Each service page has an image folder under `assets/my-images/our-services/`. Every image in that folder must be used on the page. Images mostly come as `.png` + `.webp` pairs — use webp, png as fallback.
3. **Log everything here.** After each task: check the ☐ boxes in the group table, add a Timeline row, write a History entry, and record the pre-change git commit hash in Revert Ability. Commit per group so each group is one revert checkpoint.

**Key facts already figured out — don't re-derive them:**
- **Page renaming is ALREADY DONE.** Old short slugs (`s-water-1.html`, `service-epoxy.html`, `product-iso.html`…) were renamed to the descriptive filenames now in the repo. The full old→new mapping is in the "Pages Names change" table below. Old names matter only for (a) matching image folders, which still use old slugs, and (b) fixing stale internal links.
- **Image folder ↔ page mapping** uses OLD slugs: e.g. `assets/my-images/our-services/Waterheat-insulation/s-water/s-water-1/` belongs to `bitumen-waterproofing.html`. Full mapping is in each group's table.
- **Word file locations:** `updates/عزل مائي/` (7 docx), `updates/عزل حراري/` (4), `updates/العزل المائي والحراري/` (1), `updates/ايبوكسي/` (7), `updates/إصلاح الخرسانة/` (3), `updates/خدمات التدعيم/` (6), plus `updates/الصفحات الرئيسية.docx` (main pages meta) and `updates/الصفحات ال4 للخدمات.docx` (meta-only SEO copy for our-services.html + the 4 category hubs). `updates/Alt.docx` = image alt texts. The two `.xlsx` files = the old→new page names (already extracted into this doc).
- **Reading docx/xlsx:** no openpyxl/python-docx installed. They're zip files — read with Python stdlib: `zipfile` + regex over `word/document.xml` (docx) or `xl/sharedStrings.xml` + `xl/worksheets/sheet1.xml` (xlsx). Arabic comes out as HTML entities from xlsx (`&#1575;…`) — decode with `html.unescape`.
- **Group 4 structure (do NOT re-merge):** `waterproofing-thermal-insulation.html` is the HUB (3 category cards; all navbar links land here) and `waterproofing-thermal-insulation-system.html` is the combined-system detail page (the docx content).
- **Breadcrumb H1 house style (set 2026-07-11):** the big `<h1 class="rs-breadcrumb-title">` on every detail page must be the SHORT title matching that service's card on its category hub page — NOT the long docx-style SEO title. Applied to all detail pages.
- **Banners:** every page's breadcrumb background comes from `assets/my-images/banners/` — files renamed to English page slugs. Per group: `structural-strengthening.png` (Group 7), `waterproofing-thermal-insulation.png` (Group 4), `waterproofing-insulation.png` (Group 2 hub + all 14 product pages), `waterproofing-insulation-2.png` (Group 2 details + all 5 Group 3 thermal pages — intentionally shared per user decision), `epoxy-flooring-coating.png` (all 8 Group 5 pages), `concrete-repair-injection.png` (all 4 Group 6 pages), `ab-co-ce-pr.png` (about/contact/projects/certificates + blogs, blog-rainfilters, our-services). The old `pro-serv.png` fallback never existed as a file — all references to it were fixed in Group 13.
- **Git state:** everything through 2026-07-12 is committed (history: `6dd5282` → `c39ae73` → "the 1st try" series → merge commits → `bac8187`). To revert a specific file, find its last-good version with `git log --oneline -- <file>`.
- **5 leftover files still need deleting** (after re-pointing links): `p-attach-1.html`, `p-attach-3.html`, `p-iso-2.html`, `p-iso-4.html`, `product-rain.html` — see the cleanup table.
- **bug-report.md** (repo root) lists 92 pre-existing bugs: broken links (incl. typo `p-attacg-2.html` → should be `bitumen-primer-base.html`), 26 empty meta descriptions, 36 missing canonicals. The SEO passes fixed most of these.
- **Site preview:** static files — just open the `.html` in a browser, no build step. `embed-components.js` injects the shared header/footer from `components/`.
- **`size-reduction-report.md`** (repo root) lists everything deletable to shrink the project (~17.5 MB verified-safe now, more with edits; `.git` analysis included). Nothing deleted yet — pending user go-ahead.

**Workflow per group (agreed with the user):**
1. Read ALL the group's Word files first (extract text before touching HTML).
2. Per page: content pass (text exactly per docx → insert all images from its folder → arrange sections) → SEO pass → verify in browser (rendering, image paths, links).
3. Check the page's ☐ boxes in the group table.
4. Group finished → Timeline row + History entry + git commit + Revert Ability row with the pre-change hash.

**Open questions:**
1. ~~Is `الصفحات ال4 للخدمات.docx` the content for `our-services.html`?~~ **Resolved 2026-07-11**: meta-only SEO copy for 5 pages (our-services.html + the 4 category hubs) — applied to all 5.
2. "Images Gallery" in the original nav plan — same as `projects.html` or a new page?
3. ~~What banner should `our-services.html` use?~~ **Resolved 2026-07-11 (Group 13)**: `ab-co-ce-pr.png`.
4. `polyurea-spray-waterproofing.html` has no Arabic title in the Excel — confirm with user.

---

## 📓 Project Brief & User Notes

**Brief (from the user):**
- we gonna rebuild this web — not completely, but a lot in it
- add SEO in all pages
- add new content to all services pages
- add alts for images in all pages after we add the new images

**Notes (from the user):**
- the my-images folder has been fully updated — all the stuff in it is current
- all services pages names were changed — the old→new mapping is in the "Pages Names change" table below

### Per-Page Workflow (applied to EVERY service page)

Each service page gets these two passes — a page isn't "Done" until both are finished:

**1. Content pass**
- Edit text — replace old text with the new content from the page's docx in `updates/`
- Add images — insert the new images from `my-images` (with alt text from `Alt.docx`)
- Arrange the page — reorder/restructure sections to fit the new content

**2. SEO pass**
- Meta title + meta description (no empty `content=""`)
- Canonical tag (`<link rel="canonical">`)
- Open Graph / social tags
- Headings structure (one H1, logical H2/H3)
- Image alts on all images
- Internal links point to final page names (no old/typo'd slugs)

---

## 🗺️ Reference — Site Structure & Page Names

### Services Mind Map

> ✅ **Direction confirmed 2026-07-09 from the Excel files in `updates/`:** the short slugs (`s-water-1.html`, `service-epoxy.html`…) are the **OLD** names. The descriptive filenames currently in the repo are the **NEW, final** names — the renaming is already done. This tree uses the final filenames; the old names are kept in the "Pages Names change" table below only for fixing leftover internal links.

**Site structure (final filenames):**

```
index.html
├── our-services.html (خدماتنا)
│   ├── 1. waterproofing-insulation.html (العزل المائي) ← was services-water.html
│   │   ├── bitumen-waterproofing.html (العزل بلفات البيتومين)
│   │   ├── cementitious-waterproofing.html (العزل الأسمنتي)
│   │   ├── polyurethane-waterproofing.html (العزل بدهانات البولي يوريثان)
│   │   ├── acrylic-waterproofing-coating.html (العزل المائي بدهانات الأكريليك)
│   │   ├── polyurea-spray-waterproofing.html (رش البولي يوريا)
│   │   ├── pvc-waterproofing.html (العزل بمادة الـPVC)
│   │   └── epdm-waterproofing.html (العزل المائي بمادة الEPDM)
│   ├── 2. thermal-insulation.html (العزل الحراري) ← was services-heat.html
│   │   ├── perlite-thermal-insulation.html (العزل باستخدام البيرلايت)
│   │   ├── polystyrene-board-thermal-insulation.html (العزل بألواح البوليسترين)
│   │   ├── polyurethane-board-thermal-insulation.html (العزل بألواح البولي يوريثان)
│   │   └── rockwool-board-thermal-insulation.html (العزل بألواح الصوف الصخري)
│   ├── 3. waterproofing-thermal-insulation.html (العزل المائي والحراري — HUB, 3 category cards) ← was service-Waterheat-insulation.html
│   │   └── waterproofing-thermal-insulation-system.html (العزل المائي والحراري المدمج — detail) ← was services-waterheat.html
│   │       (hub links to: العزل المائي #1, العزل الحراري #2, المدمج system page)
│   ├── 4. epoxy-flooring-coating.html (دهانات الإيبوكسي) ← was service-epoxy.html
│   │   ├── epoxy-flooring-car-parks-warehouses.html (مواقف السيارات والمستودعات)
│   │   ├── epoxy-flooring-cold-storage-freezer-rooms.html (الأرضيات لثلاجات التجميد)
│   │   ├── epoxy-coating-wastewater-sewage-tanks.html (خزانات مياه الصرف)
│   │   ├── epoxy-lining-potable-water-tanks.html (خزانات مياه الشرب)
│   │   ├── epoxy-flooring-food-processing-facilities.html (الأرضيات لمصانع الأغذية)
│   │   ├── anti-static-epoxy-flooring.html (الأرضيات بخاصية الانتي أستاتيك)
│   │   └── epoxy-mortar-flooring-systems.html (الأرضيات بالمونة الإيبوكسية)
│   ├── 5. concrete-repair-injection.html (إصلاح الخرسانة) ← was service-injection.html
│   │   ├── concrete-repair-structural-materials.html (الإصلاح بالمواد الإنشائية)
│   │   ├── polyurethane-injection-concrete-leak-stopping.html (إيقاف تسرب الخرسانة)
│   │   └── epoxy-injection-concrete-repair.html (حقن الخرسانة بمواد الإيبوكسي)
│   ├── 6. structural-strengthening.html (خدمات التدعيم) ← was service-support.html
│   │   ├── concrete-jacketing.html (التدعيم بالقمصان الخرسانية)
│   │   ├── carbon-fiber-strengthening.html (التدعيم بالكربون فايبر)
│   │   ├── steel-jacketing.html (التدعيم بقطاعات الحديد)
│   │   ├── soil-injection.html (حقن التربة)
│   │   ├── shotcrete.html (الخرسانة المقذوفة)
│   │   └── excavation-shoring.html (سند جوانب الحفر)
│   ├── 7. terrazzo-flooring.html (تيرازو) — NEW 2026-07-13, single one-page service, no sub-pages
│   └── 8. microcement-flooring.html (مايكروسمنت) — NEW 2026-07-13, single one-page service, no sub-pages
├── products.html (منتجاتنا)
│   ├── insulation-rolls.html (لفات العزل) ← was product-iso.html
│   │   ├── polyfilm-insulation-membrane.html (لفات بولي فليم)
│   │   ├── topsel-insulation-membrane.html (لفات توب سيل)
│   │   └── bitumen-primer-base.html (بريمر أساس)
│   ├── cementitious-waterproofing-products.html (المواد الاسمنتية) ← was product-conc.html
│   │   ├── nitoprime-zinc-rich-primer.html (نيتوبرايمر زنك رتش)
│   │   └── renderoc-fc-repair-mortar.html (رندروك اف سي)
│   ├── construction-materials.html (المواد الانشائية) ← was product-const.html
│   │   ├── max-plug-hydraulic-cement.html (ماكس بلج)
│   │   └── max-seal-super-waterproofing.html (ماكس سيل سوبر)
│   ├── adhesive-materials.html (مواد لاصقة) ← was product-attatch.html
│   ├── insulation-drain.html (صفاية عزل) ← was product-leak.html
│   └── rainwater-drain.html (صفاية مطر) ← was p-rain-1.html
├── blogs.html
│   ├── excavation-shoring-support.html (مقالة: سند جوانب الحفر) — article, NOT a dupe of excavation-shoring.html
│   ├── concrete-crack-repair-techniques.html (مقالة: معالجة الخرسانة)
│   ├── roof-waterproofing-thermal-insulation.html (مقالة: عزل الأسطح) ← was blog-isolation
│   └── blog-rainfilters.html
├── projects.html (مشاريعنا / Gallery) ← was gallery.html
├── certificates.html (شهاداتنا)
├── about-us.html (من نحن)
└── contact-us.html (تواصل معنا) ← was contact.html
```

### ⚠️ Leftover cleanup (files still in repo that the Excel marks as Delete)

| File | Why delete | Status |
|---|---|---|
| `p-attach-1.html` | duplicate of polyfilm-insulation-membrane.html | Pending |
| `p-attach-3.html` | duplicate of topsel-insulation-membrane.html | Pending |
| `p-iso-2.html` | duplicate of bitumen-primer-base.html | Pending |
| `p-iso-4.html` | shortcut duplicate of insulation-drain.html | Pending |
| `product-rain.html` | shortcut duplicate of rainwater-drain.html | Pending |

> Before deleting: re-point any internal links that still reference these 5 files (and the old-name links flagged in bug-report.md, e.g. the typo'd `p-attacg-2.html` → should be `bitumen-primer-base.html`) to the final filenames.

### Pages Names change

Source: `updates/Tabqat pages.xlsx` + `updates/Tabqat_20Services_20Pages_20-_20Cloud_20Code.xlsx` (extracted 2026-07-09). **Old → New**, with the Excel's delete marks:

| Old name | New name | AR | Note |
|---|---|---|---|
| about-us.html | about-us.html | من نحن | unchanged |
| certificates-1.html | ❌ Delete | شهاداتنا | duplicate — already gone from repo |
| certificates.html | certificates.html | شهاداتنا | unchanged |
| contact.html | contact-us.html | تواصل معنا | done |
| gallery.html | projects.html | مشاريعنا | done |
| index.html | index.html | الرئيسية | unchanged |
| metallurgy.html | ❌ Delete | | already gone from repo |
| our-services.html | our-services.html | خدماتنا | unchanged |
| p-attach-1.html | ❌ Delete | لفات بولي فليم | duplicate — **still in repo** |
| p-attach-2.html | bitumen-primer-base.html | بريمر أساس | done |
| p-attach-3.html | ❌ Delete | لفات توب سيل | duplicate — **still in repo** |
| p-conc-1.html | nitoprime-zinc-rich-primer.html | نيتوبرايمر زنك رتش | done |
| p-conc-2.html | renderoc-fc-repair-mortar.html | رندروك اف سي | done |
| p-const-1.html | max-plug-hydraulic-cement.html | ماكس بلج | done |
| p-const-2.html | max-seal-super-waterproofing.html | ماكس سيل سوبر | done |
| p-iso-1.html | polyfilm-insulation-membrane.html | لفات بولي فليم | done |
| p-iso-2.html | ❌ Delete | بريمر أساس | duplicate — **still in repo** |
| p-iso-3.html | topsel-insulation-membrane.html | لفات توب سيل | done |
| p-iso-4.html | ❌ Delete | صفاية عزل | shortcut page — **still in repo** |
| p-rain-1.html | rainwater-drain.html | صفاية مطر | done |
| product-attatch.html | adhesive-materials.html | مواد لاصقة | done |
| product-conc.html | cementitious-waterproofing-products.html | المواد الاسمنتية | done |
| product-const.html | construction-materials.html | المواد الانشائية المتخصصة | done |
| product-iso.html | insulation-rolls.html | لفات العزل | done |
| product-leak.html | insulation-drain.html | صفاية عزل | done |
| product-rain.html | ❌ Delete | صفاية مطر | shortcut page — **still in repo** |
| products.html | products.html | منتجاتنا | unchanged |
| s-epoxy-1.html | epoxy-flooring-car-parks-warehouses.html | مواقف السيارات والمستودعات | done |
| s-epoxy-2.html | epoxy-flooring-cold-storage-freezer-rooms.html | الأرضيات لثلاجات التجميد | done |
| s-epoxy-3.html | epoxy-coating-wastewater-sewage-tanks.html | خزانات مياه الصرف | done |
| s-epoxy-4.html | epoxy-lining-potable-water-tanks.html | خزانات مياه الشرب | done |
| s-epoxy-5.html | epoxy-flooring-food-processing-facilities.html | الأرضيات لمصانع الأغذية | done |
| s-epoxy-6.html | anti-static-epoxy-flooring.html | الأرضيات بخاصية الانتي أستاتيك | done |
| s-epoxy-7.html | epoxy-mortar-flooring-systems.html | الأرضيات بالمونة الإيبوكسية | done |
| s-heat-1.html | perlite-thermal-insulation.html | العزل باستخدام البيرلايت | done |
| s-heat-2.html | polystyrene-board-thermal-insulation.html | العزل بألواح البوليسترين | done |
| s-heat-3.html | polyurethane-board-thermal-insulation.html | العزل بألواح البولي يوريثان | done |
| s-heat-4.html | rockwool-board-thermal-insulation.html | العزل بألواح الصوف الصخري | done |
| s-injection-1.html | concrete-repair-structural-materials.html | إصلاح الخرسانة بالمواد الإنشائية | done |
| s-injection-2.html | polyurethane-injection-concrete-leak-stopping.html | إيقاف تسرب الخرسانة | done |
| s-injection-3.html | epoxy-injection-concrete-repair.html | حقن الخرسانة بمواد الايبوكسي | done |
| s-support-1.html | concrete-jacketing.html | التدعيم بالقمصان الخرسانية | done |
| s-support-2.html | carbon-fiber-strengthening.html | التدعيم بالكربون فايبر | done |
| s-support-3.html | steel-jacketing.html | الدعم بقطاعات الحديد | done |
| s-support-4.html | soil-injection.html | حقن التربة | done |
| s-support-5.html | shotcrete.html | الخرسانة المقذوفة | done |
| s-support-6.html | excavation-shoring.html | سند جوانب الحفر | done *(Excel says "excavation shoring" with a space — actual file is `excavation-shoring.html`)* |
| s-water-1.html | bitumen-waterproofing.html | العزل بلفات البيتومين | done |
| s-water-2.html | cementitious-waterproofing.html | العزل الاسمنتي | done |
| s-water-3.html | polyurethane-waterproofing.html | العزل بدهانات البولي يوريثان | done |
| s-water-4.html | acrylic-waterproofing-coating.html | العزل المائي بدهانات الأكريليك | done |
| s-water-5.html | polyurea-spray-waterproofing.html | *(AR title missing in Excel)* | done |
| s-water-6.html | pvc-waterproofing.html | العزل بمادة الـPVC | done |
| s-water-7.html | epdm-waterproofing.html | العزل المائي بمادة الEPDM | done |
| service-epoxy.html | epoxy-flooring-coating.html | دهانات الإيبوكسي | done |
| service-injection.html | concrete-repair-injection.html | إصلاح الخرسانة | done |
| service-support.html | structural-strengthening.html | خدمات التدعيم | done |
| service-Waterheat-insulation.html | waterproofing-thermal-insulation.html | العزل المائي والحراري (hub) | done — hub with 3 category cards |
| services-heat.html | thermal-insulation.html | العزل الحراري | done |
| services-water.html | waterproofing-insulation.html | العزل المائي | done |
| services-waterheat.html | waterproofing-thermal-insulation-system.html | العزل المائي والحراري المدمج (detail) | done — un-merged 2026-07-09, see Group 4 note |
| shop-details.html | ❌ Delete | | already gone from repo |
| shop.html | ❌ Delete | | already gone from repo |
| Support-the-sides-of-the-excavation.html | excavation-shoring-support.html | مقالة: سند جوانب الحفر | done — blog article |
| concrete-treatment.html | concrete-crack-repair-techniques.html | مقالة: معالجة الخرسانة | done — blog article |
| blog-isolation | roof-waterproofing-thermal-insulation.html | مقالة: عزل الأسطح | done — blog article |
| *(new, no old name)* | terrazzo-flooring.html | تيرازو | done 2026-07-13 — new service, not part of the original rebuild scope |
| *(new, no old name)* | microcement-flooring.html | مايكروسمنت | done 2026-07-13 — new service, not part of the original rebuild scope |

**Remaining open points:**
1. Delete the 5 leftover duplicate files (see cleanup table above) after re-pointing links.
2. "Images Gallery" from the nav mind map — is that `projects.html`, or a separate page still to create?
3. Old-name internal links inside pages (e.g. `p-attacg-2.html` typo links from bug-report.md) need a full scan-and-fix pass against this table.

---

## ✅ Group Tasks (all complete)

### Group Task 1 — Main Pages SEO Meta Tags & Structured Data — DONE 2026-07-09

Applies to: `index.html`, `about-us.html`, `certificates.html`, `projects.html` (was gallery.html), `blogs.html`, `contact-us.html` (was contact.html).

- [x] Task 1.1 — Add the provided SEO `<title>` tag to each main page using the supplied metadata document. *(source: `updates/الصفحات الرئيسية.docx`)*
- [x] Task 1.2 — Add the provided `<meta name="description">` tag to each page.
- [x] Task 1.3 — Add `<meta name="robots" content="index, follow">` to every main page.
- [x] Task 1.4 — Add the correct canonical URL (`<link rel="canonical">`) for each page.
- [x] Task 1.5 — Add complete Open Graph metadata for every page (`og:title`, `og:description`, `og:url`, `og:type`, `og:locale`).
- [x] Task 1.6 — Ensure every page has unique SEO metadata (no duplicated titles or descriptions).
- [x] Task 1.7 — Validate title length (≈50–60 chars) and meta description length (≈140–160 chars) without changing the provided copy unless necessary. *(descriptions 142–160 chars; titles 51–58 chars except index.html at 68 chars — kept as supplied verbatim, flagged for optional trim)*
- [x] Task 1.8 — Add the shared LocalBusiness JSON-LD Schema to every page immediately before `</head>`.
- [x] Task 1.9 — Validate the JSON-LD schema for valid JSON syntax and Schema.org compliance.
- [x] Task 1.10 — Verify all canonical/OG/page URLs match the final routing exactly. *(used current filenames `projects.html` / `contact-us.html`, not the doc's old `gallery.html` / `contact.html`)*
- [x] Task 1.11 — Preserve existing CSS, JS, layout, functionality, and performance.
- [x] Task 1.12 — All pages W3C-valid, no duplicate meta tags or structured data. *(verified: no duplicate title/description/robots/canonical/og:title/JSON-LD in any of the 6 files)*

> **Service page groups (2–8):** one group per service category. For every page in a group: **do exactly what its Word file says for the content** (no inventing/changing text), and **use ALL the images in its image folder**. Both passes from the Per-Page Workflow apply (Content ➜ SEO). A page is done only when both boxes are checked.
>
> Image folders live under `assets/my-images/our-services/` and are named with the OLD slugs — the "Pages Names change" table maps them to the final pages. Most images exist as `.png` + `.webp` (use webp, png as fallback).

### Group Task 2 — العزل المائي (Waterproofing) — 8 pages — DONE 2026-07-10
Word files: `updates/عزل مائي/` · Images: `assets/my-images/our-services/Waterheat-insulation/s-water/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| waterproofing-insulation.html (main) | الصفحات الرئيسية.docx | s-water/ (top-level 1–7) | ✅ | ✅ |
| bitumen-waterproofing.html | العزل بلفات البيتومين.docx | s-water/s-water-1/ | ✅ | ✅ |
| cementitious-waterproofing.html | العزل الاسمنتي.docx | s-water/s-water-2/ | ✅ | ✅ |
| polyurethane-waterproofing.html | عزل البولي يوريثان.docx | s-water/s-water-3/ | ✅ | ✅ |
| acrylic-waterproofing-coating.html | عزل الاكليريك.docx | s-water/s-water-4/ | ✅ | ✅ |
| polyurea-spray-waterproofing.html | عزل البولي يوريا.docx | s-water/s-water-5/ | ✅ | ✅ |
| pvc-waterproofing.html | عزل PVC.docx | s-water/s-water-6/ | ✅ | ✅ |
| epdm-waterproofing.html | عزل EPMD.docx | s-water/s-water-7/ | ✅ | ✅ |

**Done 2026-07-10:**
- 7 detail pages rebuilt with exact docx content (intro, تطبيقات, اشتراطات, مراحل التنفيذ with H3 sub-steps, مزايا, لماذا طبقات, FAQ accordion, contact CTA note-box) on the Group-4/7 detail template.
- SEO heads replaced with docx meta title/description + OG/twitter + Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD; all schema URLs corrected from old slugs (`s-water-N.html`, `service-Waterheat-insulation.html`) to final filenames.
- All images used per folder: bitumen 5/5, cementitious 4/4, polyurethane 4/4 (incl. the odd `21.webp`), acrylic 3/3, polyurea 2/2, PVC 3/3, EPDM 3/3 — webp+png `<picture>` fallback where pairs exist. Alts from `Alt.docx` (bitumen images 4–5 and cementitious image 4 had no doc alt — authored in matching style).
- Banner: hub uses `banners/waterproofing-insulation.png`, all 7 detail pages use `banners/waterproofing-insulation-2.png` (renamed from `العزل المائي.png` / `العزل المائي 2.png`).
- Hub page (`waterproofing-insulation.html`) already had its 7-card grid + full SEO from the earlier pass — banner updated, sidebar third link repointed to the new system page.
- Verified: all 8 pages have valid JSON-LD, single H1/title, and every referenced image/banner exists on disk.

### Group Task 3 — العزل الحراري (Thermal Insulation) — 5 pages — DONE 2026-07-11
Word files: `updates/عزل حراري/` · Images: `assets/my-images/our-services/Waterheat-insulation/s-heat/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| thermal-insulation.html (main) | — (hub, already had card grid) | s-heat/ (top-level 1–4) | ✅ | ✅ |
| perlite-thermal-insulation.html | عزل البيرلايت.docx | s-heat/s-heat-1/ | ✅ | ✅ |
| polystyrene-board-thermal-insulation.html | عزل البوليسترين.docx | s-heat/s-heat-2/ | ✅ | ✅ |
| polyurethane-board-thermal-insulation.html | عزل البولي يوريثان.docx | s-heat/s-heat-3/ | ✅ | ✅ |
| rockwool-board-thermal-insulation.html | العزل بألواح الصوف الصخري.docx | s-heat/s-heat-4/ | ✅ | ✅ |

**Done 2026-07-11:**
- Hub (`thermal-insulation.html`) already had its 4-card grid + decent SEO from an earlier pass — left as-is. Breadcrumb link (خدماتنا) confirmed correct.
- 4 detail pages fully rebuilt from a thin single-image/single-paragraph stub into the full template: exact docx content (intro, تطبيقات/خصائص sections, مراحل التنفيذ with H3 sub-steps, مزايا, لماذا طبقات info-box, FAQ accordion, contact CTA note-box), full SEO head (docx title/description/OG/twitter), and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD with 4-level breadcrumb (خدماتنا → عزل مائي وحراري → العزل الحراري → page), URLs corrected from `s-heat-N.html` to final filenames.
- Breadcrumb H1 on all 4 pages uses the SHORT title matching the hub card (per house style), not the long docx H1 — e.g. "العزل بالبيرلايت" not "العزل الحراري بالبيرلايت — لكبح الحرارة وتُوفّر الطاقة".
- Images are messy in this folder (unlike other groups) — several have only one format with no fallback pair: s-heat-1 has just 1 image (1.png only); s-heat-2 has 1.png+1.webp paired but 2.webp/3.webp with no png; s-heat-3 has 1.png alone plus oddly-numbered 26.webp/27.webp with no png; s-heat-4 has 1.webp/2.webp alone plus 4.png alone (no image 3 at all). Used `<picture>` only where a real webp+png pair exists; plain `<img>` pointing straight at the sole available format everywhere else. All folder images used and verified 1:1 against disk (1+3+3+3 = 10 images total).
- Alt text: only polystyrene (3/3) had full alt coverage in `Alt.docx`; perlite had none at all, and polyurethane/rockwool were missing one alt each — authored matching-style alts for the gaps.
- Banner: no dedicated thermal banner exists. User decided (2026-07-11) to reuse `banners/waterproofing-insulation-2.png` (the Group 2 detail-page banner) rather than wait for a new image — applied to all 5 Group 3 pages (hub + 4 details), file not renamed since it's intentionally shared.
- Verified: PowerShell check confirmed valid JSON-LD, single H1/title, and every image path (including the odd webp-only/png-only ones) exists on disk across all 4 detail pages.

### Group Task 4 — العزل المائي والحراري (Waterproofing + Thermal) — 2 pages — DONE 2026-07-09
Word files: `updates/العزل المائي والحراري/` · Images: `assets/my-images/our-services/Waterheat-insulation/s-heatwater/` (detail) + `Waterheat-insulation/11.png, 22.png, 33.jpg` (hub cards)

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| waterproofing-thermal-insulation.html (HUB) | — (hub, 3 category cards) | 11.png / 22.png / 33.jpg | ✅ | ✅ |
| waterproofing-thermal-insulation-system.html (detail) | العزل المائي والحراري.docx | s-heatwater/ | ✅ | ✅ |

> ⚠️ **Restructure 2026-07-09:** the "merged" assumption was wrong — the user confirmed the section needs a HUB (3 categories: العزل المائي / العزل الحراري / المدمج) + the combined-system detail page. The pilot detail content was moved to `waterproofing-thermal-insulation-system.html` (canonical/OG/schema URLs updated, breadcrumb gained the hub level), and `waterproofing-thermal-insulation.html` was rebuilt as the hub card-grid (all navbar/footer links land there unchanged). Sidebar third links in `waterproofing-insulation.html` / `thermal-insulation.html` repointed to the system page.

**Done 2026-07-09 (used as the sample/pilot page for the per-page workflow):**
- Content: full docx content (intro, definition, 6 benefits, 4 requirement sub-sections, comparison table, applications, why-us, 5 FAQs, contact CTA), built on the site's existing detail-page template (2-col layout + shared `main.css` classes: `.section-heading`, `.section-img`, `.features-grid`/`.feature-card`, `.check-list`, `.info-box`, `.note-box`, `.cta-whatsapp`, `.sidebar-card`/`.sidebar-nav-list`). Comparison table uses Bootstrap `.table`, FAQ uses Bootstrap accordion — both already loaded, no new CSS/JS added.
- All 4 images from `s-heatwater/` used (webp+png `<picture>` fallback where both exist). 3 alts from `Alt.docx`; 1 (image 4) has no doc alt — authored in matching style, flagged.
- SEO: title/description/robots/canonical/OG/twitter + Service+FAQPage+BreadcrumbList JSON-LD from the docx, with URLs corrected to the final filename instead of the doc's old slugs (`services-waterheat.html` / `service-Waterheat-insulation.html`).
- Bug fix: `waterproofing-insulation.html` and `thermal-insulation.html` sidebars linked to a nonexistent `water-thermal-insulation-system.html` — repointed both to `waterproofing-thermal-insulation.html`.
- Verified in browser: layout, images, comparison table, FAQ accordion, links all render correctly.

### Group Task 5 — دهانات الإيبوكسي (Epoxy Coatings) — 8 pages — DONE 2026-07-11
Word files: `updates/ايبوكسي/` · Images: `assets/my-images/our-services/epoxy/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| epoxy-flooring-coating.html (main) | — (hub, 7 cards) | epoxy/ (top-level 1–7) | ✅ | ✅ |
| epoxy-flooring-car-parks-warehouses.html | مواقف السيارات.docx | epoxy/s-epoxy-1/ | ✅ | ✅ |
| epoxy-flooring-cold-storage-freezer-rooms.html | أرضيات ثلاجات التجميد.docx | epoxy/s-epoxy-2/ | ✅ | ✅ |
| epoxy-coating-wastewater-sewage-tanks.html | خزانات مياه الصرف.docx | epoxy/s-epoxy-3/ | ✅ | ✅ |
| epoxy-lining-potable-water-tanks.html | خزانات مياه الشرب.docx | epoxy/s-epoxy-4/ | ✅ | ✅ |
| epoxy-flooring-food-processing-facilities.html | مصانع الاغذية.docx | epoxy/s-epoxy-5/ | ✅ | ✅ |
| anti-static-epoxy-flooring.html | انتي ستاتيك.docx | epoxy/s-epoxy-6/ | ✅ | ✅ |
| epoxy-mortar-flooring-systems.html | المونة الايبوكسية.docx | epoxy/s-epoxy-7/ | ✅ | ✅ |

**Done 2026-07-11:**
- Hub (`epoxy-flooring-coating.html`) rebuilt from the old rs-team-item stub into the `.srv-card-link` grid template (matching `waterproofing-thermal-insulation.html`'s style/layout as requested): 7 cards, filled the previously-empty meta description, fixed breadcrumb (was `assets/my-images/pro-serv.png` placeholder + خدماتنا linking to index.html).
- 7 detail pages fully rebuilt with exact docx content from `updates/ايبوكسي/`: intro, H2 sections (لماذا/تطبيقات/اشتراطات as applicable per docx), مراحل التنفيذ with H3 sub-steps (4 steps for car-parks/potable-water/mortar, 5 for food-processing, 7 for anti-static/ESD — copper-grid + conductive-epoxy + resistance-test steps), مميزات, FAQ accordion (from each docx's FAQPage schema; potable-water page got a 6th FAQ from body text not present in the schema, added to both), contact CTA note-box.
- SEO heads replaced with docx meta title/description + OG/twitter + Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD; schema URLs corrected from old slugs (`s-epoxy-N.html`, `service-epoxy.html`) to final filenames.
- All images used per folder: car-parks 3/3, cold-storage 3/3, wastewater 4/4, potable-water 4/4, food-processing 5/5 (image 5 has no webp — plain `<img>`), anti-static 4/4 (image 4 has no webp — plain `<img>`, fixed after initial verification caught a missing-webp reference), mortar 3/3 — `<picture>` webp+png fallback elsewhere. Alts from `Alt.docx`; a handful of images beyond the doc's 3-per-page had no alt — authored in matching style.
- Banner: renamed `banners/eboxy.png` → `banners/epoxy-flooring-coating.png`, applied to all 8 Group 5 pages (was generic `pro-serv.png` on the detail pages).
- Verified: all 8 pages have valid JSON-LD, single H1/title, every folder image used exactly once, and all image/banner paths (including webp) exist on disk.

### Group Task 6 — إصلاح الخرسانة (Concrete Injection & Repair) — 4 pages — DONE 2026-07-11
Word files: `updates/إصلاح الخرسانة/` · Images: `assets/my-images/our-services/service-injection/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| concrete-repair-injection.html (main) | — (hub, already had 3-card grid) | service-injection/ (top-level 1–3) | ✅ | ✅ |
| concrete-repair-structural-materials.html | إصلاح بالمواد الإنشائية.docx | service-injection/s-injection-1/ | ✅ | ✅ |
| polyurethane-injection-concrete-leak-stopping.html | حقن البولي يوريثان.docx | service-injection/s-injection-2/ | ✅ | ✅ |
| epoxy-injection-concrete-repair.html | حقن ايبوكسي.docx | service-injection/s-injection-3/ | ✅ | ✅ |

**Done 2026-07-11:**
- Hub (`concrete-repair-injection.html`) already had its 3-card grid — fixed the empty meta description/title (was `<title>طبقات || حقن و إصلاح الخرسانة</title>` with `content=""`) and swapped the `pro-serv.png` placeholder for the group's own banner.
- 3 detail pages fully rebuilt from the thin single-image/single-paragraph stub into the full template: exact docx content, FAQ accordion, full SEO head, and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD with a 3-level breadcrumb (خدماتنا → حقن وإصلاح الخرسانة → page).
  - `concrete-repair-structural-materials.html`: 6-step methodology (فحص وتشخيص → إزالة → معالجة تسليح → مادة ربط → ملء وتسوية → حماية نهائية).
  - `polyurethane-injection-concrete-leak-stopping.html`: includes the docx's polyurethane-vs-epoxy comparison table; 4-step process (تحديد المسار → حفر النيبلات → الحقن → التحقق).
  - `epoxy-injection-concrete-repair.html`: includes the docx's epoxy-vs-polyurethane comparison table; 5-step process (فحص هندسي → تنظيف → تثبيت نيبلات → حقن تحت ضغط → معالجة وتشطيب). Breadcrumb H1 uses the hub's card title "حقن الخرسانة بمواد الإيبوكسي" rather than the docx's own H1, per house style.
- Banner: `banners/حقن وإصلاح الخرسانة.png` renamed → `banners/concrete-repair-injection.png` (git mv), applied to all 4 pages.
- All images used per folder: structural-materials 3/3, polyurethane-injection 3/3, epoxy-injection 3/3 — `<picture>` webp+jpg/png fallback for image 1 in each folder (jpg not png for injection-2/3), plain `<img>` for images 2–3 (webp only, no fallback pair). Alts from `Alt.docx`.
- Verified: all 4 pages valid JSON-LD, single H1/title, every image + banner path exists on disk, every folder image used exactly once.

**Follow-up 2026-07-11 — hub restyle to match epoxy-flooring-coating.html:** the hub's card grid was still the old `.rs-team-item` list markup (never touched when the meta/banner fix landed above). Rebuilt it to reuse the same `.srv-block` / `.srv-card-link` / `.srv-sidebar` component as `epoxy-flooring-coating.html`: 3 cards in a `col-lg-4` row using the existing `service-injection/1–3.png` images with descriptive alts, plus the standard sidebar (WhatsApp CTA, category nav list with self marked `active`, company-profile download, phone/email contact card). Pure visual restructuring — no data, links, or SEO changed; reused existing CSS classes only, no new CSS/JS.

### Group Task 7 — خدمات التدعيم (Structural Support) — 7 pages — DONE 2026-07-09
Word files: `updates/خدمات التدعيم/` · Images: `assets/my-images/our-services/service-support/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| structural-strengthening.html (main) | — (hub, 6 cards) | service-support/ (top-level 1–6) | ✅ | ✅ |
| concrete-jacketing.html | التدعيم بالقمصان الخرسانية.docx | service-support/s-support-1/ | ✅ | ✅ |
| carbon-fiber-strengthening.html | التدعيم بالكريون فايبر.docx | service-support/s-support-2/ | ✅ | ✅ |
| steel-jacketing.html | التدعيم بقطاعات الحديد.docx | service-support/s-support-3/ | ✅ | ✅ |
| soil-injection.html | حقن التربة.docx | service-support/s-support-4/ | ✅ | ✅ |
| shotcrete.html | الخرسانة المقذوفة.docx | service-support/s-support-5/ | ✅ | ✅ |
| excavation-shoring.html | سند جوانب الحفر.docx | service-support/s-support-6/ | ✅ | ✅ |

**Done 2026-07-09:**
- Hub rebuilt from old rs-team stub to card-grid template (6 cards, alts from `Alt.docx`), empty meta description filled, breadcrumb link fixed (خدماتنا pointed to index.html).
- 6 detail pages rebuilt with exact docx content + FAQ accordions + docx meta/schemas (URLs corrected to final filenames). concrete-jacketing includes the comparison table (قميص خرساني / كربون فايبر / قطاعات حديد).
- **Fixed 3 broken image paths** — concrete-jacketing, carbon-fiber, steel-jacketing, soil-injection pointed at nonexistent Arabic-named folders (`service-support/التدعيم_بالقمصان_الخرسانية/…`); all now use the real `s-support-N/` folders, all 17 folder images used.
- Banner: all 7 pages use `banners/structural-strengthening.png` (renamed from `خدمات التدعيم.png`).
- Verified in browser + JSON-LD/image checks.

### Group Task 8 — Services hub page — 1 page — DONE 2026-07-11
Word files: `updates/الصفحات ال4 للخدمات.docx` · Images: `assets/my-images/our-services/all-services/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| our-services.html | الصفحات ال4 للخدمات.docx | all-services/ | ✅ | ✅ |

**Done 2026-07-11 — open question #1 resolved:** `الصفحات ال4 للخدمات.docx` is confirmed to be an SEO-meta-only doc (no body content) covering **5 pages**: `our-services.html` itself plus the 4 category hub pages. Applied to all 5:
- `our-services.html`: had a completely empty SEO head (generic `<title>طبقات || خدماتنا</title>`, empty description, no canonical/OG/JSON-LD at all) — added full title/description/robots/canonical/OG/twitter + LocalBusiness+BreadcrumbList JSON-LD from the docx exactly. og:image points at an existing real image (`all-services/11.png`) since the docx's suggested `og-services.jpg` path doesn't exist in the repo.
- Removed a ~157-line dead commented-out block (an old duplicate portfolio-style card layout that was never active) sitting between the breadcrumb and the real content section — pure dead-code cleanup, no visual change.
- Authored alt text for 3 of the 4 service card images that had generic `alt="image"`; added `<picture>` webp+png fallback to all 4 cards (folder has webp pairs for 11/22/33/44 that weren't being used before).
- Also updated the **4 category hub pages'** title/meta description/OG/twitter to match this docx's exact copy (previously they used self-authored copy from their own group builds): `waterproofing-thermal-insulation.html`, `epoxy-flooring-coating.html`, `concrete-repair-injection.html`, `structural-strengthening.html`. Canonical URLs kept as the final filenames (not the docx's old slugs), consistent with every other group.
- Banner was still the broken `pro-serv.png` at this point — later resolved in Group 13 (`ab-co-ce-pr.png`).
- The card-grid redesign requested separately in Group Task 9 was NOT done here — this pass only covered content/SEO correctness and dead-code removal.

### Group Task 9 — our-services.html redesign — DONE 2026-07-11
User request: "this page have a terrible look — redesign it, simple and modern design, same links same data."

- Replaced the old bare `.rs-team-item` list (no intro copy, plain thumbnail+title, no visual polish) with the site's established `.srv-card-link`/`.srv-card-body` component (rounded card, hover lift + shadow, arrow icon) already used on every category hub page — so the main services page now looks consistent with the rest of the site.
- Added a centered intro block ("مجالات خدماتنا" heading + a short paragraph on the 4 areas and 20-year experience) and a single centered WhatsApp CTA below the grid — all reused classes (`.section-heading`, `.sidebar-cta`), no new CSS/JS.
- Same 4 links, same `all-services/11–44.png+webp` images/alts, same breadcrumb — visual-only pass, no data change.
- Verified: single H1/H2, all 12 image references resolve on disk.

### Group Task 10 — Certificates Categories — DONE 2026-07-11
User request: divide all certificates into categories and add them to the certificates page.

- `certificates.html` had 18 certificate scans in `assets/my-images/certificate/` (certi1–certi18) but only showed 16 (certi2 and certi18 were never referenced) — all in one flat grid with generic `alt="image"` and no captions.
- Opened and read all 18 images to determine what each actually is. Grouped into 3 categories:
  1. **الاعتمادات والتسجيلات الرسمية** (4): منشآت SME classification, غرفة الرياض membership, الهيئة السعودية للمقاولين membership, وزارة التجارة QR/commercial registry.
  2. **اعتمادات الموردين والمصنّعين المعتمدين** (7): approved-applicator certificates from Henkel Polybit, INSUWRAP, Drizoro (Fian Inc), DCP, FOSROC, Al Taawon Confoam, Bitumat.
  3. **شهادات ومستندات المشاريع المنفَّذة** (7): excavation-support approval, Al Othaim Mall material approval, Zamil shotcrete quotation, Huawei NEOM PVC waterproofing PO, Sahara Centre shotcrete contract, Saedan PVC membrane PO, 60,000 m² epoxy flooring completion certificate.
- Each category gets its own `.srv-block-title` heading; each certificate is a `.srv-card-link` card linking to the full-size image in a new tab, with a real caption and descriptive alt text authored from what's actually on each document (verified by viewing each image, nothing invented).
- Fixed the 2 orphaned images — all 18 now used exactly once. No new CSS/JS.
- Verified: single H1, 3 category headings, all 18 files resolve on disk, none unreferenced.

### Group Task 11 — Small Laptop Screens Responsive — DONE 2026-07-11
User request: edit font sizes to fit small laptop screens without affecting any other screens. Scope confirmed with user: **navbar menu text** + **breadcrumb H1 titles**.

- Root cause: `meanScreenWidth: "1199"` in `assets/js/main.js` means the mobile hamburger only replaces the desktop nav below 1200px. Screens 1200–1366px (1280×720, 1366×768, 1360×768 — the common small/budget laptop range) rendered the full desktop nav (18px links + 40px padding, ~10 items + logo + socials + CTA in one row) and the full 55px `.rs-breadcrumb-title`, with zero size reduction in that range.
- Added exactly one scoped breakpoint in `assets/css/main.css` — `@media (min-width: 1200px) and (max-width: 1366px)` — touching only 2 rules: `.main-menu li a` (18px→15px font, `40px 20px`→`40px 12px` padding, vertical padding unchanged so header height doesn't shift) and `.rs-breadcrumb-one .rs-breadcrumb-title` (55px→42px).
- Did **not** touch the SCSS source (`assets/scss/`) — confirmed unused/unreferenced (see Group 12); `main.css` is the single real source of truth.
- Scope check: ≥1367px keeps original sizing; <1200px unaffected (hamburger already active; existing 991/575/480px breakpoints untouched).

### Group Task 12 — Project folder size reduce — DONE 2026-07-11 (report), file added 2026-07-12
User request: "tell me what is taking space and useless, in a simple report — I mean the completely useless."

**Report only — nothing deleted yet.** Summary of the verified findings (~15.5 MB of genuinely unused files in the working tree):
- `assets/scss/` (921KB) — Sass source never compiled/referenced by any HTML; site only loads compiled `assets/css/main.css`.
- `assets/maps/main.css.map` (848KB) — source map, dev-only.
- `assets/fonts/` — ~11MB across 12 Font Awesome files (`fa-sharp-*` ×6, fully unreferenced anywhere; `fa-duotone-900`/`fa-light-300`/`fa-thin-100` ×6, declared in `@font-face` but never used by any class in the HTML — only `fab`/`fas` are used) + ~1MB of Remixicon demo/reference files (`symbol.html`, `unicode.html`, `remixicon.styl`).
- `assets/images/` — ~1.8MB across 14 theme-template demo folders (about/award/brand/contact/cta/faq/gallery/history/logo/portfolio/progress/services/shop/team), zero references in any HTML (`bg/`, `icon/`, `user/`, `blog/` ARE referenced and were left alone).
- Plus the already-known 5 leftover duplicate HTML files.
- **Update 2026-07-12:** the report now exists as a file — **`size-reduction-report.md`** in the repo root — re-measured and expanded with: the .mhtml junk file (2 MB), remixicon SVG extras (~4.2 MB), PNG-with-webp-twin analysis (~31 MB, needs HTML ref switch first), banner recompression (~3-4 MB), and an honest `.git` breakdown (122 MB = 89 MB current content + ~53 MB old versions; **zero** unreachable garbage, so `git gc` won't help — only a destructive history squash would, and NOT before the rebuild is done since history is our revert ability). Realistic outcome: 214 → ~120 MB without touching git, ~65 MB with the end-of-project squash.
- Awaiting the user's go-ahead before deleting anything.

### Group Task 13 — Banners on every remaining page — DONE 2026-07-11
User request: `ab-co-ce-pr` for about/contact/projects/certificates; the rest reuse an existing service banner.

- Audited every page's `rs-breadcrumb-bg` across the whole site (`Test-Path` on every resolved banner path) — found the generic fallback `assets/my-images/pro-serv.png` referenced everywhere **never existed as a file at all**, so every page pointing at it had a genuinely broken banner.
- **Real bug found and fixed first:** 7 pages (`about-us.html`, `blogs.html`, `contact-us.html`, `projects.html`, `concrete-crack-repair-techniques.html`, `excavation-shoring-support.html`, `roof-waterproofing-thermal-insulation.html`) were already pointing at `assets/my-images/ab-co-ce-pr.png` — but the file actually lives at `assets/my-images/banners/ab-co-ce-pr.png`. Missing `/banners/` meant the banner never rendered. Fixed the path on all 7.
- **Assigned `ab-co-ce-pr.png`** to the 3 remaining general-purpose pages with no proper banner: `certificates.html`, `blog-rainfilters.html` (were on a stray `our-services/3.png`), and `our-services.html` (was on the broken `pro-serv.png`).
- **Products:** no precedent or dedicated image — user chose to reuse an existing service banner. Picked `banners/waterproofing-insulation.png` (most of the catalog is waterproofing/insulation-adjacent). Applied to all 14 real product pages: `products.html` (hub) + the 13 product detail pages.
- **Not touched:** the 5 duplicates-to-delete (still on the broken placeholder — they're getting deleted anyway); `index.html` (no breadcrumb section — homepage hero layout); `project-report.html`/`service-pages-plan.html` (internal planning docs, not real pages).
- Verified with a full-site scan: every real page's banner path now resolves to a file that exists on disk.

### Group Task 14 — Services pages layout edit (all service pages) — DONE 2026-07-12
Source: `newtasks.md` (2026-07-12). Two edits across ALL service detail pages (28 pages using `.rs-services-details-wrapper`):

**14.2 — Reduce H3 font size on services pages — ✅ DONE**
- Root cause: base `h3` uses `--rs-fs-h3: 38px` (site-wide variable) — bigger than the 20px `.section-heading` H2 sitting right above each H3 sub-step, so the hierarchy read backwards.
- Fix: one scoped rule in `assets/css/main.css`, `.rs-services-details-wrapper h3:not(.accordion-header)` → 17px/700/`#0d1b2a`, excluding the FAQ accordion buttons (they're also `<h3>` but sized by their own button styles). Single source of truth, same approach as the Group 11 small-laptop fix — no per-page inline styles.
- Confirmed the wrapper class covers all 28 detail pages across Groups 2, 3, 4 (system page), 5, 6, 7.

**14.1 — Mixed image layouts — ✅ DONE, full rollout complete**
- Pilot built on **`epoxy-flooring-car-parks-warehouses.html`**, approved by the user with one tweak ("add a small margin top & bottom"). Added `.side-img { margin: 20px 0; }` to `main.css` and the `side-img` class to every converted image.
- Rolled out to all remaining detail pages by writing two small Python converters (structural pattern matching, not per-page manual edits) since the pages turned out to use **two different underlying templates**:
  - **Pattern A** (Groups 5, 7, most of 3 and 6): image block, then 1+ `<h3>+<p>` step pairs, repeating — same shape as the pilot. Grouped each image with its following step(s) into a row, alternating text-left/image-right and image-left/text-right per row.
  - **Pattern B** (all 7 Group 2 waterproofing pages): each step is `<h3>` → its own `<picture>` → `<p>`, i.e. one image per step instead of one image per 1–2 steps. Wrote a second converter for this triplet shape.
  - Both converters: preserved the exact `<picture>` webp+png fallbacks, alt text, and `loading="lazy"`/`wow` animation attributes — only the wrapper markup and image class changed (`section-img` → `img-fluid rounded shadow-lg side-img`).
- **3 pages correctly left untouched** — verified by inspection, not just script silence: `perlite-thermal-insulation.html` (its 4 steps have zero adjacent images — the page's one image is a standalone lead image elsewhere), `waterproofing-thermal-insulation-system.html` (its "الاشتراطات" requirements sub-sections are text-only, no per-item images), `concrete-repair-structural-materials.html` (its steps are a plain `<ol>` numbered list, not H3 blocks, with a single trailing image — nothing to pair).
- **Bug found and fixed mid-conversion:** the first version of the Pattern-B converter matched `<picture>` only when it had no attributes; several pages use `<picture style="display:block;">` and were silently skipped (`bitumen-waterproofing.html` found 0 rows on the first pass). Fixed the regex to allow any attributes, re-ran, verified against a `grep -l '<picture style='` sweep that all 7 affected pages converted correctly the second time.
- Verified end-to-end on all 24 rolled-out pages: HTML tag-balance parser (all pass — 2 pages showed a pre-existing unrelated tag mismatch, confirmed via `git show HEAD` unrelated to this edit), `<img>` count identical before/after on every file (no images lost or duplicated), and `side-img` class present on every converted image.

| Group | Pages | Status |
|---|---|---|
| Pilot — epoxy-flooring-car-parks-warehouses.html | 1 | ✅ Done |
| Group 2 waterproofing details (7) | bitumen(4 rows), cementitious(3), polyurethane(3), acrylic(2), polyurea(1), pvc(2), epdm(2) | ✅ Done |
| Group 3 thermal details (4) | polystyrene(2), polyurethane-board(2), rockwool(1); perlite has no step images — correctly untouched | ✅ Done |
| Group 4 system page (1) | requirements section is text-only — correctly untouched | ✅ N/A, verified |
| Group 5 epoxy details (remaining 6) | cold-storage(2), wastewater(2), potable-water(3), food-processing(3), anti-static(2), mortar(2) | ✅ Done |
| Group 6 injection details (3) | pu-injection(2), epoxy-injection(2); structural-materials uses an `<ol>` list, no step images — correctly untouched | ✅ Done |
| Group 7 support details (6) | concrete-jacketing(2), carbon-fiber(2), steel-jacketing(2), soil-injection(1), shotcrete(2), excavation-shoring(2) | ✅ Done |

### Group Task 15 — Images ALT site-wide (Alt.docx) — DONE 2026-07-12
Source: `newtasks.md` (2026-07-12). Use `updates/Alt.docx` to add alt text to all images it covers.

- Extracted the full text of `Alt.docx` (278 paragraphs) — confirmed it's entirely alts for the Groups 2–8 service-page images already applied during the original rebuild (Waterheat-insulation, epoxy, service-injection, service-support folders + the 4 category hub cards). Nothing new to apply there.
- Scanned every HTML file for `<img>` tags with a missing or generic alt (`alt=""`/`alt="image"`/`alt="img"` etc, excluding logos): found **123 problem images across 48 pages**.
- Applied real, descriptive Arabic alt text to **74 images across 16 pages**: `index.html` (24), `about-us.html` (15), `blogs.html`/`concrete-crack-repair-techniques.html`/`excavation-shoring-support.html`/`roof-waterproofing-thermal-insulation.html` (blog sidebar thumbnails, 3 each), the 7 product pages with swapped/generic product-card images (`bitumen-primer-base.html`, `polyfilm-insulation-membrane.html`, `topsel-insulation-membrane.html`, `insulation-drain.html`, `insulation-rolls.html`, `adhesive-materials.html`, `rainwater-drain.html`, `max-plug-hydraulic-cement.html`, `max-seal-super-waterproofing.html`, `nitoprime-zinc-rich-primer.html`). `index.html`'s 6 project-gallery thumbnails got per-project alts derived from each card's own caption link text.
- **Real bug found and fixed along the way:** on `cementitious-waterproofing-products.html` and `construction-materials.html`, the "related product" cards for 4 products (نيتوبرايمر زنك رتش / رندروك اف سي / ماكس بلج / ماكس سيل سوبر) had their **images AND titles criss-crossed** — e.g. a card linking to `nitoprime-zinc-rich-primer.html` showed the ماكس بلج photo and title instead of نيتوبرايمر's. Same swap repeated in the "related products" widget on all 4 of those products' own detail pages. Fixed the image `src` + title text on all 6 affected files to match their actual link targets — verified by opening both source images and reading the product labels on the cans/bags.
- Remaining 49 of the original 123 "flagged" images are correctly left as `alt=""` — decorative icons (download icon next to visible "تحميل البروفايل" text, feature icons next to feature titles, generic reviewer-avatar placeholders in a review widget) where empty alt is the accessible best practice, not a gap. `thermal-insulation.html`/`waterproofing-insulation.html` initially flagged as "no alt" were a false positive from a double-quote-only regex — both already have full single-quoted alts from the Group 2/3 builds.
- Verified: HTML tag-balance check on all 19 edited files — only 2 pre-existing (not caused by this edit) minor issues found, both confirmed present in `git show HEAD` before any change today.

### Group Task 16 — Add 2 new services: تيرازو (Terrazzo) + مايكروسمنت (Microcement) — DONE 2026-07-13
Source: user request (2026-07-13). Content in `updates/terrazzo/` (1 docx + 10 images) and `updates/microcement/` (1 docx + 8 images).

**What these are:** two brand-new top-level service categories (siblings of عزل مائي وحراري / دهانات إيبوكسية / حقن وإصلاح الخرسانة / خدمات التدعيم) — NOT sub-services under an existing category. Each is a single one-page service (no hub + sub-pages), confirmed by the microcement docx's own breadcrumb: "الرئيسية ← خدماتنا ← مايكروسمنت".

**Both docx files extracted in full** (zipfile+regex, same method as always): each has Meta Title, Meta Description, Service+FAQPage JSON-LD schema, H1, and full body copy (intro, "why choose us" H3 benefit cards, types/applications, a comparison table, a numbered execution-steps section, "why طبقات", FAQ, closing CTA) — same shape as `waterproofing-thermal-insulation-system.html`, which is being used as the structural template.

**Images verified individually** (not batch-guessed) by opening every one of the 18 photos before writing alt text:
- Terrazzo's 10 images are stock/reference photography (villa entrances, a "GRAND HORIZON HOTEL" lobby, a "SIGNATURE" boutique, a bathroom) — illustrative of the finish, not claimed as Tabqat's own completed projects.
- Microcement's 8 images are real project photos of a branded space ("VE"/"VELYA", construction-in-progress details visible in some shots) — the docx's own alt text confidently attributes them to a Tabqat project, so used as supplied.

**Decisions made:**
- Filenames: `terrazzo-flooring.html`, `microcement-flooring.html` (root-level, matching the site's flat-file convention).
- Images copied as-is into `assets/my-images/our-services/terrazzo/` and `.../microcement/` (already well-named descriptive English slugs, webp-only — no png fallback exists, so plain `<img>` not `<picture>`, same pattern used for other webp-only folders in the rebuild).
- Banner: reusing one project photo per service (`indoor-terrazzo-floor.webp` for terrazzo, `microcement-luxury-floor.webp` for microcement) renamed into `assets/my-images/banners/`, same convention as every other category.
- Applying the Group 14 `.side-img` two-column layout from the start (this page didn't exist yet when Group 14 ran, so no separate rollout step needed).
- Nav: `components/header-home.html` and `components/header-inner.html` submenus get 2 new `<li>` entries (6 total, was 4). `components/offcanvas.html` has no services submenu — nothing to change there.
- ⚠️ **Known limitation, deliberately not fixed today:** every page also has the header/footer/offcanvas *baked directly into its own HTML* (not just live-injected via `components-loader.js`). There's a `embed-components.js` re-bake script for exactly this, but its regex (`/<div id="site-header">[\s\S]*?<\/div>/`, non-greedy) would stop at the *first* nested `</div>` inside the real header markup, not the matching one — running it as-is on this repo would truncate/corrupt the baked header in all ~60 pages. Not running it. This means: the *live* site (real visitors, and Googlebot which executes JS) will correctly show the new nav via `components-loader.js`'s runtime fetch of the updated component files — but the raw baked HTML source in each page's `<div id="site-header">` still shows the old 4-item submenu until either (a) someone fixes the regex and re-runs the script, or (b) each page is individually re-saved. Flagged as a standing cleanup item below, not blocking.
- our-services.html: adding 2 more cards to the 4-card grid (→ 6), and fixing the intro paragraph's "أربعة مجالات رئيسية" (four main areas) claim, which would become false.

**Plan (all done):**
1. Copy images into `assets/my-images/our-services/{terrazzo,microcement}/` + create 2 banner files. ✅
2. Build `terrazzo-flooring.html` — full content from docx, side-image layout, docx SEO/schema, sidebar. ✅
3. Build `microcement-flooring.html` — same. ✅
4. Update navbar submenu in `header-home.html` + `header-inner.html` (2 files × 2 new links). ✅
5. Update `our-services.html`: 2 new cards + fix "four areas" text. ✅
6. Update the Services Mind Map tree and add both pages to the Pages Names table in this file. ✅
7. Verify: HTML tag balance, image count, all internal links resolve, open both pages in browser. ✅
8. Log Timeline/History/Revert Ability, commit. ✅ (this entry)

**Execution notes:**
- **terrazzo-flooring.html:** 9 of the 10 supplied images used in the body (1:1, verified no duplicates/omissions), 10th (`indoor-terrazzo-floor.webp`) reserved exclusively for the banner. Side-image rows applied to the "types" (Epoxy vs Cement terrazzo) and "how we execute" (5 steps) sections, matching the Group 14 pattern; other sections use full-width `.section-img` matching the pre-Group-14 pages' convention for single standalone images. FAQ accordion + JSON-LD both carry the same 5 questions from the docx.
- **microcement-flooring.html:** all 8 supplied images used, matched to the docx's own per-image alt descriptions (حمام / حوض المغسلة / ردهة المشروع / منظر علوي / الدرج والردهة / المكتب / منطقة استقبال / الصالة الداخلية) rather than guessed — one image (`microcement-luxury-floor.webp`, the one showing the spiral staircase mentioned in alt #5) is deliberately used **both** as the banner and inside the body, since the docx's alt list maps all 8 photos to specific content and excluding one from the body would break that 1:1 mapping. 3 of the 6 "أين يُستخدم" application headings (مطابخ / المنازل / الحوش الخارجي) were kept text-only with no paired image — none of the 8 supplied photos actually show a kitchen, a house interior, or an exterior courtyard (they're all from one commercial/clinic space), so no image was forced onto those headings just to fill a slot. FAQ accordion + JSON-LD both carry all 7 questions (4 from the docx's own schema + 3 more mentioned only in the body FAQ list), same "merge and include everything" precedent used earlier in the rebuild (e.g. Group 5's potable-water page).
- **Both pages' sidebars** replace the usual "sibling sub-service" nav list (these services have no siblings) with a "خدماتنا الأخرى" list linking to the other 5 top-level services instead, so users can still explore the rest of the site from either page.
- **our-services.html:** added 2 cards (`col-lg-3`, same grid, now 6 cards total — wraps 4+2 on large screens, no layout changes needed) and corrected "أربعة مجالات رئيسية" → "ستة مجالات رئيسية" with both new services named in the sentence.
- **Verification:** HTML tag-balance parser on both new pages (both clean) plus `our-services.html`/both header components (one pre-existing, unrelated `<body>` tag issue on `our-services.html`, confirmed via `git show HEAD` to predate this change); image-usage count matched against each source folder's actual file list; every internal `href` on both new pages resolves to a real file (20/20 each).

---

## 📅 Timeline

| Date | Group | Task | Status |
|---|---|---|---|
| 2026-07-09 | — | Set up the-rebuild.md structure | ✅ Done |
| 2026-07-09 | — | Services mind map + old→new page names table (from Excel) | ✅ Done |
| 2026-07-09 | — | Defined per-page workflow (content pass + SEO pass) | ✅ Done |
| 2026-07-09 | 1 | Main Pages SEO Meta Tags & Structured Data (Tasks 1.1–1.12) | ✅ Done |
| 2026-07-09 | — | Divided service pages into Group Tasks 2–8 (one per category, with docx + image folder mapping) | ✅ Done |
| 2026-07-09 | 4 | waterproofing-thermal-insulation.html — content + SEO pass (sample/pilot page) | ✅ Done |
| 2026-07-09 | 7 | خدمات التدعيم — hub + 6 detail pages (content + SEO + banner, fixed 3 broken image paths) | ✅ Done |
| 2026-07-09 | 4 | Restructure: hub/system split — hub rebuilt, detail moved to waterproofing-thermal-insulation-system.html | ✅ Done |
| 2026-07-09 | — | Banners: renamed خدمات التدعيم/العزل المائي والحراري/العزل المائي (×2) to English slugs, applied to Groups 7+4 pages | ✅ Done |
| 2026-07-10 | 2 | العزل المائي — hub + 7 detail pages (content + SEO + banner) | ✅ Done |
| 2026-07-11 | 5 | دهانات الإيبوكسي — hub + 7 detail pages (content + SEO + banner), hub restyled to match waterproofing-thermal-insulation.html card layout | ✅ Done |
| 2026-07-11 | 2, 4, 5, 7 | Cross-group fix: shortened breadcrumb H1 titles on 21 detail pages to match hub card titles; confirmed banners already correct on all built groups | ✅ Done |
| 2026-07-11 | — | Renamed the-rebuild.md → management.md (git mv, history preserved) | ✅ Done |
| 2026-07-11 | 3 | العزل الحراري — 4 detail pages rebuilt (content + SEO); hub left as-is, still needs banner | ✅ Done |
| 2026-07-11 | 3 | العزل الحراري banner — reused banners/waterproofing-insulation-2.png across all 5 pages per user decision | ✅ Done |
| 2026-07-11 | 6 | حقن وإصلاح الخرسانة — hub fixed (title/description/banner) + 3 detail pages rebuilt (content + SEO + banner rename) | ✅ Done |
| 2026-07-11 | 8 | our-services.html — full SEO head added, dead commented-out block removed, alts+webp fixed; also synced SEO on the 4 category hub pages to match الصفحات ال4 للخدمات.docx | ✅ Done |
| 2026-07-11 | 9 | our-services.html — redesigned card section to reuse the site's .srv-card-link component (simple/modern, same data) | ✅ Done |
| 2026-07-11 | 10 | certificates.html — 18 certs read + grouped into 3 categories (official registrations / supplier approvals / project docs), 2 orphaned images (certi2, certi18) now shown | ✅ Done |
| 2026-07-11 | 11 | Small-laptop (1200-1366px) font fix — navbar links + breadcrumb H1, scoped media query in main.css | ✅ Done |
| 2026-07-11 | 12 | Project folder size report delivered (~15.5MB unused: scss, fonts, css map, unused theme images) — report only, nothing deleted | ✅ Done |
| 2026-07-11 | 13 | Banners on every remaining page — fixed 7 broken ab-co-ce-pr.png paths, assigned it to 3 general pages, assigned waterproofing-insulation.png to all 14 product pages | ✅ Done |
| 2026-07-11 | 6 | concrete-repair-injection.html hub restyled to match epoxy-flooring-coating.html (.srv-block/.srv-card-link/.srv-sidebar) | ✅ Done |
| 2026-07-12 | 12 | size-reduction-report.md created — file version of the Group 12 report, re-measured (incl. honest .git analysis: 0 MB garbage, squash-only savings) | ✅ Done |
| 2026-07-12 | — | Arranged management.md: status dashboard added, stale facts corrected (git now committed, banner questions resolved), sections reordered | ✅ Done |
| 2026-07-12 | 14, 15 | New tasks from newtasks.md arranged into Group 14 (services layout: side-images + H3 size) and Group 15 (site-wide alts from Alt.docx) — planned, not started | 📋 Pending |
| 2026-07-12 | 14.2 | H3 font-size fix — scoped `.rs-services-details-wrapper h3` rule in main.css, covers all 28 detail pages | ✅ Done |
| 2026-07-12 | 14.1 | Side-image layout pilot built on epoxy-flooring-car-parks-warehouses.html | ✅ Done (rollout pending approval) |
| 2026-07-12 | 15 | Site-wide image alts from Alt.docx — 74 alts fixed across 16 pages; found + fixed a pre-existing product-card image/title swap bug on 6 pages | ✅ Done |
| 2026-07-12 | 14.1 | Pilot approved (with margin tweak) — added `.side-img` margin, rolled out to all 24 remaining detail pages across Groups 2/3/5/6/7 | ✅ Done |
| 2026-07-13 | 16 | Added 2 new services (تيرازو + مايكروسمنت): 2 new pages, images copied, banners created, navbar (2 files) + our-services.html (2 cards) + mind map/names table updated | ✅ Done |

---

## 📖 History

### 2026-07-09 — Set up the-rebuild.md
- Created the history/tracking structure for the rebuild (groups, timeline, revert log).
- No site files changed.

### 2026-07-09 — Services mind map + page names table
- Extracted old→new page name mapping from `updates/Tabqat pages.xlsx` and `updates/Tabqat_20Services_20Pages_20-_20Cloud_20Code.xlsx`.
- Confirmed the renaming already happened: short slugs (`s-water-1.html`…) are the OLD names, current descriptive filenames are final.
- Built the site-structure tree with final filenames + Arabic titles in the Services Mind Map section.
- Flagged 5 leftover files marked Delete in the Excel but still in the repo: `p-attach-1.html`, `p-attach-3.html`, `p-iso-2.html`, `p-iso-4.html`, `product-rain.html`.
- No site files changed (documentation only).

### 2026-07-09 — Group Task 1: Main Pages SEO Meta Tags & Structured Data
- Applied the supplied SEO metadata (from `updates/الصفحات الرئيسية.docx`) to all 6 main pages: `index.html`, `about-us.html`, `certificates.html`, `projects.html`, `blogs.html`, `contact-us.html`.
- Each page: replaced `<title>` + `<meta name="description">` with the supplied copy, added `<meta name="robots" content="index, follow">`, added `<link rel="canonical">`, added full Open Graph block, added the shared `LocalBusiness` JSON-LD schema before `</head>`.
- Canonical/OG URLs use the current final filenames (`projects.html`, `contact-us.html`), not the doc's old names (`gallery.html`, `contact.html`).
- Existing `<meta name="keywords">`, CSS, JS, and GTM/gtag scripts left untouched.
- Validated: no duplicate title/description/robots/canonical/og:title/JSON-LD tags per page; all 6 JSON-LD blocks parse as valid JSON; descriptions 142–160 chars; titles 51–58 chars except `index.html` (68 chars, kept verbatim per supplied copy).

### 2026-07-09 — Group Task 4: waterproofing-thermal-insulation.html (sample/pilot page)
- Rebuilt from a bare 3-card stub into a full detail page using the docx content exactly (`updates/العزل المائي والحراري/العزل المائي والحراري.docx`): intro, "what is it" section, 6 benefits, 4 requirement sub-sections, comparison table vs. traditional systems, applications list, "why us", 5 FAQs, contact CTA.
- Used all 4 images in `assets/my-images/our-services/Waterheat-insulation/s-heatwater/` with `<picture>` webp+png fallback; 3 alts from `Alt.docx`, 1 authored to match style (no doc alt existed for image 4).
- Full SEO head: title/description/robots/canonical/OG/twitter tags + combined Service/FAQPage/BreadcrumbList JSON-LD from the docx, with schema URLs corrected to the final filename instead of the doc's old slugs.
- Reused the site's existing detail-page template and shared CSS classes from `main.css` — no new CSS added. Comparison table and FAQ accordion use Bootstrap classes already loaded on the site.
- Sidebar nav widget lists the 3 sibling category pages with this page marked active.
- Bug fix: found and fixed a dead link in `waterproofing-insulation.html` and `thermal-insulation.html` — both sidebars pointed to a nonexistent `water-thermal-insulation-system.html`; repointed to `waterproofing-thermal-insulation.html`.
- Verified by opening the page in a browser: layout, both images, comparison table, FAQ accordion, and all links confirmed working.
- This page was used as the sample/pilot to validate the per-page workflow before running it across Groups 2, 3, 5, 6, 7, 8.

### 2026-07-09 — Group Task 7: خدمات التدعيم (hub + 6 detail pages)
- `structural-strengthening.html` rebuilt from old rs-team stub to the card-grid hub template: 6 service cards with `Alt.docx` alts, filled the empty meta description, fixed breadcrumb خدماتنا link (pointed to index.html).
- 6 detail pages rebuilt with exact docx content from `updates/خدمات التدعيم/` + FAQ accordions + docx Service/FAQPage/BreadcrumbList schemas (URLs corrected from `s-support-N.html`/`service-support.html` to final filenames). concrete-jacketing includes the docx comparison table.
- Fixed 3 pre-existing broken image paths (nonexistent Arabic-named subfolders) in concrete-jacketing, carbon-fiber-strengthening, steel-jacketing, soil-injection — repointed to the real `s-support-1..6/` folders; all 17 images across the 6 folders now used with webp fallback where available.
- Banners: `banners/خدمات التدعيم.png` renamed → `banners/structural-strengthening.png` (git mv) and applied as breadcrumb background on all 7 Group-7 pages (was generic `pro-serv.png`).
- Verified: browser render on all 7 pages, valid JSON-LD, single H1, all image paths exist.

### 2026-07-09 — Group Task 4 restructure: hub/system split (user correction)
- The old "merged" assumption was wrong: the section needs a HUB page with 3 categories plus a separate detail page for the combined polyurethane-spray system.
- Copied the pilot detail content to **`waterproofing-thermal-insulation-system.html`** (new page, slug approved by user): canonical/OG/Service-schema URLs updated, BreadcrumbList + on-page breadcrumb gained the hub level, sidebar self-link updated.
- Rebuilt **`waterproofing-thermal-insulation.html`** as the hub: 3 cards (العزل المائي / العزل الحراري / العزل المائي والحراري المدمج) using `Waterheat-insulation/11.png, 22.png, 33.jpg` with `Alt.docx` alts; hub-style SEO head; kept all existing navbar/footer links working with zero edits elsewhere.
- Renamed `banners/العزل المائي والحراري.png` → `banners/waterproofing-thermal-insulation.png`; applied to both pages.
- Repointed sidebar third item in `waterproofing-insulation.html` and `thermal-insulation.html` to the system page (label now "العزل المائي والحراري المدمج").
- Names table updated: `service-Waterheat-insulation.html` → hub, `services-waterheat.html` → system page (no longer "merged").

### 2026-07-10 — Group Task 2: العزل المائي (hub + 7 detail pages)
- Read all 7 docx files in `updates/عزل مائي/` first, then rebuilt every detail page with the exact docx content: intro, تطبيقات (with image), اشتراطات, مراحل التنفيذ (H3 sub-steps with images), مزايا, لماذا طبقات (info-box), FAQ accordion, contact CTA note-box.
- SEO heads replaced with docx meta title/description, OG/twitter, and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD — schema URLs corrected from old slugs to final filenames; 4-level breadcrumb kept (خدماتنا → عزل مائي وحراري → العزل المائي → page).
- Every image in every folder used: bitumen 5, cementitious 4, polyurethane 4 (incl. `21.webp`), acrylic 3, polyurea 2, PVC 3, EPDM 3 — `<picture>` webp+png fallback where pairs exist; alts from `Alt.docx`, 3 missing alts authored in matching style.
- Banners: `العزل المائي.png` → `waterproofing-insulation.png` (hub), `العزل المائي 2.png` → `waterproofing-insulation-2.png` (all 7 detail pages), via git mv.
- Hub (`waterproofing-insulation.html`) kept its existing 7-card grid + SEO; banner applied.
- Verified: all 8 pages valid JSON-LD (3 schemas each on details), single H1/title, all images + banners exist on disk.

### 2026-07-11 — Group Task 5: دهانات الإيبوكسي (hub + 7 detail pages)
- User confirmed Group 5 had NOT actually been done (checkboxes were unchecked, pages were the original short template with generic SEO and no FAQ accordion) — redone from scratch reading all 7 docx in `updates/ايبوكسي/` first.
- Hub (`epoxy-flooring-coating.html`) explicitly requested to match `waterproofing-thermal-insulation.html`'s style/layout: rebuilt from the old `rs-team-item` stub to the `.srv-block`/`.srv-card-link` grid + `.srv-sidebar` template, 7 cards with `Alt.docx` alts, breadcrumb bug fixed (خدماتنا was linking to index.html instead of our-services.html; banner placeholder replaced).
- 7 detail pages rebuilt with full docx content: car-parks (4 steps), cold-storage (4 steps, HACCP FAQ), wastewater (3 steps), potable-water (4 steps incl. water-fill test, 6 FAQs — body listed a 5th FAQ not in the docx's FAQPage schema, added to both accordion and JSON-LD), food-processing (5 steps incl. coved-skirting corners), anti-static/ESD (7 steps incl. copper-grid + conductive-epoxy + resistance-test), mortar/screed (4 steps). Each got FAQ accordion, docx meta/OG/twitter, and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD with URLs corrected to final filenames.
- All folder images used and verified 1:1 against disk: 3+3+4+4+5+4+3 = 26 images across the 7 folders. Two images (food-processing #5, anti-static #4) have no `.webp` pair — used plain `<img>` for those; caught and fixed a leftover `<source>` reference to a nonexistent `s-epoxy-6/4.webp` during verification.
- Banner: `banners/eboxy.png` renamed → `banners/epoxy-flooring-coating.png` (git mv), applied to all 8 pages.
- Verified: PowerShell script checked JSON-LD validity, H1/title counts, image + webp path existence, and per-folder image usage across all 8 pages — all passed after the one webp fix.

### 2026-07-11 — Cross-group fix: breadcrumb H1 length + banner check (Groups 2, 4, 5, 7)
- User reported the breadcrumb H1 (the big title under the banner image) was too long on the detail pages built so far — it was using the full descriptive docx-style title instead of matching the short title used for that service's card on its category hub page.
- Shortened the `<h1 class="rs-breadcrumb-title">` on 21 detail pages to match the corresponding hub card / breadcrumb-trail title exactly: 7 waterproofing pages (Group 2), 1 Group 4 system page (→ "العزل المائي والحراري المدمج"), 7 epoxy pages (Group 5), 6 structural-support pages (Group 7). Also fixed `shotcrete.html`'s breadcrumb-trail last item, which said "خرسانة مقذوفة" instead of the hub's "الخرسانة المقذوفة (شوت كريت)".
- Meta title/OG/twitter/JSON-LD tags (which reuse the same long descriptive copy for SEO) were left untouched — only the on-page breadcrumb `<h1>` was shortened.
- Checked the banners folder and every built page's `data-background` value: the epoxy banner was already correctly applied to all 8 Group 5 pages, and Groups 2/4/7 already point at their correct banner files. No banner changes needed this round.

### 2026-07-11 — Group Task 3: العزل الحراري (4 detail pages)
- Read all 4 docx files in `updates/عزل حراري/` first. Existing detail pages were in the thin "SEO-decent, content-thin" state seen before in other groups: each had only 1 image and a single generic paragraph, no FAQ accordion, no OfferCatalog/FAQPage schema.
- Rebuilt all 4: perlite (4 steps), polystyrene/فوم (3 steps), polyurethane PU (4 steps), rockwool/الصوف الصخري (3 "خصائص" sub-sections + 4 steps). Each got full docx content, FAQ accordion, docx meta/OG/twitter, and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD with a 4-level breadcrumb, URLs corrected from `s-heat-N.html` to final filenames.
- Applied the short-breadcrumb-H1 house style from the start — matching the hub's card titles.
- Images in this folder are unusually inconsistent (webp-only / png-only / odd numbering) — used `<picture>` only where a real pair exists, plain `<img>` everywhere else. All 10 images across the 4 folders (1+3+3+3) verified used and present on disk. Alts from `Alt.docx` where available (polystyrene full coverage; perlite none; polyurethane/rockwool each missing one) — authored the gaps in matching style.
- Hub (`thermal-insulation.html`) was already in good shape from an earlier pass — left untouched.
- Banner gap flagged (resolved in the follow-up below).
- Verified: PowerShell check confirmed valid JSON-LD, single H1/title, and every image path exists on disk across all 4 detail pages.

### 2026-07-11 — Group Task 3 banner follow-up
- User flagged the still-open Group 3 banner gap. Asked which banner to use (new image vs. reuse); user chose to reuse `banners/waterproofing-insulation-2.png` (also used by all 7 Group 2 detail pages).
- Replaced the `pro-serv.png` placeholder `data-background` on all 5 Group 3 pages (hub + 4 details). File not renamed — intentionally shared across both groups, unlike every other group's dedicated banner.
- Verified all 5 pages' `data-background` now point at the correct, existing file.

### 2026-07-11 — Group Task 6: حقن وإصلاح الخرسانة (hub fix + 3 detail pages)
- Read all 3 docx files in `updates/إصلاح الخرسانة/` first. Hub already had a working 3-card grid but an empty `<title>`/`<meta name="description">` and the placeholder banner; the 3 detail pages were thin stubs.
- Fixed the hub's title/description to match its existing OG copy, and renamed `banners/حقن وإصلاح الخرسانة.png` → `banners/concrete-repair-injection.png` (git mv), applying it to all 4 pages.
- Rebuilt all 3 detail pages with full docx content, FAQ accordion, docx meta/OG/twitter, and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD (3-level breadcrumb): 6-step methodology page, PU-injection page (with PU-vs-epoxy comparison table), epoxy-injection page (with epoxy-vs-PU comparison table; hub's short card title used for the breadcrumb H1 per house style).
- Images: each folder has image 1 in jpg/png (paired with webp) plus two webp-only images — `<picture>` for image 1, plain `<img>` for 2–3. All 9 images verified used and present on disk. Alts from `Alt.docx`.
- Verified: valid JSON-LD, single H1/title, every image + banner path exists on disk across all 4 pages.

### 2026-07-11 — Group Task 8: our-services.html (SEO + cleanup) — all 8 original groups complete
- Found and read `updates/الصفحات ال4 للخدمات.docx`, resolving open question #1: it's a meta-tags-only document covering 5 pages — `our-services.html` plus the 4 category hub pages. No body/content copy for any of the 5 — just title/description/robots/canonical/OG + a shared LocalBusiness JSON-LD block.
- `our-services.html` had literally no SEO at all — added the full head from the docx exactly, plus a BreadcrumbList JSON-LD entry. og:image points at a real existing image (`all-services/11.png`) since the docx's suggested `og-services.jpg` doesn't exist in the repo — same substitution pattern used whenever docx-referenced OG images don't exist on disk.
- Removed a ~157-line dead commented-out block left over from an earlier abandoned layout attempt — pure dead-code removal, zero visual change.
- Fixed 3 of the 4 service-card images that had generic `alt="image"` (authored matching-style Arabic alts), and added `<picture>` webp+png fallback to all 4 cards.
- Updated the 4 category hub pages' title/description/OG/twitter to match the docx's copy exactly for consistency — canonical URLs kept as the current final filenames rather than the docx's old slugs, same as every other group.
- Did NOT touch the card-grid layout/design — that's the separately-tracked Group Task 9 redesign.
- Verified: JSON-LD parses valid, single H1/title, all 12 image references resolve on disk.

**Milestone: all 8 originally-planned rebuild groups (Word-file-driven service pages) are content+SEO complete. Groups 9–13 (extra requests) are also done. What's left is only the standing cleanup items in the Current Status table at the top.**

### 2026-07-11 — Group Task 9: our-services.html redesign
- Replaced the plain `.rs-team-item` thumbnail-and-title-only card list with the site's established `.srv-card-link`/`.srv-card-body` component already used on every category hub page — makes `our-services.html` look consistent with the rest of the site instead of an older, different template.
- Added a short centered intro (heading + one paragraph reusing the docx's "20 years, 4 areas" framing) above the grid, and a single centered WhatsApp CTA button below it, both reusing existing classes — no new CSS or JS written.
- Same 4 cards, same links, same images and alts, same breadcrumb — purely a visual restructuring, no data/content change.
- Verified: single H1/H2, all image references resolve on disk.

### 2026-07-11 — Group Task 10: certificates.html categorization
- The 18 files in `assets/my-images/certificate/` had zero identifying info in their filenames, and the existing page only displayed 16 of them in one flat grid with `alt="image"` placeholders.
- Opened and read every one of the 18 images to find out what they actually are — company registrations, manufacturer approved-applicator letters, or project-specific documents.
- Grouped into 3 titled sections (official registrations 4 / supplier approvals 7 / project documents 7) using the same `.srv-card-link` component as Groups 8/9 — each card links to its full-size image in a new tab, with a real caption and alt text describing what the document actually says (verified firsthand, nothing invented).
- Fixed the 2 previously-orphaned images so all 18 are now shown, each exactly once. No new CSS/JS.
- Verified: single H1, 3 category headings, all 18 certificate files resolve on disk with none unreferenced.

### 2026-07-11 — Group Task 11: small-laptop font fix
- "The ones I told u" wasn't recorded anywhere in this file from whatever earlier session set up this task — asked the user directly. Confirmed: navbar menu text + breadcrumb H1 titles.
- Investigated why: `meanScreenWidth: "1199"` in `assets/js/main.js` means the mobile hamburger only replaces the desktop nav below 1200px. Screens from 1200–1366px were showing the full desktop `.main-menu` and the full 55px `.rs-breadcrumb-title`, with zero size reduction anywhere in the stylesheet for that range.
- Added one new scoped block in `assets/css/main.css`: `@media (min-width: 1200px) and (max-width: 1366px)` touching exactly 2 rules — `.main-menu li a` (18px→15px, padding 40px 20px→40px 12px) and `.rs-breadcrumb-one .rs-breadcrumb-title` (55px→42px). Vertical header padding untouched so header height doesn't shift.
- Did not touch `assets/scss/` (confirmed dead/unreferenced during the Group 12 audit) — `main.css` is the only file that actually matters.
- Scope check: ≥1367px keeps the original sizing; <1200px is untouched.

### 2026-07-11 — Group Task 12: project folder size report
- Requested as a report only — delivered findings in chat, did not delete anything.
- `du -sh` breakdown: repo total 211MB; `.git/` = 119MB; working tree ≈89MB, almost all under `assets/`.
- Found ~15.5MB of confirmed-unused files by cross-checking every candidate against actual HTML/CSS references (grep, not guesswork): `assets/scss/` (921KB), `assets/maps/main.css.map` (848KB), ~11MB of unused Font Awesome weights + ~1MB Remixicon demo files, ~1.8MB of unreferenced theme-template image folders, and the 5 duplicate HTML files.
- Awaiting the user's go-ahead before deleting any of this.

### 2026-07-12 — Group Task 14.2: H3 font-size fix (site-wide, one CSS rule)
- Investigated the shared wrapper before touching anything: every service detail page (Groups 2, 3, 4-system, 5, 6, 7 — 28 pages total) uses `.rs-services-details-wrapper` around its content, and the oversized H3s came from the theme's global `--rs-fs-h3: 38px` variable, which renders bigger than the 20px `.section-heading` H2 directly above each H3 sub-step.
- Added exactly one rule to `assets/css/main.css`: `.rs-services-details-wrapper h3:not(.accordion-header) { font-size: 17px; font-weight: 700; color: #0d1b2a; margin: 24px 0 10px; }` — excludes the FAQ accordion buttons (also `<h3>`, but sized by their own button style) so accordion headers are untouched. Same single-source-of-truth approach used for the Group 11 small-laptop breakpoint — no per-page inline styles, no SCSS touched.
- Verified all 28 pages share the wrapper class, so the fix applies everywhere with zero page edits.

### 2026-07-12 — Group Task 14.1: side-image layout pilot
- Read the user's example markup in `newtasks.md`: a `col-lg-6` split (text one side, image the other) with `order-*` classes for mobile-first stacking, `img-fluid rounded shadow-lg` on the image.
- Built it on `epoxy-flooring-car-parks-warehouses.html`'s "مراحل التنفيذ" section: converted the 4 H3 steps (previously stacked full-width under 2 full-width images) into 2 side-by-side rows — steps 1–2 beside image 2, steps 3–4 beside image 3, images mirrored left/right between the two rows for visual rhythm. Left the intro image (section 1) and everything else full-width, per "images on the side is an option" — only converting sections that naturally pair one image with a block of related text.
- Caught and avoided a silent bug: the user's example used a `mb-30` class, which doesn't actually exist anywhere in this theme's CSS (grepped `assets/css/main.css` and the Bootstrap vendor file) — it would've been a no-op spacing class. Used Bootstrap's real `.mb-4`/`.mb-lg-0` utilities instead.
- Kept the existing `<picture>` webp+png fallback, alt text, and lazy-loading exactly as they were — only the layout wrapper changed, no image sources or alts touched.
- Verified: HTML tag-balance parse (no stray/unclosed tags), opened in browser for visual check.
- **Holding here** — rollout to the other ~27 detail pages (Groups 2, 3, 4-system, 5 remaining 6, 6, 7) is queued but not started, pending your approval of the pilot's look.

### 2026-07-12 — Group Task 14.1: full rollout to all remaining detail pages
- User approved the pilot with one adjustment: "add a small margin top & bottom, do for all services images." Added `.side-img { margin: 20px 0; }` to `main.css` (paired with `.rounded.shadow-lg.img-fluid` already on the images) and applied the `side-img` class to the pilot's 2 images.
- Rather than hand-edit ~27 pages individually, wrote two Python converters that find the structural pattern and rebuild it programmatically — much lower risk of a copy-paste slip across that many files than manual editing, but required verifying the pattern held before trusting it at scale:
  - **Converter A** (image → h3 → p → h3 → p… repeating): matches the pilot's own shape. Used on Groups 5 (6 remaining pages), 7 (all 6), and most of 3 and 6.
  - **Converter B** (h3 → picture → p, one image embedded per step): discovered while investigating why all 7 Group 2 pages initially reported "no convertible groups" — Group 2 was built on a different sub-template where each step carries its own image directly after the heading, rather than one image serving 1–2 steps. Wrote a second converter for this exact shape.
  - Both preserve `<picture>` webp+png source pairs, existing alt text, and `wow`/`loading="lazy"` attributes untouched — only the surrounding row/column wrapper and the image's class list changed.
- Investigated every page that reported "no convertible groups" individually (didn't just trust the script's silence) to confirm it was a genuine absence of pairable images, not a missed pattern: `perlite-thermal-insulation.html` (steps have no adjacent images at all — its one image is a standalone lead-in elsewhere), `waterproofing-thermal-insulation-system.html` (the "الاشتراطات" requirements are 4 text-only sub-sections, no per-item images), `concrete-repair-structural-materials.html` (its 6 steps are a plain `<ol>` list, not H3 blocks, with one trailing image — no per-step pairing exists to convert).
- **Bug caught mid-run:** Converter B's first version required a bare `<picture>` tag with no attributes; several pages (all 7 Group 2 pages plus, harmlessly, the untouched system page) use `<picture style="display:block;">`, so the first pass silently converted 0 rows on all of them. Caught this because "0 rows" on 7/7 pages in the same group was suspicious rather than expected — fixed the regex to allow any attributes on `<picture>`, reverted the empty partial output, and reran; verified via `grep -l '<picture style='` that exactly those 7 pages then converted correctly.
- Final verification across all 24 rolled-out pages before committing: (1) HTML tag-balance parser — all pass, except 2 files with a pre-existing tag mismatch confirmed via `git show HEAD` to predate this edit; (2) `<img>` tag count identical before/after on every single file (no image lost, duplicated, or orphaned); (3) `side-img` class present on every converted image, confirming the CSS margin will actually apply.
- Row totals per page: bitumen(4), cementitious(3), polyurethane(3), acrylic(2), polyurea(1), pvc(2), epdm(2) — Group 2; polystyrene(2), polyurethane-board(2), rockwool(1) — Group 3; cold-storage(2), wastewater(2), potable-water(3), food-processing(3), anti-static(2), mortar(2) — Group 5; pu-injection(2), epoxy-injection(2) — Group 6; concrete-jacketing(2), carbon-fiber(2), steel-jacketing(2), soil-injection(1), shotcrete(2), excavation-shoring(2) — Group 7.

### 2026-07-12 — Group Task 15: site-wide image alts (Alt.docx)
- Extracted the full text of `updates/Alt.docx` (278 paragraphs, read via zipfile+regex since no python-docx is installed) — confirmed every alt in it is for the Groups 2–8 service-page images, all of which were already applied during the original rebuild. Nothing new to extract from the doc itself.
- Wrote a scan across every HTML file (excluding the 5 files already marked for deletion and 2 internal planning docs) for `<img>` tags with a missing, empty, or generic alt (`alt="image"`, `alt="img"`, `alt="photo"`, case-insensitive, logos excluded) — found 123 flagged images across 48 pages.
- Built a source→alt mapping for every distinct image src that recurred with a generic alt, authoring descriptive Arabic alt text matching the site's existing style (company name, service/product identified, location where relevant) — applied to 74 images across 16 pages: `index.html` (24: services/products/blog/projects card images), `about-us.html` (15: same shared homepage image set), 4 blog-adjacent pages (`blogs.html`, `concrete-crack-repair-techniques.html`, `excavation-shoring-support.html`, `roof-waterproofing-thermal-insulation.html` — sidebar "related articles" thumbnails), and 10 product pages (bitumen-primer-base, polyfilm/topsel insulation membranes, insulation-drain, insulation-rolls, adhesive-materials, rainwater-drain, max-plug, max-seal-super, nitoprime-zinc-rich-primer — "related products" card images shared across multiple product pages).
- `index.html`'s 6 homepage project-gallery images got individual alts derived from each card's own project-name caption rather than one repeated generic alt.
- **Bug found while mapping images to pages:** on `cementitious-waterproofing-products.html` and `construction-materials.html`, the two "related product" cards for نيتوبرايمر زنك رتش / رندروك اف سي (on the cementitious page) and ماكس بلج / ماكس سيل سوبر (on the construction-materials page) had their images AND visible titles swapped with each other — e.g. the card linking to `nitoprime-zinc-rich-primer.html` displayed the ماكس بلج can photo and "ماكس بلج" as its title. The same swapped pair also appeared in the "related products" sidebar widget on all 4 of those products' own detail pages (`nitoprime-zinc-rich-primer.html`, `renderoc-fc-repair-mortar.html`, `max-plug-hydraulic-cement.html`, `max-seal-super-waterproofing.html`) and cross-linked from `rainwater-drain.html`. Verified the correct pairing by opening and reading both product photos (can/bag labels), then fixed the `src` and title text on all 6 files so every card's image and title now matches its own link target.
- Left 49 of the original 123 flagged images untouched — confirmed by inspecting their surrounding markup that they're intentionally decorative (a download icon next to visible "تحميل البروفايل" text, feature icons next to their own feature titles, generic reviewer-avatar placeholders in a review widget) where `alt=""` is the correct accessible choice, not a gap. Also confirmed `thermal-insulation.html`/`waterproofing-insulation.html` were false positives in the initial scan (single-quoted `alt='...'` attributes that a double-quote-only regex missed) — both already have complete alts from their Group 2/3 builds.
- Verified: ran an HTML tag-balance parser over all 19 edited files. 2 files (`excavation-shoring-support.html`, `cementitious-waterproofing-products.html`) flagged minor pre-existing tag mismatches unrelated to this edit — confirmed via `git show HEAD` that both were already present before today's changes (only `alt="..."` attribute text was touched on those lines, no tags added/removed).

### 2026-07-13 — Group Task 16: 2 new services (Terrazzo + Microcement)
- User request: add تيرازو and مايكروسمنت as brand-new services, using the content already staged in `updates/terrazzo/` and `updates/microcement/`, and wire them into the navbar and services hub.
- Extracted both docx files in full (zipfile+regex). Confirmed from the microcement docx's own breadcrumb ("الرئيسية ← خدماتنا ← مايكروسمنت") that these are new **top-level** categories, not sub-services of an existing one — each is a single one-page service with no hub/detail split.
- Opened and read all 18 supplied images individually (not batch-guessed) before writing any alt text or picking a banner, re-verifying a few after an initial batch-call risked mis-mapping filenames to content. Noted: the 10 terrazzo photos are stock/reference imagery (a "GRAND HORIZON HOTEL" lobby, a "SIGNATURE" boutique, villa entrances) — not claimed as Tabqat's own projects; the 8 microcement photos are real project photos of one branded space ("VE"/"VELYA", with construction-in-progress details visible), and the docx's own alt text attributes them to a Tabqat project, so used as supplied.
- Copied all 18 images into new folders `assets/my-images/our-services/terrazzo/` and `.../microcement/` (kept their already-descriptive English filenames). Created 2 banner files in `assets/my-images/banners/` by reusing one photo per service (`terrazzo-flooring.webp` ← `indoor-terrazzo-floor.webp`; `microcement-flooring.webp` ← `microcement-luxury-floor.webp`).
- Built `terrazzo-flooring.html` from the `waterproofing-thermal-insulation-system.html` template (closest existing single-page-service shape): full docx content (intro, 4-card "why choose us" features-grid, Epoxy-vs-Cement types as 2 side-image rows, 5 applications, a terrazzo-vs-marble comparison table, a 5-step "how we execute" section as 4 side-image rows, 4-point "why طبقات" list, 5-question FAQ accordion, closing CTA), full SEO head + Service/FAQPage/BreadcrumbList JSON-LD from the docx. 9 of the 10 images used in the body (1:1, verified), the 10th reserved for the banner only.
- Built `microcement-flooring.html` the same way: intro, 5-card features-grid, 6 "أين يُستخدم" applications (3 paired with side-images that genuinely matched — حمامات/جدران/تجاري — 3 left text-only since none of the 8 photos show a kitchen, house, or literal exterior courtyard and forcing a mismatched photo onto those headings would misrepresent them), a 7-step execution section as 4 side-image rows, 4-point "why طبقات" list, a 7-question FAQ accordion (4 from the docx's own FAQPage schema + 3 more mentioned only in the body text, merged into both the accordion and JSON-LD — same "include everything, keep schema in sync with the visible accordion" precedent from Group 5's potable-water page), closing CTA. All 8 images used, matched to the docx's own per-image alt descriptions rather than guessed (one image, showing the spiral staircase mentioned in alt #5, deliberately used both as the banner and inline in the body since excluding it would break the docx's 1:1 photo-to-alt mapping).
- Both pages' sidebars replace the usual "sibling sub-service" nav list (neither service has siblings) with a "خدماتنا الأخرى" list linking to the other 5 top-level services, so visitors can still reach the rest of the site from either page.
- Updated navbar: added `تيرازو` and `مايكروسمنت` links to the "خدماتنا" submenu in `components/header-home.html` and `components/header-inner.html` (now 6 items, was 4). Checked `components/offcanvas.html` — it has no services submenu, nothing to change there.
- Updated `our-services.html`: added 2 more `.srv-card-link` cards to the existing 4-card `col-lg-3` grid (now 6, wraps 4+2 with no layout changes needed), and corrected the intro paragraph's "أربعة مجالات رئيسية" (four main areas) claim to "ستة مجالات رئيسية" (six), naming both new services.
- Updated this file's Services Mind Map tree (added categories 7–8 under `our-services.html`) and the Pages Names table (2 new rows, marked "new, no old name" since these were never part of the original rebuild's Excel source).
- **Investigated but deliberately did not run `embed-components.js`:** every page has its header/footer/offcanvas baked directly into its own HTML (in addition to the live `components-loader.js` JS injection), and there's a script meant to re-bake all pages after a component edit. Its regex (`/<div id="site-header">[\s\S]*?<\/div>/`) is non-greedy and would match only up to the *first* nested `</div>` inside the real multi-div header markup, not the true closing tag — running it as-is would silently truncate/corrupt the baked header on all ~60 pages. Left it un-run; the live site is unaffected since `components-loader.js` overwrites `#site-header` at runtime from the now-updated component files (this is what real visitors and Googlebot, which executes JS, actually see) — only the raw page-source fallback is stale. Flagged as a standing cleanup item rather than risking a bulk corruption to fix a cosmetic-only gap.
- Verified: HTML tag-balance parser on both new pages (clean) and on `our-services.html` + both header components (`our-services.html` flagged one pre-existing `<body>` tag issue, confirmed via `git show HEAD` to predate this change); image-usage counted and matched against each source folder's actual file list (9/10 terrazzo, 8/8 microcement, exactly as planned); every internal `href` on both new pages resolves to a real file (20/20 each). Opened both pages plus `our-services.html` in-browser for a visual check.


### 2026-07-12 — size-reduction-report.md (file version of the Group 12 report)
- Created `size-reduction-report.md` in the repo root — re-measured everything and expanded the Group 12 findings (see the Group Task 12 section above for the full delta, including the honest `.git` analysis: zero unreachable garbage, squash-only savings, don't squash before the rebuild is fully wrapped).

### 2026-07-12 — Arranged management.md
- Added the 📌 Current Status dashboard at the top (all 13 groups done + the 5 standing cleanup items).
- Corrected stale facts: the "everything is uncommitted on top of c39ae73" warnings (all work is now committed through `bac8187`), the our-services banner open question (resolved by Group 13), the "Groups 9–12" milestone wording (13 exists), and the banner reference list.
- Reordered into clear sections: Status → Context → Brief/Workflow → Reference (mind map + names tables) → Group Tasks 1–13 (each stamped with its DONE date) → Timeline → History → Revert Ability. Cleaned the leftover empty-bullet notes block and placeholder headings. No information was removed — documentation-only change, no site files touched.

---

## ⏪ Revert Ability

Each entry below is a checkpoint to roll back to if a task needs to be undone.

> **Git state note (2026-07-12):** at the time most rows below were written, everything after the pilot was uncommitted on top of `c39ae73`. Since then all work has been committed (history: `c39ae73` → the "the 1st try" commit series → merge commits → `bac8187`). The `c39ae73` references below are still valid as the *pre-rebuild* restore point for any file; for finer-grained reverts, find the file's own history with `git log --oneline -- <file>`.

| Date | Task | Files touched | Revert reference | Notes |
|---|---|---|---|---|
| 2026-07-09 | Set up the-rebuild.md | the-rebuild.md | n/a | Initial doc, nothing to revert |
| 2026-07-09 | Group Task 1 — SEO meta tags | index.html, about-us.html, certificates.html, projects.html, blogs.html, contact-us.html | `6dd5282` | `git checkout 6dd5282 -- <file>` restores the pre-SEO head for any of the 6 files |
| 2026-07-09 | Group Task 4 — waterproofing-thermal-insulation.html (content + SEO) | waterproofing-thermal-insulation.html, waterproofing-insulation.html, thermal-insulation.html | `c39ae73` | `git checkout c39ae73 -- <file>` restores the pre-rebuild version |
| 2026-07-09 | Group Task 7 — خدمات التدعيم (7 pages + banner rename) | structural-strengthening.html + 6 detail pages, banners/structural-strengthening.png | `c39ae73` | Pre-rebuild base |
| 2026-07-09 | Group 4 restructure — hub/system split | waterproofing-thermal-insulation.html (hub), waterproofing-thermal-insulation-system.html (NEW), waterproofing-insulation.html, thermal-insulation.html, banners/waterproofing-thermal-insulation.png | `c39ae73` | The -system.html file is new; deleting it + restoring the other 3 from `c39ae73` undoes the split |
| 2026-07-10 | Group Task 2 — العزل المائي (8 pages + 2 banner renames) | waterproofing-insulation.html + 7 detail pages, banners/waterproofing-insulation.png, banners/waterproofing-insulation-2.png | `c39ae73` | Pre-rebuild base |
| 2026-07-11 | Group Task 5 — دهانات الإيبوكسي (8 pages + banner rename) | epoxy-flooring-coating.html + 7 detail pages, banners/epoxy-flooring-coating.png | `c39ae73` | Pre-rebuild base |
| 2026-07-11 | Cross-group fix — breadcrumb H1 shortening (21 pages) | 7 waterproofing detail pages, waterproofing-thermal-insulation-system.html, 7 epoxy detail pages, 6 structural-support detail pages | `c39ae73` | Only the `<h1 class="rs-breadcrumb-title">` text changed on each file — safe, isolated edit |
| 2026-07-11 | Group Task 3 — العزل الحراري (4 detail pages) | perlite-thermal-insulation.html, polystyrene-board-thermal-insulation.html, polyurethane-board-thermal-insulation.html, rockwool-board-thermal-insulation.html | `c39ae73` | Hub (thermal-insulation.html) untouched this round |
| 2026-07-11 | Group Task 3 banner — reused waterproofing-insulation-2.png | thermal-insulation.html + the 4 detail pages above | `c39ae73` | Only the breadcrumb `data-background` attribute changed on each file; no file renamed |
| 2026-07-11 | Group Task 6 — حقن وإصلاح الخرسانة (hub fix + 3 pages + banner rename) | concrete-repair-injection.html, concrete-repair-structural-materials.html, polyurethane-injection-concrete-leak-stopping.html, epoxy-injection-concrete-repair.html, banners/concrete-repair-injection.png | `c39ae73` | Pre-rebuild base |
| 2026-07-11 | Group Task 8 — our-services.html (SEO + dead-code cleanup) + 4 category hub pages (SEO sync) | our-services.html, waterproofing-thermal-insulation.html, epoxy-flooring-coating.html, concrete-repair-injection.html, structural-strengthening.html | `c39ae73` | Pre-rebuild base |
| 2026-07-11 | Group Task 9 — our-services.html card-grid redesign | our-services.html | `c39ae73` | Same file touched twice that day (Group 8 then 9) — restoring from `c39ae73` undoes both in one step |
| 2026-07-11 | Group Task 10 — certificates.html categorization | certificates.html | `c39ae73` | Purely a markup restructure — no new/renamed image files |
| 2026-07-11 | Group Task 11 — small-laptop font fix | assets/css/main.css | `c39ae73` | 2 small additive `@media` blocks only — no existing rules changed or removed |
| 2026-07-11 | Group Task 12 — project size report | (none — report only) | n/a | No files touched; nothing to revert |
| 2026-07-11 | Group Task 13 — banners on all remaining pages | 7 pages (path fix), certificates.html, blog-rainfilters.html, our-services.html, + 14 product pages | `c39ae73` | Only `data-background` attribute values changed — no images renamed/moved this round |
| 2026-07-11 | Group Task 6 follow-up — concrete-repair-injection.html hub restyle | concrete-repair-injection.html | `c39ae73` | Only the card-grid section markup replaced; no data/links/SEO changed |
| 2026-07-12 | size-reduction-report.md + management.md arrange | size-reduction-report.md (new), management.md | `bac8187` | Documentation only — no site files touched |
| 2026-07-12 | Group Task 14.2 — H3 font-size fix | assets/css/main.css | `bac8187` | 1 additive scoped rule only — no existing rules changed or removed |
| 2026-07-12 | Group Task 14.1 — side-image pilot | epoxy-flooring-car-parks-warehouses.html | `bac8187` | Only the "مراحل التنفيذ" section markup restructured; image sources, alts, and all other sections untouched |
| 2026-07-12 | Group Task 15 — site-wide alts + swapped-image bug fix | index.html, about-us.html, blogs.html, concrete-crack-repair-techniques.html, excavation-shoring-support.html, roof-waterproofing-thermal-insulation.html, bitumen-primer-base.html, polyfilm-insulation-membrane.html, topsel-insulation-membrane.html, insulation-drain.html, insulation-rolls.html, adhesive-materials.html, rainwater-drain.html, max-plug-hydraulic-cement.html, max-seal-super-waterproofing.html, nitoprime-zinc-rich-primer.html, renderoc-fc-repair-mortar.html, cementitious-waterproofing-products.html, construction-materials.html | `bac8187` | Alt text + (on 6 files) swapped product image `src`/title corrections only — no structural changes |
| 2026-07-12 | Group Task 14.1 — full side-image rollout (24 pages) + margin tweak | assets/css/main.css, epoxy-flooring-car-parks-warehouses.html (margin only), bitumen-waterproofing.html, cementitious-waterproofing.html, polyurethane-waterproofing.html, acrylic-waterproofing-coating.html, polyurea-spray-waterproofing.html, pvc-waterproofing.html, epdm-waterproofing.html, polystyrene-board-thermal-insulation.html, polyurethane-board-thermal-insulation.html, rockwool-board-thermal-insulation.html, epoxy-flooring-cold-storage-freezer-rooms.html, epoxy-coating-wastewater-sewage-tanks.html, epoxy-lining-potable-water-tanks.html, epoxy-flooring-food-processing-facilities.html, anti-static-epoxy-flooring.html, epoxy-mortar-flooring-systems.html, polyurethane-injection-concrete-leak-stopping.html, epoxy-injection-concrete-repair.html, concrete-jacketing.html, carbon-fiber-strengthening.html, steel-jacketing.html, soil-injection.html, shotcrete.html, excavation-shoring.html | `89e6090` (commit right before the rollout) | Only the step-images section's markup restructured on each page (row/column wrapper + image class); image sources, alt text, and every other section untouched. `git checkout 89e6090 -- <file>` reverts any single page to its pre-rollout full-width layout |
| 2026-07-13 | Group Task 16 — 2 new services (Terrazzo + Microcement) | terrazzo-flooring.html (new), microcement-flooring.html (new), our-services.html, components/header-home.html, components/header-inner.html, management.md, + 18 new image files under assets/my-images/our-services/{terrazzo,microcement}/ and 2 new banner files | `ddadb50` (commit before this task) | The 2 new pages + new image folders are additions — deleting the 2 `.html` files and the 2 new image folders fully removes the services. `git checkout ddadb50 -- our-services.html components/header-home.html components/header-inner.html` reverts the nav/hub changes without touching the new pages |

**Note:** the commits above list `bac8187`/`6d4606e` as the pre-change references because everything from Group 14/15 onward was committed together as `6d4606e "new updates --"` (which also folded in the earlier size-report/management-arrange work). For a clean per-file rollback use `git log --oneline -- <file>` to find that file's specific last-good commit.

**How to revert a task:**
1. Find the task's row in the Revert Ability table.
2. Check the "Revert reference" (git commit hash before the change).
3. Restore with `git checkout <hash> -- <file>`, then update this file to note the revert in History.
