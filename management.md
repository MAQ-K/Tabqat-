# Management — Tabqat Website Rebuild

This file (renamed from `the-rebuild.md`) is the working log for the Tabqat website rebuild. Every task gets logged here after it's done, tasks are organized into groups, and there's a timeline + revert reference so any change can be traced and undone.

***each time we make and edit this file gets updated***

---

## 🧠 READ THIS FIRST — Full Context (written so a fresh session can pick up with zero memory)

**What this project is:** a static HTML website for Tabqat (طبقات) — a Saudi construction-services company (waterproofing, thermal insulation, epoxy flooring, concrete repair, structural support). All pages are flat `.html` files in the repo root. Content is Arabic (RTL). Assets live in `assets/`, shared header/footer components in `components/`.

**The main job:** rebuild the ~34 service pages. For EVERY service page, two passes:
1. **Content pass** — replace the page text with the new content from its Word file, insert the new images, rearrange sections to fit.
2. **SEO pass** — meta title/description, canonical, Open Graph, headings, image alts, fix internal links.
A page is only Done when both passes are done.

**The 3 unbreakable rules:**
1. **The Word file is law.** Each service page has a `.docx` in `updates/` saying exactly what its content should be. Implement it EXACTLY — no inventing, no rewording, no skipping.
2. **Use ALL the images.** Each service page has an image folder under `assets/my-images/our-services/`. Every image in that folder must be used on the page. Images mostly come as `.png` + `.webp` pairs — use webp, png as fallback.
3. **Log everything here.** After each task: check the ☐ boxes in the group table, add a Timeline row, write a History entry, and record the pre-change git commit hash in Revert Ability. Commit per group so each group is one revert checkpoint.

**Key facts you (future me) already figured out — don't re-derive them:**
- **Page renaming is ALREADY DONE.** Old short slugs (`s-water-1.html`, `service-epoxy.html`, `product-iso.html`…) were renamed to the descriptive filenames now in the repo. The full old→new mapping is in the "Pages Names change" table below. Old names matter only for (a) matching image folders, which still use old slugs, and (b) fixing stale internal links.
- **Image folder ↔ page mapping** uses OLD slugs: e.g. `assets/my-images/our-services/Waterheat-insulation/s-water/s-water-1/` belongs to `bitumen-waterproofing.html`. Full mapping is in each group's table (Group Tasks 2–8 below).
- **Word file locations:** `updates/عزل مائي/` (7 docx), `updates/عزل حراري/` (4), `updates/العزل المائي والحراري/` (1), `updates/ايبوكسي/` (7), `updates/إصلاح الخرسانة/` (3), `updates/خدمات التدعيم/` (6), plus `updates/الصفحات الرئيسية.docx` (main category pages) and `updates/الصفحات ال4 للخدمات.docx` (needs checking — probably the services hub / 4 main pages). `updates/Alt.docx` = image alt texts. The two `.xlsx` files = the old→new page names (already extracted into this doc).
- **Reading docx/xlsx:** no openpyxl/python-docx installed. They're zip files — read with Python stdlib: `zipfile` + regex over `word/document.xml` (docx) or `xl/sharedStrings.xml` + `xl/worksheets/sheet1.xml` (xlsx). Arabic comes out as HTML entities from xlsx (`&#1575;…`) — decode with `html.unescape`.
- **Group Task 1 (main pages SEO) is DONE** — 6 main pages got title/description/robots/canonical/OG/JSON-LD. Revert ref: commit `6dd5282`.
- **Group Task 4 is DONE (2 pages, restructured)** — `waterproofing-thermal-insulation.html` is the HUB (3 category cards; all navbar links land here) and `waterproofing-thermal-insulation-system.html` is the combined-system detail page (the docx content). Do NOT re-merge them.
- **Group Task 7 (خدمات التدعيم, 7 pages) is DONE**, **Group Task 2 (العزل المائي, 8 pages) is DONE**, and **Group Task 5 (دهانات الإيبوكسي, 8 pages) is DONE** — full content+SEO per docx, FAQ accordions, corrected schemas, all folder images used. Remaining: Groups 3, 6, 8.
- **Banners:** every service page's breadcrumb background comes from `assets/my-images/banners/` — files renamed to English page slugs (`structural-strengthening.png`, `waterproofing-thermal-insulation.png`, `waterproofing-insulation.png` + `-2` for detail pages, `epoxy-flooring-coating.png` for all 8 Group 5 pages). Still Arabic-named/unassigned: `حقن وإصلاح الخرسانة.png` (Group 6), `ab-co-ce-pr.png` (about/contact/certificates/products?). No banner exists yet for Group 3 (thermal) — ask user.
- ⚠️ **Everything after the pilot is UNCOMMITTED** on top of `c39ae73` — commit per group before continuing.
- **5 leftover files still need deleting** (after re-pointing links): `p-attach-1.html`, `p-attach-3.html`, `p-iso-2.html`, `p-iso-4.html`, `product-rain.html` — see the cleanup table.
- **bug-report.md** (repo root) lists 92 pre-existing bugs: broken links (incl. typo `p-attacg-2.html` → should be `bitumen-primer-base.html`), 26 empty meta descriptions, 36 missing canonicals. The SEO passes fix most of these.
- **Site preview:** static files — just open the `.html` in a browser, no build step. `embed-components.js` injects the shared header/footer from `components/`.

**Workflow per group (agreed with the user):**
1. Read ALL the group's Word files first (extract text before touching HTML).
2. Per page: content pass (text exactly per docx → insert all images from its folder → arrange sections) → SEO pass → verify in browser (rendering, image paths, links).
3. Check the page's ☐ boxes in the group table.
4. Group finished → Timeline row + History entry + git commit + Revert Ability row with the pre-change hash.

**Open questions (ask the user if still unanswered):**
1. Is `الصفحات ال4 للخدمات.docx` the content for `our-services.html` (Group 8), or something else? Read it first.
2. "Images Gallery" in the original nav plan — same as `projects.html` or a new page?
3. Which group to start next (Group 4 pilot is done; default assumption: Group 2, in order).
4. `polyurea-spray-waterproofing.html` has no Arabic title in the Excel — confirm with user.

---

## Group Tasks

# Notes --------
* the my-images folder has been all updated all the stuff in it updated

* we changed all services pages names so i will give u the old and new page name so u know what u work with

*

*

*

*

*
----------------

### Brief :
we gonna rebuild this web not complitly but a lot in it 
add SEO in all pages 
add new content to all services a pages
add alts for image in all pages after we add the new images

### Per-Page Workflow (applies to EVERY service page)

Each service page gets these two passes — a page isn't "Done" until both are finished:

**1. Content pass**
- [ ] Edit text — replace old text with the new content from the page's docx in `updates/`
- [ ] Add images — insert the new images from `my-images` (with alt text from `Alt.docx`)
- [ ] Arrange the page — reorder/restructure sections to fit the new content

**2. SEO pass**
- [ ] Meta title + meta description (no empty `content=""`)
- [ ] Canonical tag (`<link rel="canonical">`)
- [ ] Open Graph / social tags
- [ ] Headings structure (one H1, logical H2/H3)
- [ ] Image alts on all images
- [ ] Internal links point to final page names (no old/typo'd slugs)

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
│   └── 6. structural-strengthening.html (خدمات التدعيم) ← was service-support.html
│       ├── concrete-jacketing.html (التدعيم بالقمصان الخرسانية)
│       ├── carbon-fiber-strengthening.html (التدعيم بالكربون فايبر)
│       ├── steel-jacketing.html (التدعيم بقطاعات الحديد)
│       ├── soil-injection.html (حقن التربة)
│       ├── shotcrete.html (الخرسانة المقذوفة)
│       └── excavation-shoring.html (سند جوانب الحفر)
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

**⚠️ Leftover cleanup (files still in repo that the Excel marks as Delete):**

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

**Remaining open points:**
1. Delete the 5 leftover duplicate files (see cleanup table above) after re-pointing links.
2. "Images Gallery" from the nav mind map — is that `projects.html`, or a separate page still to create?
3. Old-name internal links inside pages (e.g. `p-attacg-2.html` typo links from bug-report.md) need a full scan-and-fix pass against this table.

### Group Task 1 — Main Pages SEO Meta Tags & Structured Data

## Notes:
This task applies to these pages:
- `/index.html`
- `/about-us.html`
- `/certificates.html`
- `/projects.html` (was `gallery.html`)
- `/blogs.html`
- `/contact-us.html` (was `contact.html`)

- [x] Task 1.1 — Add the provided SEO `<title>` tag to each main page using the supplied metadata document. *(source: `updates/الصفحات الرئيسية.docx`)*
- [x] Task 1.2 — Add the provided `<meta name="description">` tag to each page.
- [x] Task 1.3 — Add `<meta name="robots" content="index, follow">` to every main page.
- [x] Task 1.4 — Add the correct canonical URL (`<link rel="canonical">`) for each page.
- [x] Task 1.5 — Add complete Open Graph metadata for every page:
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:type`
  - `og:locale`
- [x] Task 1.6 — Ensure every page has unique SEO metadata (no duplicated titles or descriptions).
- [x] Task 1.7 — Validate title length (≈50–60 characters) and meta description length (≈140–160 characters) without changing the provided copy unless necessary for SEO limits. *(descriptions 142–160 chars; titles 51–58 chars except index.html at 68 chars — kept as supplied verbatim, flagged for optional trim)*
- [x] Task 1.8 — Add the shared LocalBusiness JSON-LD Schema to every page immediately before the closing `</head>` tag.
- [x] Task 1.9 — Validate the JSON-LD schema for valid JSON syntax and Schema.org compliance.
- [x] Task 1.10 — Verify all canonical URLs, Open Graph URLs, and page URLs match the final website routing exactly. *(used current filenames `projects.html` / `contact-us.html`, not the doc's old `gallery.html` / `contact.html`)*
- [x] Task 1.11 — Preserve existing CSS, JavaScript, layout, functionality, and page performance while applying the SEO changes.
- [x] Task 1.12 — Ensure all pages remain W3C-valid with no duplicate meta tags or structured data after implementation. *(verified: no duplicate title/description/robots/canonical/og:title/JSON-LD tags in any of the 6 files)*

> **Service page groups (2–8):** one group per service category. For every page in a group: **do exactly what its Word file says for the content** (no inventing/changing text), and **use ALL the images in its image folder**. Both passes from the Per-Page Workflow apply (Content ➜ SEO). A page is done only when both boxes are checked.
>
> Image folders live under `assets/my-images/our-services/` and are named with the OLD slugs — the "Pages Names change" table maps them to the final pages. Most images exist as `.png` + `.webp` (use webp, png as fallback).

### Group Task 2 — العزل المائي (Waterproofing) — 8 pages
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

### Group Task 3 — العزل الحراري (Thermal Insulation) — 5 pages
Word files: `updates/عزل حراري/` · Images: `assets/my-images/our-services/Waterheat-insulation/s-heat/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| thermal-insulation.html (main) | الصفحات الرئيسية.docx | s-heat/ (top-level 1–4) | ☐ | ☐ |
| perlite-thermal-insulation.html | عزل البيرلايت.docx | s-heat/s-heat-1/ | ☐ | ☐ |
| polystyrene-board-thermal-insulation.html | عزل البوليسترين.docx | s-heat/s-heat-2/ | ☐ | ☐ |
| polyurethane-board-thermal-insulation.html | عزل البولي يوريثان.docx | s-heat/s-heat-3/ | ☐ | ☐ |
| rockwool-board-thermal-insulation.html | العزل بألواح الصوف الصخري.docx | s-heat/s-heat-4/ | ☐ | ☐ |

### Group Task 4 — العزل المائي والحراري (Waterproofing + Thermal) — 2 pages
Word files: `updates/العزل المائي والحراري/` · Images: `assets/my-images/our-services/Waterheat-insulation/s-heatwater/` (detail) + `Waterheat-insulation/11.png, 22.png, 33.jpg` (hub cards)

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| waterproofing-thermal-insulation.html (HUB) | — (hub, 3 category cards) | 11.png / 22.png / 33.jpg | ✅ | ✅ |
| waterproofing-thermal-insulation-system.html (detail) | العزل المائي والحراري.docx | s-heatwater/ | ✅ | ✅ |

> ⚠️ **Restructure 2026-07-09:** the "merged" assumption was wrong — the user confirmed the section needs a HUB (3 categories: العزل المائي / العزل الحراري / المدمج) + the combined-system detail page. The pilot detail content was moved to `waterproofing-thermal-insulation-system.html` (canonical/OG/schema URLs updated, breadcrumb gained the hub level), and `waterproofing-thermal-insulation.html` was rebuilt as the hub card-grid (all navbar/footer links land there unchanged). Sidebar third links in `waterproofing-insulation.html` / `thermal-insulation.html` repointed to the system page.

**Done 2026-07-09 (used as the sample/pilot page for the per-page workflow):**
- Content: full docx content (intro, definition, 6 benefits, 4 requirement sub-sections, comparison table, applications, why-us, 5 FAQs, contact CTA), built on the site's existing detail-page template (2-col layout + shared `main.css` classes: `.section-heading`, `.section-img`, `.features-grid`/`.feature-card`, `.check-list`, `.info-box`, `.note-box`, `.cta-whatsapp`, `.sidebar-card`/`.sidebar-nav-list`). Comparison table uses Bootstrap `.table`, FAQ uses Bootstrap accordion — both already loaded, no new CSS/JS added.
- All 4 images from `s-heatwater/` used (webp+png `<picture>` fallback where both exist). 3 alts from `Alt.docx`; 1 (image 4) has no doc alt — authored in matching style, flagged.
- SEO: title/description/robots/canonical/OG/twitter + Service+FAQPage+BreadcrumbList JSON-LD from the docx, with URLs corrected to the final filename (`waterproofing-thermal-insulation.html`) instead of the doc's old slugs (`services-waterheat.html` / `service-Waterheat-insulation.html`).
- Bug fix: `waterproofing-insulation.html` and `thermal-insulation.html` sidebars linked to a nonexistent `water-thermal-insulation-system.html` — repointed both to `waterproofing-thermal-insulation.html`.
- Verified in browser: layout, images, comparison table, FAQ accordion, links all render correctly.

### Group Task 5 — دهانات الإيبوكسي (Epoxy Coatings) — 8 pages
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

### Group Task 6 — إصلاح الخرسانة (Concrete Injection & Repair) — 4 pages
Word files: `updates/إصلاح الخرسانة/` · Images: `assets/my-images/our-services/service-injection/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| concrete-repair-injection.html (main) | الصفحات الرئيسية.docx | service-injection/ (top-level 1–3) | ☐ | ☐ |
| concrete-repair-structural-materials.html | إصلاح بالمواد الإنشائية.docx | service-injection/s-injection-1/ | ☐ | ☐ |
| polyurethane-injection-concrete-leak-stopping.html | حقن البولي يوريثان.docx | service-injection/s-injection-2/ | ☐ | ☐ |
| epoxy-injection-concrete-repair.html | حقن ايبوكسي.docx | service-injection/s-injection-3/ | ☐ | ☐ |

### Group Task 7 — خدمات التدعيم (Structural Support) — 7 pages
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

### Group Task 8 — Services hub page — 1 page
Word files: `updates/الصفحات ال4 للخدمات.docx` (to confirm what it covers) · Images: `assets/my-images/our-services/all-services/`

| Page | Word file | Image folder | Content | SEO |
|---|---|---|---|---|
| our-services.html | الصفحات ال4 للخدمات.docx? | all-services/ | ☐ | ☐ |

---

## Timeline

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

---

## History

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
- Each page: replaced `<title>` + `<meta name="description">` with the supplied copy, added `<meta name="robots" content="index, follow">`, added `<link rel="canonical">`, added full Open Graph block (`og:title`, `og:description`, `og:url`, `og:type`, `og:locale`), added the shared `LocalBusiness` JSON-LD schema before `</head>`.
- Canonical/OG URLs use the current final filenames (`projects.html`, `contact-us.html`), not the doc's old names (`gallery.html`, `contact.html`).
- Existing `<meta name="keywords">`, CSS, JS, and GTM/gtag scripts left untouched.
- Validated: no duplicate title/description/robots/canonical/og:title/JSON-LD tags per page; all 6 JSON-LD blocks parse as valid JSON; descriptions 142–160 chars; titles 51–58 chars except `index.html` (68 chars, kept verbatim per supplied copy).

### 2026-07-09 — Group Task 4: waterproofing-thermal-insulation.html (sample/pilot page)
- Rebuilt from a bare 3-card stub into a full detail page using the docx content exactly (`updates/العزل المائي والحراري/العزل المائي والحراري.docx`): intro, "what is it" section, 6 benefits, 4 requirement sub-sections, comparison table vs. traditional systems, applications list, "why us", 5 FAQs, contact CTA.
- Used all 4 images in `assets/my-images/our-services/Waterheat-insulation/s-heatwater/` with `<picture>` webp+png fallback; 3 alts from `Alt.docx`, 1 authored to match style (no doc alt existed for image 4).
- Full SEO head: title/description/robots/canonical/OG/twitter tags + combined Service/FAQPage/BreadcrumbList JSON-LD from the docx, with schema URLs corrected to the final filename instead of the doc's old slugs (`services-waterheat.html`, `service-Waterheat-insulation.html`).
- Reused the site's existing detail-page template and shared CSS classes from `main.css` (`.section-heading`, `.section-img`, `.features-grid`/`.feature-card`, `.check-list`, `.info-box`, `.note-box`, `.cta-whatsapp`, `.sidebar-card`/`.sidebar-nav-list`) — no new CSS added. Comparison table and FAQ accordion use Bootstrap classes already loaded on the site.
- Sidebar nav widget lists the 3 sibling category pages (العزل المائي / العزل الحراري / العزل المائي والحراري) with this page marked active.
- Bug fix: found and fixed a dead link in `waterproofing-insulation.html` and `thermal-insulation.html` — both sidebars pointed to a nonexistent `water-thermal-insulation-system.html`; repointed to `waterproofing-thermal-insulation.html`.
- Verified by opening the page in a browser: layout, both images, comparison table, FAQ accordion (Bootstrap collapse), and all links confirmed working.
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
- 7 detail pages rebuilt with full docx content: car-parks (4 steps), cold-storage (4 steps, HACCP FAQ), wastewater (3 steps), potable-water (4 steps incl. water-fill test, 6 FAQs — body listed a 5th FAQ not in the docx's FAQPage schema, added to both accordion and JSON-LD), food-processing (5 steps incl. coved-skirting corners), anti-static/ESD (7 steps incl. copper-grid + conductive-epoxy + resistance-test), mortar/screed (4 steps). Each got FAQ accordion, docx meta/OG/twitter, and Service(+OfferCatalog)/FAQPage/BreadcrumbList JSON-LD with URLs corrected from `s-epoxy-N.html`/`service-epoxy.html` to final filenames.
- All folder images used and verified 1:1 against disk: 3+3+4+4+5+4+3 = 26 images across the 7 folders. Two images (food-processing #5, anti-static #4) have no `.webp` pair — used plain `<img>` instead of `<picture>` for those; caught and fixed a leftover `<source>` reference to a nonexistent `s-epoxy-6/4.webp` during verification.
- Banner: `banners/eboxy.png` renamed → `banners/epoxy-flooring-coating.png` (git mv), applied to all 8 pages.
- Verified: PowerShell script checked JSON-LD validity, H1/title counts, image + webp path existence, and per-folder image usage across all 8 pages — all passed after the one webp fix.

---

## Revert Ability

Each entry below is a checkpoint to roll back to if a task needs to be undone. Record the git commit (or file backup) right after finishing a task, before starting the next one.

| Date | Task | Files touched | Revert reference | Notes |
|---|---|---|---|---|
| 2026-07-09 | Set up the-rebuild.md | the-rebuild.md | n/a | Initial doc, nothing to revert |
| 2026-07-09 | Group Task 1 — SEO meta tags | index.html, about-us.html, certificates.html, projects.html, blogs.html, contact-us.html | `6dd5282` (commit before this change) | `git checkout 6dd5282 -- <file>` restores the pre-SEO head for any of the 6 files |
| 2026-07-09 | Group Task 4 — waterproofing-thermal-insulation.html (content + SEO) | waterproofing-thermal-insulation.html, waterproofing-insulation.html, thermal-insulation.html | `c39ae73` (commit before this change) | `git checkout c39ae73 -- <file>` restores the pre-rebuild version of any of the 3 files |
| 2026-07-09 | Group Task 7 — خدمات التدعيم (7 pages + banner rename) | structural-strengthening.html + 6 detail pages, banners/structural-strengthening.png | `c39ae73` (still uncommitted) | ⚠️ All work after the pilot is uncommitted on top of `c39ae73` — commit per group to create real checkpoints |
| 2026-07-09 | Group 4 restructure — hub/system split | waterproofing-thermal-insulation.html (hub), waterproofing-thermal-insulation-system.html (NEW), waterproofing-insulation.html, thermal-insulation.html, banners/waterproofing-thermal-insulation.png | `c39ae73` (still uncommitted) | The -system.html file is new; deleting it + restoring the other 3 from `c39ae73` undoes the split |
| 2026-07-10 | Group Task 2 — العزل المائي (8 pages + 2 banner renames) | waterproofing-insulation.html + 7 detail pages, banners/waterproofing-insulation.png, banners/waterproofing-insulation-2.png | `c39ae73` (still uncommitted) | Same base — commit recommended before starting Group 3 |
| 2026-07-11 | Group Task 5 — دهانات الإيبوكسي (8 pages + banner rename) | epoxy-flooring-coating.html + 7 detail pages, banners/epoxy-flooring-coating.png | `c39ae73` (still uncommitted) | Same base — commit recommended before starting Group 3/6/8 |

**How to revert a task:**
1. Find the task's row in the Revert Ability table.
2. Check the "Revert reference" (git commit hash before the change, or backup file path).
3. Restore from that reference, then update this file to note the revert in History.
