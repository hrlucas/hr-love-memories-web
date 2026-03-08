(function () {
  var dadosCartaFallback = {
    selo: '08 de março — Dia da Mulher',
    assinatura: 'Com todo o meu amor,\nLucas Hochmann Rosa',
    paragrafos: [
      'Meu amor,',
      'Hoje é o Dia da Mulher, e eu não poderia deixar esse momento passar sem falar de você. Mais do que qualquer data, este dia me faz lembrar da pessoa incrível que você é e da sorte imensa que tenho por caminhar ao seu lado.',
      'Você é uma mulher extraordinária, Mary. Forte, sensível, inteligente, determinada e dona de uma luz que ilumina tudo ao seu redor. Muitas vezes fico apenas observando a forma como você encara a vida, como sonha, como luta pelo que acredita, e isso só aumenta ainda mais a admiração que sinto por você.',
      'O mundo às vezes pode ser duro, injusto e cansativo, mas mesmo assim você segue em frente com uma coragem silenciosa que me inspira todos os dias. E talvez você nem perceba, mas a forma como você existe já transforma o ambiente ao seu redor.',
      'Sou profundamente grato por ter você na minha vida. Não apenas como minha namorada, mas como minha melhor amiga, minha companheira e a pessoa com quem eu quero dividir sonhos, planos e caminhos.',
      'Se existe algo que desejo hoje, neste Dia da Mulher, é que você nunca esqueça do quanto é especial. Que nunca duvide da força que carrega dentro de si, nem da beleza que existe em quem você é.',
      'Obrigado por ser você.',
      'Obrigado por iluminar meus dias.',
      'Obrigado por me permitir amar uma mulher tão incrível.',
      'Feliz Dia da Mulher, meu bem.'
    ]
  };

  function aplicarCarta(dados) {
    var selo = document.getElementById('carta-selo');
    var conteudo = document.getElementById('carta-conteudo');
    var assinatura = document.getElementById('carta-assinatura');

    if (selo && dados.selo) {
      selo.textContent = dados.selo;
    }

    if (conteudo && Array.isArray(dados.paragrafos)) {
      conteudo.innerHTML = '';
      dados.paragrafos.forEach(function (paragrafo, indice) {
        var elementoParagrafo = document.createElement('p');
        elementoParagrafo.textContent = paragrafo;
        elementoParagrafo.className = 'carta__paragrafo';
        elementoParagrafo.style.setProperty('--atraso', indice * 90 + 'ms');
        conteudo.appendChild(elementoParagrafo);
      });
    }

    if (assinatura && dados.assinatura) {
      assinatura.textContent = dados.assinatura;
    }
  }

  function renderizarCarta() {
    fetch('assets/data/letter.json')
      .then(function (resposta) {
        if (!resposta.ok) {
          throw new Error('carta indisponível');
        }
        return resposta.json();
      })
      .then(aplicarCarta)
      .catch(function () {
        aplicarCarta(dadosCartaFallback);
      });
  }

  function configurarEnvelopeCarta() {
    var botaoAbrir = document.getElementById('botao-abrir-carta');
    var envelopeCena = document.getElementById('envelope-cena');
    var secaoCarta = document.getElementById('letter');
    var carta = document.getElementById('carta');

    if (!botaoAbrir || !envelopeCena || !carta || !secaoCarta) {
      return;
    }

    var estadoAberto = false;
    var temporizadorFechamento = null;

    function calcularAlturaEnvelopeAberto() {
      var eMobile = window.matchMedia('(max-width: 680px)').matches;
      var minimo = eMobile ? 900 : 1080;
      var extra = eMobile ? 320 : 390;
      return Math.max(minimo, carta.scrollHeight + extra);
    }

    function aplicarAlturaDinamicaAberto() {
      var altura = calcularAlturaEnvelopeAberto();
      envelopeCena.style.minHeight = altura + 'px';
    }

    function limparAlturaDinamica() {
      envelopeCena.style.removeProperty('min-height');
    }

    function abrirCarta() {
      if (temporizadorFechamento) {
        window.clearTimeout(temporizadorFechamento);
        temporizadorFechamento = null;
      }

      secaoCarta.classList.add('secao--carta-aberta');
      envelopeCena.classList.remove('envelope-cena--fechando');
      envelopeCena.classList.add('envelope-cena--aberto');
      botaoAbrir.textContent = 'Fechar carta';
      botaoAbrir.setAttribute('aria-pressed', 'true');
      estadoAberto = true;

      window.setTimeout(function () {
        aplicarAlturaDinamicaAberto();
      }, 80);
    }

    function fecharCarta() {
      secaoCarta.classList.remove('secao--carta-aberta');
      envelopeCena.classList.add('envelope-cena--fechando');
      envelopeCena.classList.remove('envelope-cena--aberto');
      botaoAbrir.textContent = 'Abrir carta';
      botaoAbrir.setAttribute('aria-pressed', 'false');
      estadoAberto = false;
      limparAlturaDinamica();

      temporizadorFechamento = window.setTimeout(function () {
        envelopeCena.classList.remove('envelope-cena--fechando');
      }, 760);
    }

    function alternarCarta() {
      if (estadoAberto) {
        fecharCarta();
      } else {
        abrirCarta();
      }
    }

    botaoAbrir.addEventListener('click', alternarCarta);

    carta.addEventListener('click', function () {
      if (estadoAberto) {
        fecharCarta();
      }
    });

    window.addEventListener('resize', function () {
      if (estadoAberto) {
        aplicarAlturaDinamicaAberto();
      }
    });
  }

  function configurarPortaoInicialEMusica() {
    var overlay = document.getElementById('introGate');
    var botaoComecar = document.getElementById('startExperience');
    var audio = document.getElementById('globalLoveSong');
    var player = document.getElementById('floatingMusicPlayer');
    var botaoPlayPause = document.getElementById('playerPlayPause');
    var botaoVolumeMais = document.getElementById('playerVolumeUp');
    var botaoVolumeMenos = document.getElementById('playerVolumeDown');

    if (!overlay || !botaoComecar || !audio || !player) {
      return;
    }

    var experienciaIniciada = false;

    function atualizarBotaoPlayPause() {
      if (!botaoPlayPause) {
        return;
      }

      if (audio.paused) {
        botaoPlayPause.textContent = 'Tocar';
        botaoPlayPause.setAttribute('aria-label', 'Tocar música');
      } else {
        botaoPlayPause.textContent = 'Pausar';
        botaoPlayPause.setAttribute('aria-label', 'Pausar música');
      }
    }

    function ajustarVolume(delta) {
      var volumeAtual = typeof audio.volume === 'number' ? audio.volume : 0.5;
      var proximoVolume = Math.max(0, Math.min(1, volumeAtual + delta));
      audio.volume = Math.round(proximoVolume * 100) / 100;
    }

    function mostrarPlayer() {
      player.classList.remove('player-musica--oculto');
      player.classList.add('player-musica--ativo');
      player.setAttribute('aria-hidden', 'false');
    }

    function revelarExperienciaPrincipal() {
      overlay.classList.add('intro-overlay--saindo');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('experiencia-bloqueada');
      document.body.classList.add('experiencia-liberada');

      window.setTimeout(function () {
        overlay.hidden = true;
      }, 900);
    }

    function tocarMusicaInicial() {
      function tocarNoPonto() {
        audio.currentTime = 23;
        audio.volume = 0.5;
        return audio.play();
      }

      if (audio.readyState >= 1) {
        return tocarNoPonto();
      }

      return new Promise(function (resolve, reject) {
        var concluiu = false;

        function finalizarComSucesso() {
          if (concluiu) {
            return;
          }

          concluiu = true;
          limparEventos();
          tocarNoPonto().then(resolve).catch(reject);
        }

        function finalizarComErro() {
          if (concluiu) {
            return;
          }

          concluiu = true;
          limparEventos();
          reject(new Error('falha ao carregar metadados do áudio'));
        }

        function limparEventos() {
          audio.removeEventListener('loadedmetadata', finalizarComSucesso);
          audio.removeEventListener('error', finalizarComErro);
        }

        audio.addEventListener('loadedmetadata', finalizarComSucesso, { once: true });
        audio.addEventListener('error', finalizarComErro, { once: true });
        audio.load();
      });
    }

    function iniciarExperiencia() {
      if (experienciaIniciada) {
        return;
      }

      experienciaIniciada = true;
      botaoComecar.disabled = true;
      botaoComecar.setAttribute('aria-busy', 'true');

      tocarMusicaInicial()
        .catch(function (erro) {
          console.warn('Não foi possível iniciar o áudio automaticamente:', erro);
        })
        .finally(function () {
          mostrarPlayer();
          revelarExperienciaPrincipal();
          atualizarBotaoPlayPause();
          botaoComecar.removeAttribute('aria-busy');
        });
    }

    function alternarPlayPause() {
      if (audio.paused) {
        audio.play().catch(function (erro) {
          console.warn('Falha ao retomar áudio:', erro);
        });
        return;
      }

      audio.pause();
    }

    botaoComecar.addEventListener('click', iniciarExperiencia);

    if (botaoPlayPause) {
      botaoPlayPause.addEventListener('click', alternarPlayPause);
    }

    if (botaoVolumeMais) {
      botaoVolumeMais.addEventListener('click', function () {
        ajustarVolume(0.1);
      });
    }

    if (botaoVolumeMenos) {
      botaoVolumeMenos.addEventListener('click', function () {
        ajustarVolume(-0.1);
      });
    }

    audio.addEventListener('play', atualizarBotaoPlayPause);
    audio.addEventListener('pause', atualizarBotaoPlayPause);

    audio.volume = 0.5;
    atualizarBotaoPlayPause();
  }

  function configurarVoltarAoInicio() {
    var botaoVoltar = document.getElementById('voltar-inicio');
    var inicio = document.getElementById('hero');

    if (!botaoVoltar || !inicio) {
      return;
    }

    botaoVoltar.addEventListener('click', function () {
      inicio.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function inicializarProjeto() {
    if (window.MemoriasIntro) window.MemoriasIntro.inicializar();
    if (window.MemoriasTimeline) window.MemoriasTimeline.inicializar();
    if (window.MemoriasGaleria) window.MemoriasGaleria.inicializar();
    if (window.MemoriasContador) window.MemoriasContador.inicializar();
    if (window.MemoriasEfeitos) window.MemoriasEfeitos.inicializar();
    if (window.MemoriasMeteoros) window.MemoriasMeteoros.inicializar();

    renderizarCarta();
    configurarEnvelopeCarta();
    configurarPortaoInicialEMusica();
    configurarVoltarAoInicio();
  }

  document.addEventListener('DOMContentLoaded', inicializarProjeto);
})();