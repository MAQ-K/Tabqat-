# 🚀 GitHub Team Workflow (HTML / CSS / JS)

## 📌 First Time Setup (One Time Only)

### 1. Clone the project

```bash
git clone https://github.com/MAQ-K/Tabqat-.git
```

### 2. Open the project

```bash
cd Tabqat-
code .
```

---

# 📅 Daily Workflow

## ✅ Step 1 — Get the latest version

**Always do this before starting work.**

```bash
git pull origin main
```

---

## ✅ Step 2 — Make your changes

* Edit HTML
* Edit CSS
* Edit JavaScript
* Add images
* Save all files

---

## ✅ Step 3 — Stage your changes

```bash
git add .
```

---

## ✅ Step 4 — Commit your work

Use a meaningful message.

```bash
git commit -m "Describe your changes"
```

Examples:

```text
Add hero section
Fix mobile navbar
Update services section
Improve responsive layout
```

---

## ✅ Step 5 — Upload to GitHub

```bash
git push origin main
```

---

# 🔄 If Push Is Rejected

Someone else has pushed changes before you.

Run:

```bash
git pull origin main
```

If Git merges automatically:

```bash
git push origin main
```

If there are merge conflicts:

1. Resolve the conflicts.
2. Save the files.
3. Run:

```bash
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

---

# 📌 Team Rules

### ✅ Always pull before you start.

```bash
git pull origin main
```

### ✅ Push your work as soon as you finish a task.

Don't wait until the end of the day.

### ✅ Use meaningful commit messages.

Good:

* Add homepage slider
* Fix footer responsive
* Update contact page

Bad:

* update
* fix
* m

### ✅ Avoid editing the same file at the same time.

Example:

* Developer A → `index.html`
* Developer B → `about.html`
* Developer C → `contact.html`

If two people edit the same file, Git may create a merge conflict.

### ✅ Never use:

```bash
git push --force
```

unless the team has agreed to overwrite the remote repository.

---

# 📂 Suggested Team File Organization

```
css/
├── header.css
├── hero.css
├── about.css
├── services.css
├── products.css
├── footer.css
└── responsive.css
```

```
js/
├── main.js
├── navbar.js
├── slider.js
├── animation.js
└── contact.js
```

Assign different files to different developers whenever possible.

---

# ⚡ Daily Checklist

```
☐ git pull origin main

☐ Make changes

☐ Test locally

☐ git add .

☐ git commit -m "Describe your changes"

☐ git push origin main
```

Following this workflow consistently helps prevent lost work and reduces merge conflicts.
