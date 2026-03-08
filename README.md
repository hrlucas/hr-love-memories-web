# 🚀 hr-love-memories-web

<p align="center">
  <a href="https://github.com/hrlucas">
    <img src="https://img.shields.io/badge/GitHub-hrlucas-181717?style=for-the-badge&logo=github" alt="GitHub hrlucas">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa-456bb7339/">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn Lucas Hochmann Rosa">
  </a>
  <a href="./LICENCE">
    <img src="https://img.shields.io/badge/Licença-MIT-2ea44f?style=for-the-badge" alt="Licença MIT">
  </a>
</p>

> Experiência romântica que fiz para Maria Paula Rossetti Siqueira, estática em HTML, CSS/SCSS e JavaScript puro, com estética noturna, narrativa em capítulos e abertura floral cinematográfica.

---

## 📌 Visão Geral

O **hr-love-memories-web** foi estruturado como um presente digital interativo, com foco em performance, manutenção simples e execução 100% estática.

Fluxo principal:

- Tela de entrada com frase romântica e botão **Começar**.
- Início da música local no segundo 23 após interação da usuária.
- Revelação da experiência completa em página única.
- Player fixo no topo para controle da mesma instância de áudio.

---

## 🧠 Funcionalidades

- Abertura floral integrada diretamente à hero principal no index.
- Navegação por âncoras (`Início`, `História`, `Galeria`, `Tempo`, `Carta`, `Meteoros`).
- Timeline dinâmica com dados em JSON.
- Galeria local com 45 imagens e layout responsivo.
- Contador de tempo de relacionamento em tempo real.
- Carta final com animação de envelope.
- Seção de meteoros com frases e imagens animadas.
- Player de música com `play/pause`, `volume +` e `volume -`.

---

## 🏗️ Estrutura do Projeto

```text
hr-love-memories-web/
├── index.html
├── assets/
│   ├── audio/
│   │   └── Di Paullo e Paulino - No céu dos braços teus.mp3
│   ├── css/
│   │   ├── main.css
│   │   ├── animations.css
│   │   ├── sections.css
│   │   └── responsive.css
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
├── styles/
│   └── scss/
│       ├── main.scss
│       ├── _variables.scss
│       ├── _base.scss
│       ├── _intro.scss
│       ├── _timeline.scss
│       ├── _gallery.scss
│       ├── _counter.scss
│       ├── _letter.scss
│       ├── _effects.scss
│       └── _responsive.scss
├── LICENCE
└── README.md
```

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 + SCSS modular
- JavaScript puro
- JSON local para conteúdo dinâmico

---

## ▶️ Execução Local

```bash
git clone https://github.com/hrlucas/hr-love-memories-web.git
cd hr-love-memories-web
npx serve .
```

Acesse:

- `http://localhost:3000/index.html`

---

## 🌐 Publicação Estática (GitHub Pages)

O projeto está pronto para publicação como site estático.

---

## 📄 Licença

Licenciado sob MIT. Você pode usar, modificar e distribuir, mantendo o aviso de copyright e atribuindo crédito a **Lucas Hochmann Rosa / hrlucas.dev**.

Consulte [LICENCE](./LICENCE).

---

## 👨‍💻 Autor

**Lucas Hochmann Rosa / hrlucas.dev**

- GitHub: https://github.com/hrlucas
- LinkedIn: https://www.linkedin.com/in/lucas-hochmann-rosa-456bb7339/
