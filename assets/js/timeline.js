(function () {
  var dadosTimelineFallback = {
    subtitulo: 'Algumas datas que mostram o quanto amar você se tornou parte de mim.',
    eventos: [
      { data: '10/09/2024', titulo: 'Nosso primeiro encontro', texto: 'Foi nesse dia que tudo começou a ganhar um significado diferente para mim.' },
      { data: '24/09/2024', titulo: 'Começamos a namorar', texto: 'O dia em que meu coração teve certeza de onde queria ficar.' },
      { data: '26/10/2024', titulo: 'Conheci seus pais', texto: 'Um passo importante, porque amar você também é honrar tudo o que faz parte da sua vida.' },
      { data: '26/10/2024', titulo: 'Adotei a Sky', texto: 'Nesse mesmo dia, a Sky entrou na minha vida e passou a carregar um pedacinho da nossa história.' },
      { data: '24/11/2024', titulo: 'Você conheceu meus pais', texto: 'Ver você se aproximando do meu mundo só me fez imaginar ainda mais o nosso futuro.' },
      { data: '06/04/2025', titulo: 'Adotei o nosso Bibi', texto: 'Um gatinho preto, cheio de significado, escolhido com amor para fazer parte de nós.' },
      { data: '14/06/2025', titulo: 'Nosso primeiro Dia dos Namorados', texto: 'Mais um capítulo bonito da história que eu quero continuar escrevendo ao seu lado.' }
    ],
    mensagemFinal: 'Desde então, cada uma dessas datas se tornou prova de que amar você é um dos maiores sonhos da minha vida. Obrigado por ser minha mulher.'
  };

  function criarCardEvento(evento, indice) {
    var card = document.createElement('article');
    card.className = 'timeline-escada__card revelar';
    card.style.setProperty('--atraso', indice * 80 + 'ms');
    card.style.setProperty('--degrau', String(indice % 3));

    card.innerHTML =
      '<p class="timeline__data">' + evento.data + '</p>' +
      '<h3>' + evento.titulo + '</h3>' +
      '<p>' + evento.texto + '</p>';

    return card;
  }

  function renderizarTimeline(dados) {
    var containerTimeline = document.getElementById('timeline-list');
    var subtitulo = document.getElementById('timeline-subtitulo');
    var encerramento = document.getElementById('timeline-encerramento');

    if (!containerTimeline || !dados || !Array.isArray(dados.eventos)) {
      return;
    }

    if (subtitulo && dados.subtitulo) {
      subtitulo.textContent = dados.subtitulo;
    }

    containerTimeline.innerHTML = '';
    dados.eventos.forEach(function (evento, indice) {
      containerTimeline.appendChild(criarCardEvento(evento, indice));
    });

    if (encerramento && dados.mensagemFinal) {
      encerramento.innerHTML = dados.mensagemFinal.replace(/ /g, '&nbsp;');
      encerramento.setAttribute('aria-label', dados.mensagemFinal);
    }
  }

  function inicializarTimeline() {
    fetch('assets/data/timeline.json')
      .then(function (resposta) {
        if (!resposta.ok) {
          throw new Error('timeline indisponivel');
        }
        return resposta.json();
      })
      .then(renderizarTimeline)
      .catch(function () {
        renderizarTimeline(dadosTimelineFallback);
      });
  }

  window.MemoriasTimeline = {
    inicializar: inicializarTimeline
  };
})();
