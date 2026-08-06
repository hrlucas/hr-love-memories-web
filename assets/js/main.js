(function () {
  var letterFallbackData = {
    badge: '08 de março — Dia da Mulher',
    signature: 'Com todo o meu amor,\nLucas Hochmann Rosa',
    paragraphs: [
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

  function applyLetter(data) {
    var badge = document.getElementById('letter-badge');
    var content = document.getElementById('letter-content');
    var signature = document.getElementById('letter-signature');

    if (badge && data.badge) {
      badge.textContent = data.badge;
    }

    if (content && Array.isArray(data.paragraphs)) {
      content.innerHTML = '';
      data.paragraphs.forEach(function (paragraph, index) {
        var paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph;
        paragraphElement.className = 'letter__paragraph';
        paragraphElement.style.setProperty('--delay', index * 90 + 'ms');
        content.appendChild(paragraphElement);
      });
    }

    if (signature && data.signature) {
      signature.textContent = data.signature;
    }
  }

  function renderLetter() {
    fetch('assets/data/letter.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('letter unavailable');
        }
        return response.json();
      })
      .then(applyLetter)
      .catch(function () {
        applyLetter(letterFallbackData);
      });
  }

  function setupLetterEnvelope() {
    var openButton = document.getElementById('open-letter-button');
    var envelopeScene = document.getElementById('envelope-scene');
    var letterSection = document.getElementById('letter');
    var letterCard = document.getElementById('letter-card');

    if (!openButton || !envelopeScene || !letterCard || !letterSection) {
      return;
    }

    var isOpen = false;
    var closeTimer = null;

    function calculateOpenEnvelopeHeight() {
      var isMobile = window.matchMedia('(max-width: 680px)').matches;
      var minimum = isMobile ? 900 : 1080;
      var extra = isMobile ? 320 : 390;
      return Math.max(minimum, letterCard.scrollHeight + extra);
    }

    function applyDynamicOpenHeight() {
      var height = calculateOpenEnvelopeHeight();
      envelopeScene.style.minHeight = height + 'px';
    }

    function clearDynamicHeight() {
      envelopeScene.style.removeProperty('min-height');
    }

    function openLetter() {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }

      letterSection.classList.add('section--letter-open');
      envelopeScene.classList.remove('envelope-scene--closing');
      envelopeScene.classList.add('envelope-scene--open');
      openButton.textContent = 'Fechar carta';
      openButton.setAttribute('aria-pressed', 'true');
      isOpen = true;

      window.setTimeout(function () {
        applyDynamicOpenHeight();
      }, 80);
    }

    function closeLetter() {
      letterSection.classList.remove('section--letter-open');
      envelopeScene.classList.add('envelope-scene--closing');
      envelopeScene.classList.remove('envelope-scene--open');
      openButton.textContent = 'Abrir carta';
      openButton.setAttribute('aria-pressed', 'false');
      isOpen = false;
      clearDynamicHeight();

      closeTimer = window.setTimeout(function () {
        envelopeScene.classList.remove('envelope-scene--closing');
      }, 760);
    }

    function toggleLetter() {
      if (isOpen) {
        closeLetter();
      } else {
        openLetter();
      }
    }

    openButton.addEventListener('click', toggleLetter);

    letterCard.addEventListener('click', function () {
      if (isOpen) {
        closeLetter();
      }
    });

    window.addEventListener('resize', function () {
      if (isOpen) {
        applyDynamicOpenHeight();
      }
    });
  }

  function setupIntroGateAndMusic() {
    var overlay = document.getElementById('intro-gate');
    var startButton = document.getElementById('start-experience');
    var audio = document.getElementById('global-love-song');
    var player = document.getElementById('floating-music-player');
    var playPauseButton = document.getElementById('player-play-pause');
    var volumeUpButton = document.getElementById('player-volume-up');
    var volumeDownButton = document.getElementById('player-volume-down');

    if (!overlay || !startButton || !audio || !player) {
      return;
    }

    var experienceStarted = false;

    function updatePlayPauseButton() {
      if (!playPauseButton) {
        return;
      }

      if (audio.paused) {
        playPauseButton.textContent = 'Tocar';
        playPauseButton.setAttribute('aria-label', 'Tocar música');
      } else {
        playPauseButton.textContent = 'Pausar';
        playPauseButton.setAttribute('aria-label', 'Pausar música');
      }
    }

    function adjustVolume(delta) {
      var currentVolume = typeof audio.volume === 'number' ? audio.volume : 0.5;
      var nextVolume = Math.max(0, Math.min(1, currentVolume + delta));
      audio.volume = Math.round(nextVolume * 100) / 100;
    }

    function showPlayer() {
      player.classList.remove('player-music--hidden');
      player.classList.add('player-music--active');
      player.setAttribute('aria-hidden', 'false');
    }

    function revealMainExperience() {
      overlay.classList.add('intro-overlay--leaving');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('experience-locked');
      document.body.classList.add('experience-unlocked');

      window.setTimeout(function () {
        overlay.hidden = true;
      }, 900);
    }

    function playInitialSong() {
      function playFromPoint() {
        audio.currentTime = 23;
        audio.volume = 0.5;
        return audio.play();
      }

      if (audio.readyState >= 1) {
        return playFromPoint();
      }

      return new Promise(function (resolve, reject) {
        var finished = false;

        function finishWithSuccess() {
          if (finished) {
            return;
          }

          finished = true;
          clearListeners();
          playFromPoint().then(resolve).catch(reject);
        }

        function finishWithError() {
          if (finished) {
            return;
          }

          finished = true;
          clearListeners();
          reject(new Error('failed to load audio metadata'));
        }

        function clearListeners() {
          audio.removeEventListener('loadedmetadata', finishWithSuccess);
          audio.removeEventListener('error', finishWithError);
        }

        audio.addEventListener('loadedmetadata', finishWithSuccess, { once: true });
        audio.addEventListener('error', finishWithError, { once: true });
        audio.load();
      });
    }

    function startExperience() {
      if (experienceStarted) {
        return;
      }

      experienceStarted = true;
      startButton.disabled = true;
      startButton.setAttribute('aria-busy', 'true');

      playInitialSong()
        .catch(function (error) {
          console.warn('Não foi possível iniciar o áudio automaticamente:', error);
        })
        .finally(function () {
          showPlayer();
          revealMainExperience();
          updatePlayPauseButton();
          startButton.removeAttribute('aria-busy');
        });
    }

    function togglePlayPause() {
      if (audio.paused) {
        audio.play().catch(function (error) {
          console.warn('Falha ao retomar áudio:', error);
        });
        return;
      }

      audio.pause();
    }

    startButton.addEventListener('click', startExperience);

    if (playPauseButton) {
      playPauseButton.addEventListener('click', togglePlayPause);
    }

    if (volumeUpButton) {
      volumeUpButton.addEventListener('click', function () {
        adjustVolume(0.1);
      });
    }

    if (volumeDownButton) {
      volumeDownButton.addEventListener('click', function () {
        adjustVolume(-0.1);
      });
    }

    audio.addEventListener('play', updatePlayPauseButton);
    audio.addEventListener('pause', updatePlayPauseButton);

    audio.volume = 0.5;
    updatePlayPauseButton();
  }

  function setupBackToTop() {
    var backButton = document.getElementById('back-to-top');
    var start = document.getElementById('hero');

    if (!backButton || !start) {
      return;
    }

    backButton.addEventListener('click', function () {
      start.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function initProject() {
    if (window.MemoriesIntro) window.MemoriesIntro.init();
    if (window.MemoriesTimeline) window.MemoriesTimeline.init();
    if (window.MemoriesGallery) window.MemoriesGallery.init();
    if (window.MemoriesCounter) window.MemoriesCounter.init();
    if (window.MemoriesEffects) window.MemoriesEffects.init();
    if (window.MemoriesMeteors) window.MemoriesMeteors.init();

    renderLetter();
    setupLetterEnvelope();
    setupIntroGateAndMusic();
    setupBackToTop();
  }

  document.addEventListener('DOMContentLoaded', initProject);
})();
