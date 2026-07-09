# The Rebuild — Tabqat Website

This file is the working log for the Tabqat website rebuild. Every task gets logged here after it's done, tasks are organized into 4 groups, and there's a timeline + revert reference so any change can be traced and undone.

***each time we make and edit this file gets updated***

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
│   ├── 3. waterproofing-thermal-insulation.html (العزل المائي والحراري)
│   │       ← consolidated from service-Waterheat-insulation.html + services-waterheat.html
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
| service-Waterheat-insulation.html | waterproofing-thermal-insulation.html | العزل المائي والحراري | done (merged) |
| services-heat.html | thermal-insulation.html | العزل الحراري | done |
| services-water.html | waterproofing-insulation.html | العزل المائي | done |
| services-waterheat.html | waterproofing-thermal-insulation.html | العزل المائي والحراري | done (merged) |
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
- `/gallery.html`
- `/blogs.html`
- `/contact.html`

- [ ] Task 1.1 — Add the provided SEO `<title>` tag to each main page using the supplied metadata document.

- [ ] Task 1.2 — Add the provided `<meta name="description">` tag to each page.

- [ ] Task 1.3 — Add `<meta name="robots" content="index, follow">` to every main page.

- [ ] Task 1.4 — Add the correct canonical URL (`<link rel="canonical">`) for each page.

- [ ] Task 1.5 — Add complete Open Graph metadata for every page:
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:type`
  - `og:locale`

- [ ] Task 1.6 — Ensure every page has unique SEO metadata (no duplicated titles or descriptions).

- [ ] Task 1.7 — Validate title length (≈50–60 characters) and meta description length (≈140–160 characters) without changing the provided copy unless necessary for SEO limits.

- [ ] Task 1.8 — Add the shared LocalBusiness JSON-LD Schema to every page immediately before the closing `</head>` tag.

- [ ] Task 1.9 — Validate the JSON-LD schema for valid JSON syntax and Schema.org compliance.

- [ ] Task 1.10 — Verify all canonical URLs, Open Graph URLs, and page URLs match the final website routing exactly.

- [ ] Task 1.11 — Preserve existing CSS, JavaScript, layout, functionality, and page performance while applying the SEO changes.

- [ ] Task 1.12 — Ensure all pages remain W3C-valid with no duplicate meta tags or structured data after implementation.

### Group Task 2 — (name this group)
- [ ] Task 2.1 —
- [ ] Task 2.2 —

### Group Task 3 — (name this group)
- [ ] Task 3.1 —
- [ ] Task 3.2 —

### Group Task 4 — (name this group)
- [ ] Task 4.1 —
- [ ] Task 4.2 —

---

## Timeline

| Date | Group | Task | Status |
|---|---|---|---|
| 2026-07-09 | — | Set up the-rebuild.md structure | ✅ Done |
| 2026-07-09 | — | Services mind map + old→new page names table (from Excel) | ✅ Done |
| 2026-07-09 | — | Defined per-page workflow (content pass + SEO pass) | ✅ Done |

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

---

## Revert Ability

Each entry below is a checkpoint to roll back to if a task needs to be undone. Record the git commit (or file backup) right after finishing a task, before starting the next one.

| Date | Task | Files touched | Revert reference | Notes |
|---|---|---|---|---|
| 2026-07-09 | Set up the-rebuild.md | the-rebuild.md | n/a | Initial doc, nothing to revert |

**How to revert a task:**
1. Find the task's row in the Revert Ability table.
2. Check the "Revert reference" (git commit hash before the change, or backup file path).
3. Restore from that reference, then update this file to note the revert in History.
