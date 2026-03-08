(function () {
  var itensGaleria = [];
  var indiceAtual = 0;
  var dadosGaleriaAtual = null;
  var temporizadorResize = null;
  var frasesPadrao = [
    'Meu dia sempre fica melhor quando você está nele.',
    'Alguns momentos passam rápido, mas os que vivo com você ficam para sempre.',
    'Estar ao seu lado é onde meu coração encontra paz.',
    'Entre todos os lugares do mundo, você é o meu favorito.',
    'Cada sorriso seu ilumina um pouco mais o meu caminho.',
    'As memórias mais bonitas da minha vida sempre têm você nelas.',
    'Quando estou com você, tudo parece mais leve e mais bonito.',
    'O melhor da vida é poder dividir cada instante com você.',
    'Se eu pudesse escolher qualquer momento para reviver, escolheria os que passei ao seu lado.'
  ];

  function construirGaleriaFallback() {
    var itens = [];
    for (var indice = 1; indice <= 45; indice++) {
      itens.push({
        src: 'assets/img/gallery/provas-do-meu-amor/' + indice + '-prova-do-meu-amor-por-voce.jpg',
        alt: 'Prova do meu amor por você ' + indice,
        caption: frasesPadrao[(indice - 1) % frasesPadrao.length]
      });
    }

    return {
      subtitulo: 'Cada foto guarda um instante. Cada instante guarda um pedaço do meu amor por você.',
      itens: itens,
      frasesLinhas: frasesPadrao
    };
  }

  function atualizarLightbox() {
    var imagem = document.getElementById('lightbox-imagem');
    var legenda = document.getElementById('lightbox-legenda');

    if (!imagem || !legenda || !itensGaleria[indiceAtual]) {
      return;
    }

    var item = itensGaleria[indiceAtual];
    imagem.src = item.src;
    imagem.alt = item.alt || 'Imagem da nossa galeria';
    legenda.textContent = item.caption || '';
  }

  function abrirLightbox(indice) {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox || !itensGaleria.length) {
      return;
    }

    indiceAtual = indice;
    atualizarLightbox();
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-aberto');
  }

  function fecharLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-aberto');
  }

  function criarCardGaleria(item, indice) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'galeria__card revelar';
    card.style.setProperty('--atraso', indice * 38 + 'ms');

    card.innerHTML =
      '<span class="galeria__midia">' +
      '<img loading="lazy" src="' + item.src + '" alt="' + (item.alt || 'Foto da nossa história') + '">' +
      '</span>';

    card.addEventListener('click', function () {
      abrirLightbox(indice);
    });

    return card;
  }

  function criarLinhaFrase(texto, indice) {
    var linha = document.createElement('p');
    linha.className = 'galeria__frase-linha revelar';
    linha.setAttribute('data-frase-linha', 'true');
    linha.style.setProperty('--atraso', indice * 70 + 'ms');
    linha.textContent = texto;
    return linha;
  }

  function extrairFrasesLinhas(dados) {
    if (dados && Array.isArray(dados.frasesLinhas) && dados.frasesLinhas.length) {
      return dados.frasesLinhas.filter(function (frase) {
        return typeof frase === 'string' && frase.trim();
      });
    }

    if (dados && Array.isArray(dados.itens)) {
      var unicas = [];
      dados.itens.forEach(function (item) {
        if (!item || !item.caption) {
          return;
        }

        if (unicas.indexOf(item.caption) === -1) {
          unicas.push(item.caption);
        }
      });

      if (unicas.length) {
        return unicas;
      }
    }

    return frasesPadrao.slice();
  }

  function obterItensPorLinha() {
    if (window.matchMedia('(max-width: 680px)').matches) {
      return 2;
    }

    if (window.matchMedia('(max-width: 1080px)').matches) {
      return 3;
    }

    if (window.matchMedia('(max-width: 1280px)').matches) {
      return 4;
    }

    return 5;
  }

  function renderizarGaleria(dados) {
    var container = document.getElementById('gallery-grid');
    var subtitulo = document.getElementById('galeria-subtitulo');

    if (!container || !dados || !Array.isArray(dados.itens)) {
      return;
    }

    dadosGaleriaAtual = dados;

    if (subtitulo && dados.subtitulo) {
      subtitulo.textContent = dados.subtitulo;
    }

    itensGaleria = dados.itens.filter(function (item) {
      return item && item.src;
    });

    var frasesLinhas = extrairFrasesLinhas(dados);
    var itensPorLinha = obterItensPorLinha();
    var indiceFrase = 0;

    container.innerHTML = '';

    if (itensGaleria.length) {
      container.appendChild(criarLinhaFrase(frasesLinhas[indiceFrase % frasesLinhas.length], indiceFrase));
    }

    itensGaleria.forEach(function (item, indice) {
      container.appendChild(criarCardGaleria(item, indice));

      var fimLinha = (indice + 1) % itensPorLinha === 0;
      var aindaTemItens = indice < itensGaleria.length - 1;

      if (fimLinha && aindaTemItens) {
        indiceFrase += 1;
        container.appendChild(criarLinhaFrase(frasesLinhas[indiceFrase % frasesLinhas.length], indiceFrase));
      }
    });
  }

  function configurarResponsividadeDasLinhas() {
    window.addEventListener('resize', function () {
      if (!dadosGaleriaAtual) {
        return;
      }

      if (temporizadorResize) {
        window.clearTimeout(temporizadorResize);
      }

      temporizadorResize = window.setTimeout(function () {
        renderizarGaleria(dadosGaleriaAtual);
      }, 160);
    });
  }

  function configurarLightbox() {
    var botaoFechar = document.getElementById('lightbox-fechar');
    var lightbox = document.getElementById('lightbox');

    if (!lightbox) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-aberto');

    if (botaoFechar) {
      botaoFechar.addEventListener('click', fecharLightbox);
    }

    lightbox.addEventListener('click', function (evento) {
      if (evento.target === lightbox) {
        fecharLightbox();
      }
    });

    window.addEventListener('keydown', function (evento) {
      if (!lightbox.hidden && evento.key === 'Escape') {
        fecharLightbox();
      }
    });
  }

  function inicializarGaleria() {
    configurarLightbox();
    configurarResponsividadeDasLinhas();

    fetch('assets/data/gallery.json')
      .then(function (resposta) {
        if (!resposta.ok) {
          throw new Error('galeria indisponível');
        }
        return resposta.json();
      })
      .then(renderizarGaleria)
      .catch(function () {
        renderizarGaleria(construirGaleriaFallback());
      });
  }

  window.MemoriasGaleria = {
    inicializar: inicializarGaleria
  };
})();
