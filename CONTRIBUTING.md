# 🤝 Contributing Guide — Cyber Escape: Perangkap Digital

Welcome to the team! This guide explains everything you need to know to safely add or upgrade content in this project.

> **Key fact:** The entire game lives in a single file — [`index.html`](./index.html).  
> All CSS, HTML, and JavaScript are in that one file. No build step, no bundler.

---

## 📁 File Structure

```
index.html          ← The entire game (CSS + HTML + JS, ~2650 lines)
README.md           ← Project overview
CONTRIBUTING.md     ← This file
.gitignore
.vercel/            ← Vercel deployment config (don't touch)
```

---

## 🗺️ Code Map (inside `index.html`)

| Section | Lines (approx.) | What's inside |
|---------|----------------|---------------|
| CSS Styles | `8 – 917` | All visual styling, animations, responsive layout |
| HTML Body | `919 – 1197` | Screen layouts, overlays, app windows |
| JS: Bilingual System | `~1203` | `T()` helper function for bilingual text |
| JS: Save Manager | `~1212` | `localStorage` save/load/reset logic |
| JS: Achievements | `~1281` | `ACHIEVEMENTS` array |
| JS: Ranks | `~1291` | `RANKS` array |
| JS: UI Strings | `~1304` | `UI` object — all translated interface text |
| JS: Term Definitions | `~1405` | `TERM_DEFS` — glossary shown in education cards |
| **JS: Game Data** | `~1422 – 1734` | **`GAME_DATA.cases[]` — all cases live here** |
| JS: Game State | `~1736` | `state` object — current screen/phase tracking |
| JS: Sound Effects | `~1744` | Web Audio API sound functions |
| JS: Game Engine | `~1800+` | All game logic, UI rendering, navigation |

---

## ➕ How to Add a New Case

Cases are stored in the `GAME_DATA.cases` array starting at around **line 1423**.  
Each case follows this exact structure:

```js
{
  id: 'case6',           // Unique ID (string, no spaces)
  comingSoon: false,     // true = locked preview card, false = playable
  title: { id: 'Judul Kasus', en: 'Case Title' },
  description: { id: 'Deskripsi singkat.', en: 'Short description.' },
  icon: '🎣',            // Emoji shown on the case card
  appType: 'whatsapp',   // 'whatsapp' or 'instagram'

  // Notification popup that appears on the desktop
  notification: {
    icon: 'wa',          // 'wa' or 'ig'
    app: 'WhatsApp Web',
    title:  { id: '...', en: '...' },
    body:   { id: '...', en: '...' },
    time:   { id: 'Baru saja', en: 'Just now' },
  },

  // Chat messages shown in the app window
  appContent: {
    contactName: 'Nama Kontak',   // WhatsApp only
    username: '@handle',          // Instagram only
    messages: [
      // Text bubble
      { type: 'incoming', text: { id: '...', en: '...' }, time: '10:00' },
      // Text bubble with a clickable link
      { type: 'incoming', text: { id: 'Klik: ', en: 'Click: ' }, link: 'scam-site.com' },
      // File attachment bubble (WhatsApp)
      { type: 'incoming', text: { id: '...', en: '...' },
        attachment: { name: 'file.apk', size: '4.2 MB', icon: '📄' }, time: '10:01' },
      // Timestamp separator
      { type: 'time', text: { id: 'Hari ini, 10:00', en: 'Today, 10:00 AM' } },
    ],
  },

  // Inner monologue — 2–4 sentences shown before the choice
  slides: {
    id: [ 'Kalimat 1...', 'Kalimat 2...', 'Kalimat 3...' ],
    en: [ 'Sentence 1...', 'Sentence 2...', 'Sentence 3...' ],
  },

  // Exactly 4 choices: safe → cautious → risky → fatal
  choices: [
    {
      id: 'c6_safe',
      risk: 'safe',          // 'safe' | 'cautious' | 'risky' | 'fatal'
      score: 100,            // safe=100, cautious=60, risky=30, fatal=-100
      achievement: 'apk_blocker',  // achievement ID to unlock, or null
      effect: 'caseClosed',  // 'caseClosed' | 'nearMiss' | 'glitch'
      label: { id: '...', en: '...' },
      resultSlides: { id: ['...'], en: ['...'] },

      // Only for effect: 'caseClosed'
      caseClosedText: { id: '...', en: '...' },

      // Only for effect: 'nearMiss'
      nearmissText: { id: '...', en: '...' },

      // Only for effect: 'glitch' (the hacked screen)
      hackedDetails: {
        title: { id: '...', en: '...' },
        items: [
          { icon: '💸', text: { id: '...', en: '...' } },
        ],
      },
      // OR set hackedDetails: null if not a glitch case

      education: {
        title:       { id: '...', en: '...' },
        explanation: { id: '...', en: '...' },
        redFlags: [ { id: '...', en: '...' } ],   // Array of flag items
        tips:     [ { id: '...', en: '...' } ],   // Array of safe tips
        whatToDo: { id: '...', en: '...' },
        quote:    { id: '"..."', en: '"..."' },    // optional
        terms: ['apk', 'phishing'],               // keys from TERM_DEFS
      },
    },
    // ... 3 more choices (cautious, risky, fatal)
  ],
},
```

### Case Checklist
- [ ] `id` is unique (e.g. `'case6'`)
- [ ] Exactly **4 choices** per case
- [ ] Choices ordered: `safe` → `cautious` → `risky` → `fatal`
- [ ] Every text field has both `id` (Indonesian) and `en` (English)
- [ ] `effect` matches: `caseClosed` only for safe/certain cautious, `glitch` for fatal
- [ ] `terms` array only uses keys defined in `TERM_DEFS`
- [ ] Update the **coming soon placeholder** if you're replacing one (set `comingSoon: false`)

---

## 🏅 How to Add a New Achievement

Find the `ACHIEVEMENTS` array (~line 1281) and add a new entry:

```js
{ 
  id: 'new_badge_id',        // Unique string ID
  icon: '🎯',                // Emoji
  title: { id: 'Nama Badge', en: 'Badge Name' },
  desc:  { id: 'Deskripsi singkat.', en: 'Short description.' }
},
```

Then reference it in a choice using `achievement: 'new_badge_id'`.

> ⚠️ Achievement IDs are stored in `localStorage` — once released, **never rename an existing ID** or players will lose progress.

---

## 🌐 How to Add / Change UI Text (Bilingual)

All interface strings live in the `UI` object (~line 1304).  
Every value is a bilingual object `{ id: '...', en: '...' }`.

To add a new UI string:
```js
// Inside the UI object:
myNewLabel: { id: 'Teks Indonesia', en: 'English Text' },
```

To use it in HTML rendering, call `T(UI.myNewLabel)`.

---

## 📚 How to Add a New Glossary Term

Find `TERM_DEFS` (~line 1405) and add a new entry:

```js
newterm: { 
  term: { id: 'Nama Istilah', en: 'Term Name' }, 
  desc: { id: 'Penjelasan singkat.', en: 'Brief explanation.' }
},
```

Then reference it in any case's `education.terms` array as `'newterm'`.

---

## 🏆 How to Add a New Rank

Find the `RANKS` array (~line 1291):

```js
{ min: 350, title: { id: 'Ahli Siber', en: 'Cyber Expert' }, icon: '⚡' },
```

Ranks are sorted by `min` score automatically. Add the new rank **in order**.

---

## 🎨 How to Modify the UI / Styling

All CSS is in the `<style>` block at the top of `index.html` (lines 8–917).

Key CSS variables to know (defined in `:root`):

| Variable | Purpose |
|----------|---------|
| `--accent` | Primary purple color `#6c63ff` |
| `--success` | Green for safe choices `#00e676` |
| `--danger` | Red for fatal choices `#ff1744` |
| `--warning` | Yellow for caution `#ffc107` |
| `--text-primary` | Main text color |
| `--text-secondary` | Dimmed/secondary text |
| `--font` | Global font stack |
| `--gradient-cyber` | Purple→cyan gradient |

> 💡 All colors use CSS variables — change them in `:root` to retheme globally.

---

## 🚀 Workflow: Make a Change & Deploy

```bash
# 1. Pull latest changes first
git pull

# 2. Make your edits to index.html

# 3. Test locally — just open index.html in a browser
#    (no server needed)

# 4. Stage and commit
git add index.html
git commit -m "feat: add case 6 - fake job offer"

# 5. Push to GitHub
git push

# 6. Deploy to Vercel production
vercel --prod
```

---

## ✅ Testing Checklist Before Pushing

- [ ] Open `index.html` in Chrome (and Firefox if possible)
- [ ] Play through the new case from start to finish — all 4 choices
- [ ] Check both 🇮🇩 Indonesian and 🇺🇸 English by toggling language in Settings
- [ ] Verify the achievement unlocks correctly (check in Achievements screen)
- [ ] Test on mobile screen size (resize browser or use DevTools device mode)
- [ ] Reset progress (Settings → Reset) and make sure the new case shows up clean
- [ ] Open browser console — make sure there are **no JavaScript errors**

---

## ⚠️ Rules for the Team

1. **Never rename existing `id` values** for cases, achievements, or save keys — players' localStorage will break.
2. **Always include both `id` and `en`** for every bilingual field.
3. **Exactly 4 choices per case** — the engine always expects `safe`, `cautious`, `risky`, `fatal`.
4. **Don't add external libraries** — the project intentionally has zero dependencies.
5. **Test locally before pushing** — the deploy is live immediately after `vercel --prod`.

---

## 💬 Questions?

Open an issue on [GitHub](https://github.com/fajarwisesa-maker/A-escape-scam-room/issues) or contact the project maintainer.
