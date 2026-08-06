# 💌 Romantic Experience Web

<p align="center">
  <a href="https://github.com/lucas-hochmann-rosa/romantic-experience-web">
    <img src="https://img.shields.io/badge/GitHub-romantic--experience--web-181717?style=for-the-badge&logo=github" alt="GitHub do repositório">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn Lucas Hochmann Rosa">
  </a>
  <a href="https://lucas-hochmann-rosa.github.io/romantic-experience-web/">
    <img src="https://img.shields.io/badge/Página-Web-ff69b4?style=for-the-badge" alt="Página Web">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/Licença-MIT-2ea44f?style=for-the-badge" alt="Licença MIT">
  </a>
</p>

<p align="center">🇧🇷 Português · <a href="README.en.md">🇺🇸 English</a></p>

> Experiência romântica que fiz para Maria Paula Rossetti Siqueira, estática em HTML, CSS/SCSS e JavaScript puro, com estética noturna, narrativa em capítulos e abertura floral.

---

## 📌 Visão Geral

O **Romantic Experience Web** foi estruturado como um presente digital interativo, com foco em performance, manutenção simples e execução 100% estática.

Fluxo principal:

- Tela de entrada com frase romântica e botão **Começar**.
- Início da música local no segundo 23 após interação da usuária.
- Revelação da experiência completa em página única.
- Player fixo no topo para controle da mesma instância de áudio.

---

## ✨ Funcionalidades

- Abertura floral integrada diretamente à hero principal no index.
- Navegação por âncoras (`Início`, `História`, `Galeria`, `Tempo`, `Carta`, `Meteoros`).
- Timeline dinâmica com dados em JSON.
- Galeria local com 45 imagens e layout responsivo.
- Contador de tempo de relacionamento em tempo real.
- Carta final com animação de envelope.
- Seção de meteoros com frases e imagens animadas.
- Player de música com `play/pause`, `volume +` e `volume -`.

---

## 🧭 Sumário

- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Regras de construção do projeto](#-regras-de-construção-do-projeto)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Publicação Estática (GitHub Pages)](#-publicação-estática-github-pages)
- [Avisos](#-avisos)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🏗️ Arquitetura

```text
romantic-experience-web/
├── index.html
├── assets/
│   ├── audio/
│   │   └── Di Paullo e Paulino - No céu dos braços teus.mp3
│   ├── css/
│   │   ├── main.css                # Compilado a partir de assets/scss/main.scss
│   │   ├── sections.css            # CSS puro, mantido a mão
│   │   ├── animations.css          # CSS puro, mantido a mão
│   │   └── responsive.css          # CSS puro, mantido a mão
│   ├── scss/
│   │   └── main.scss               # Única fonte Sass real do projeto
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

### Organização

- **`index.html`** → estrutura única de todas as seções da experiência
- **`assets/js/`** → um módulo por seção (`window.MemoriesX.init()`), orquestrados por `main.js`
- **`assets/data/`** → conteúdo dinâmico (timeline, galeria, carta) consumido via `fetch`, com fallback local em caso de falha
- **`assets/scss/main.scss`** → única fonte Sass; os demais arquivos em `assets/css/` são CSS puro, escritos e mantidos diretamente (sem fonte Sass)

---

## 🧰 Tecnologias

- HTML5 semântico
- CSS3 + Sass (`main.scss`, compilado localmente - por exemplo, com a extensão "Live Sass Compile" do VS Code ou `npx sass`)
- JavaScript puro (sem framework, sem build step)
- JSON local para conteúdo dinâmico

---

## 📐 Regras de construção do projeto

- Identificadores, classes, IDs, chaves de JSON e nomes de função ficam em inglês.
- Todo o texto visível (títulos, botões, frases da carta, legendas) fica em português: é a experiência em si, escrita para uma pessoa específica.
- Comentários no código, quando existirem, ficam em português e reservados para decisões não óbvias.
- Nenhum passo de build é necessário para rodar o site - só o Sass precisa ser compilado manualmente ao editar `main.scss`.

---

## ⚙️ Requisitos

- Qualquer servidor HTTP estático para desenvolvimento local (ex.: `npx serve`)
- Node.js apenas se for recompilar `assets/scss/main.scss` (via `npx sass`)

---

## 🔧 Instalação

```bash
git clone https://github.com/lucas-hochmann-rosa/romantic-experience-web.git
cd romantic-experience-web
npx serve .
```

Acesse:

- `http://localhost:3000/index.html`

---

## ▶️ Execução

Para recompilar o CSS principal após alterar `assets/scss/main.scss`:

```bash
npx sass assets/scss/main.scss assets/css/main.css
```

Os demais arquivos em `assets/css/` (`sections.css`, `animations.css`, `responsive.css`) são CSS puro e podem ser editados diretamente, sem compilação.

---

## 🌐 Publicação Estática (GitHub Pages)

O projeto é publicado como site estático diretamente pelo GitHub Pages, a partir da branch `develop`.

---

## ⚠️ Avisos

Este é um presente pessoal, com fotos, áudio e texto voltados a uma pessoa específica. O código é aberto para consulta e reaproveitamento da estrutura, mas o conteúdo (fotos, carta, frases) é particular.

---

## 👨‍💻 Autor

**Lucas Hochmann Rosa**

- GitHub: <https://github.com/lucas-hochmann-rosa>
- Página: <https://lucas-hochmann-rosa.github.io/romantic-experience-web/>
- LinkedIn: <https://www.linkedin.com/in/lucas-hochmann-rosa>

---

## 📄 Licença

Licenciado sob MIT. Sinta-se livre para usar, modificar e distribuir, mantendo o aviso de copyright e atribuindo crédito a **Lucas Hochmann Rosa**.

Consulte [LICENSE](./LICENSE).

---
