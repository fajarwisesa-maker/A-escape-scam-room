# 🛡️ Cyber Escape: Perangkap Digital

> **A digital security education game for Indonesian students (SMP/SMA)**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-escape--scam--room.vercel.app-6c63ff?style=for-the-badge)](https://escape-scam-room.vercel.app)

---

## 📖 Overview

**Cyber Escape: Perangkap Digital** is an interactive browser-based game that teaches students how to recognize and avoid common digital scams. Players are placed in realistic everyday scenarios — receiving suspicious WhatsApp messages, Instagram DMs, and fake friend emergencies — and must make decisions that protect their digital safety.

The game is built as a **single-file HTML application** with no external dependencies, making it lightweight, fast, and easy to deploy anywhere.

---

## 🎮 Gameplay

Players go through **simulation cases** that mirror real-life cyber threats. Each case:

1. **Shows a notification** — simulating a real app alert (WhatsApp / Instagram)
2. **Opens a realistic app window** — with authentic-looking chat UI
3. **Shows your inner monologue** — visual novel-style thought bubbles
4. **Presents 4 choices** — ranging from safe ✅ to fatal 🔴
5. **Reveals the consequence** — and teaches why the choice was safe or dangerous

---

## 🗂️ Cases

| # | Title | Platform | Threat Type |
|---|-------|----------|-------------|
| 1 | 📱 **Undangan APK Palsu** *(Fake Wedding APK)* | WhatsApp | Malware / APK Scam |
| 2 | 🎮 **Diamond Game Gratis** *(Free Game Diamonds)* | Instagram | Phishing / Fake Giveaway |
| 3 | 💬 **Akun Teman Dibajak** *(Friend's Hijacked Account)* | WhatsApp | Social Engineering |
| 4 | 🔒 *Coming Soon* | — | — |
| 5 | 🔒 *Coming Soon* | — | — |

---

## 🏆 Achievement System

Players can unlock badges by making the right decisions:

| Badge | How to Unlock |
|-------|--------------|
| 🛡️ APK Blocker | Reject a dangerous APK file from a stranger |
| 🔍 URL Detective | Investigate a phishing link before logging in |
| 🗡️ Social Engineering Slayer | Defeat a social engineering attempt |
| 🤖 Bot Hunter | Identify a fake account or bot |
| 🔐 2FA Guardian | Understand the importance of two-factor authentication |
| 🏅 Digital Defender | Complete all available cases |

---

## 📊 Rank System

Total score across all cases determines your rank:

| Score | Rank |
|-------|------|
| 0–119 | 🌱 Pemula Digital *(Digital Rookie)* |
| 120–199 | 👁️ Waspada Digital *(Digital Alert)* |
| 200–279 | 🛡️ Cyber Defender |
| 280+ | 🏆 Scam Investigator |

---

## ✨ Features

- **🌐 Bilingual** — Full Indonesian & English support
- **📱 Realistic UI** — WhatsApp and Instagram simulations
- **🎭 Visual Novel** — Story-driven dialogue system
- **📚 Education Cards** — Learn red flags, safe tips, and key terms after each case
- **🏆 Achievements** — Unlock badges for smart decisions
- **💾 Progress Save** — Auto-saved in browser via `localStorage`
- **🔊 Sound Toggle** — Subtle audio feedback
- **✨ Reduced Motion** — Accessibility setting for animation
- **📱 Responsive** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Structure & semantic markup |
| **Vanilla CSS** | Glassmorphism UI, animations, responsive layout |
| **Vanilla JavaScript** | Game engine, state management, save system |
| **localStorage** | Client-side progress persistence |

> No frameworks. No dependencies. Single `index.html` file (~172KB).

---

## 🚀 Getting Started

### Play Online
Visit: **[https://escape-scam-room.vercel.app](https://escape-scam-room.vercel.app)**

### Run Locally
```bash
# Clone the repository
git clone https://github.com/fajarwisesa-maker/A-escape-scam-room.git

# Open the file in your browser
open index.html
```
No build step or server required — just open the HTML file!

---

## 🎯 Target Audience

Indonesian middle and high school students (**SMP/SMA**) who actively use:
- Chat apps (WhatsApp)
- Social media (Instagram)
- Mobile games
- Browsers

---

## 🔐 Privacy

All progress is saved **locally in your browser** via `localStorage`. No data is sent to any server.

---

## 📚 Concepts Taught

- **APK** — Android app files and why they should only come from official sources
- **Phishing** — Fake websites designed to steal login credentials
- **Social Engineering** — Manipulation through trust and urgency
- **OTP** — One-time codes and why they should never be shared
- **2FA** — Two-factor authentication as a key security layer
- **Domain Spoofing** — How fake URLs mimic real ones
- **Malware** — How malicious apps silently steal data

---

## 🇮🇩 Made For

> *Dibuat untuk edukasi keamanan digital pelajar Indonesia* 🇮🇩  
> *Built for Indonesian student cybersecurity education*

---

## 🤝 Contributing

Want to add a new case, achievement, or UI improvement?  
Read the full **[CONTRIBUTING.md](./CONTRIBUTING.md)** — it covers:

- How to add a new case (with full template)
- How to add achievements and ranks
- How to edit bilingual UI strings
- Git workflow + deploy steps
- Team rules and testing checklist

---

## 📄 License

This project is open source and free to use for educational purposes.
