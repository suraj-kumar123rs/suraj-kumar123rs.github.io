# Suraj Kumar — Portfolio

Designed & built by **Suraj Kumar** · surajkumar805122@gmail.com

Plain HTML + CSS + JavaScript. No React, no npm, no build step.

## Files

```
index.html   → saara content (text, projects, links)
style.css    → design, colors, animations
main.js      → particle background, typing effect, counters, filters
assets/      → profile.jpg + dono resume PDFs
```

## Local pe dekhna

`index.html` pe double-click karo. Browser me khul jayega.

## GitHub Pages pe live karna

1. GitHub pe naya repo banao, naam exactly: **`suraj-kumar123rs.github.io`** (Public)
2. Is folder ki saari files us repo me push karo (VS Code se, jaise Tunora me kiya tha):
   ```
   git init
   git add .
   git commit -m "portfolio v1"
   git branch -M main
   git remote add origin https://github.com/suraj-kumar123rs/suraj-kumar123rs.github.io.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save
4. 1–2 minute baad site live: **https://suraj-kumar123rs.github.io**

Yahi link resume aur LinkedIn me daal do.

## Baad me kuch badalna ho to

- **Naya project:** `index.html` me ek `<article class="project ...">` block copy karke text badlo.
  `data-cat="ml"` = AI/ML filter, `data-cat="web"` = Full-Stack filter.
- **Resume update:** `assets/` me same naam se nayi PDF replace kar do.
- **Photo:** `assets/profile.jpg` replace karo (square image).
- **Colors:** `style.css` ke top pe `--cyan`, `--violet`, `--pink` badlo.
- **Typing wale roles:** `main.js` me `const roles = [...]`.

Change ke baad `git add . && git commit -m "update" && git push`. Site apne aap update ho jayegi.
