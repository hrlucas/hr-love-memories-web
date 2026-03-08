(function () {
  var observadorRevelacao = null;

  function tornarVisivel(elemento) {
    if (!elemento || elemento.classList.contains('visivel')) {
      return;
    }

    elemento.classList.add('visivel');
  }

  function observarElemento(elemento) {
    if (!elemento || !elemento.classList || !elemento.classList.contains('revelar')) {
      return;
    }

    if (!observadorRevelacao) {
      tornarVisivel(elemento);
      return;
    }

    observadorRevelacao.observe(elemento);
  }

  function inicializarRevelacaoPorScroll() {
    var elementos = document.querySelectorAll('.revelar');

    if (!('IntersectionObserver' in window)) {
      elementos.forEach(function (elemento) {
        tornarVisivel(elemento);
      });
      return;
    }

    observadorRevelacao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          tornarVisivel(entrada.target);
          observadorRevelacao.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.16 });

    elementos.forEach(function (elemento) {
      observarElemento(elemento);
    });

    var observadorMutacoes = new MutationObserver(function (mutacoes) {
      mutacoes.forEach(function (mutacao) {
        mutacao.addedNodes.forEach(function (noAdicionado) {
          if (!noAdicionado || noAdicionado.nodeType !== 1) {
            return;
          }

          if (noAdicionado.matches && noAdicionado.matches('.revelar')) {
            observarElemento(noAdicionado);
          }

          if (noAdicionado.querySelectorAll) {
            noAdicionado.querySelectorAll('.revelar').forEach(function (elemento) {
              observarElemento(elemento);
            });
          }
        });
      });
    });

    observadorMutacoes.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function criarParticulasDeFundo() {
    var plano = document.getElementById('plano-particulas');
    if (!plano) {
      return;
    }

    var total = window.matchMedia('(max-width: 768px)').matches ? 42 : 78;
    var fragmento = document.createDocumentFragment();

    for (var indice = 0; indice < total; indice++) {
      var particula = document.createElement('span');
      particula.className = 'particula-luz';
      particula.style.left = Math.random() * 100 + '%';
      particula.style.top = Math.random() * 100 + '%';
      particula.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      particula.style.animationDuration = (6 + Math.random() * 7).toFixed(2) + 's';
      particula.style.opacity = (0.25 + Math.random() * 0.6).toFixed(2);
      fragmento.appendChild(particula);
    }

    plano.innerHTML = '';
    plano.appendChild(fragmento);
  }

  function preencherCoracoes(container, total) {
    if (!container) {
      return;
    }

    container.innerHTML = '';

    var fragmento = document.createDocumentFragment();

    for (var indice = 0; indice < total; indice++) {
      var coracao = document.createElement('span');
      var tamanho = (8 + Math.random() * 16).toFixed(1);
      var duracao = (8 + Math.random() * 9).toFixed(2);
      var atraso = (-Math.random() * 14).toFixed(2);

      coracao.className = 'coracao-flutuante';
      coracao.style.left = (Math.random() * 100).toFixed(2) + '%';
      coracao.style.setProperty('--tamanho-coracao', tamanho + 'px');
      coracao.style.animationDuration = duracao + 's';
      coracao.style.animationDelay = atraso + 's';
      coracao.style.opacity = (0.12 + Math.random() * 0.35).toFixed(2);
      fragmento.appendChild(coracao);
    }

    container.appendChild(fragmento);
  }

  function inicializarCoracoesNasSecoes() {
    var secoes = document.querySelectorAll('section.secao');
    var total = window.matchMedia('(max-width: 768px)').matches ? 16 : 26;

    secoes.forEach(function (secao) {
      if (secao.id === 'hero') {
        return;
      }

      var container = secao.querySelector('.tempo-coracoes');
      if (!container) {
        container = secao.querySelector('.fundo-coracoes');
      }

      if (!container) {
        container = document.createElement('div');
        container.className = 'fundo-coracoes';
        container.setAttribute('aria-hidden', 'true');
        secao.insertBefore(container, secao.firstChild);
      }

      preencherCoracoes(container, total);
    });
  }

  function inicializarParallaxLeve() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var ultimoValor = 0;

    window.addEventListener('scroll', function () {
      var deslocamento = window.scrollY * 0.06;
      if (Math.abs(deslocamento - ultimoValor) > 0.4) {
        document.documentElement.style.setProperty('--deslocamento-parallax', deslocamento.toFixed(2) + 'px');
        ultimoValor = deslocamento;
      }
    }, { passive: true });
  }

  function inicializarEfeitos() {
    criarParticulasDeFundo();
    inicializarRevelacaoPorScroll();
    inicializarCoracoesNasSecoes();
    inicializarParallaxLeve();
  }

  window.MemoriasEfeitos = {
    inicializar: inicializarEfeitos,
    observarRevelacao: observarElemento
  };
})();
