# 💌 Love Memories Web

<p align="center">
  <a href="https://github.com/hrlucas/hr-love-memories-web">
    <img src="https://img.shields.io/badge/GitHub-hr--love--memories--web-181717?style=for-the-badge&logo=github" alt="Repository GitHub">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn Lucas Hochmann Rosa">
  </a>
  <a href="https://hrlucas.github.io/hr-love-memories-web/">
    <img src="https://img.shields.io/badge/Page-Web-ff69b4?style=for-the-badge" alt="Web Page">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge" alt="MIT License">
  </a>
</p>

<p align="center"><a href="README.md">🇧🇷 Português</a> · 🇺🇸 English</p>

> Romantic experience I created for Maria Paula Rossetti Siqueira, built as a static website using HTML, CSS/SCSS, and vanilla JavaScript, featuring a nighttime aesthetic, a chapter-based narrative, and a floral opening animation.

---

## 📌 Overview

**Love Memories Web** was built as an interactive digital gift, focused on performance, simple maintenance and a fully static setup.

Main flow:

- Entry screen with a romantic phrase and a **Start** button.
- Local song starts at second 23 after the user's first interaction.
- The full experience is revealed as a single page.
- A fixed player at the top controls the same audio instance throughout.

---

## ✨ Key Features

- Floral opening built directly into the main hero section on the index page.
- Anchor navigation (`Home`, `Story`, `Gallery`, `Time`, `Letter`, `Meteors`).
- Dynamic timeline driven by JSON data.
- Local gallery with 45 images and a responsive layout.
- Real-time relationship duration counter.
- Closing letter with an envelope-opening animation.
- Meteor section with animated phrases and images.
- Music player with `play/pause`, `volume +` and `volume -`.

---

## 🧭 Table of Contents

- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Ground Rules](#-project-ground-rules)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Static Publishing (GitHub Pages)](#-static-publishing-github-pages)
- [Disclaimer](#-disclaimer)
- [Author](#-author)
- [License](#-license)

---

## 🏗️ Architecture

```text
love-memories-web/
├── index.html
├── assets/
│   ├── audio/
│   │   └── Di Paullo e Paulino - No céu dos braços teus.mp3
│   ├── css/
│   │   ├── main.css                # Compiled from assets/scss/main.scss
│   │   ├── sections.css            # Plain CSS, hand-maintained
│   │   ├── animations.css          # Plain CSS, hand-maintained
│   │   └── responsive.css          # Plain CSS, hand-maintained
│   ├── scss/
│   │   └── main.scss               # The project's only real Sass source
│   ├── data/
│   │   ├── timeline.json
│   │   ├── gallery.json
│   │   └── letter.json
│   ├── img/
│   │   ├── flowers.png
│   │   ├── decorative/
│   │   └── gallery/
│   │       └── provas-do-meu-amor/
│   └── js/
│       ├── main.js
│       ├── intro.js
│       ├── timeline.js
│       ├── gallery.js
│       ├── counter.js
│       ├── effects.js
│       └── meteor.js
├── LICENSE
└── README.md
```

### Organization

- **`index.html`** → single structure holding every section of the experience
- **`assets/js/`** → one module per section (`window.MemoriesX.init()`), orchestrated by `main.js`
- **`assets/data/`** → dynamic content (timeline, gallery, letter) consumed via `fetch`, with a local fallback if it fails
- **`assets/scss/main.scss`** → the only real Sass source; the remaining files in `assets/css/` are plain CSS, written and maintained directly (no Sass source)

---

## 🧰 Tech Stack

- Semantic HTML5
- CSS3 + Sass (`main.scss`, compiled locally - e.g. with VS Code's "Live Sass Compile" extension or `npx sass`)
- Vanilla JavaScript (no framework, no build step)
- Local JSON for dynamic content

---

## 📐 Project Ground Rules

- Identifiers, classes, IDs, JSON keys, and function names stay in English.
- All visible text (titles, buttons, letter paragraphs, captions) stays in Portuguese: it's the experience itself, written for one specific person.
- Code comments, where present, stay in Portuguese and are reserved for non-obvious decisions.
- No build step is required to run the site - only the Sass needs manual compilation when editing `main.scss`.

---

## ⚙️ Requirements

- Any static HTTP server for local development (e.g. `npx serve`)
- Node.js only if recompiling `assets/scss/main.scss` (via `npx sass`)

---

## 🔧 Installation

```bash
git clone https://github.com/hrlucas/hr-love-memories-web.git
cd hr-love-memories-web
npx serve .
```

Open:

- `http://localhost:3000/index.html`

---

## ▶️ Usage

To recompile the main stylesheet after editing `assets/scss/main.scss`:

```bash
npx sass assets/scss/main.scss assets/css/main.css
```

The other files in `assets/css/` (`sections.css`, `animations.css`, `responsive.css`) are plain CSS and can be edited directly, with no compilation step.

---

## 🌐 Static Publishing (GitHub Pages)

The project is published as a static site directly by GitHub Pages, from the `develop` branch.

---

## ⚠️ Disclaimer

This is a personal gift, with photos, audio and text meant for one specific person. The code is open for reference and reuse of its structure, but the content (photos, letter, phrases) is private.

---

## 👨‍💻 Author

**Lucas Hochmann Rosa**

- GitHub: <https://github.com/lucas-hochmann-rosa>
- Page: <https://hrlucas.github.io/hr-love-memories-web/>
- LinkedIn: <https://www.linkedin.com/in/lucas-hochmann-rosa>

---

## 📄 License

Licensed under MIT. Feel free to use, modify, and distribute, while keeping the copyright notice and crediting **Lucas Hochmann Rosa**.

See [LICENSE](./LICENSE).

---
