(function () {
  var timelineFallbackData = {
    subtitle: 'Algumas datas que mostram o quanto amar você se tornou parte de mim.',
    events: [
      { date: '10/09/2024', title: 'Nosso primeiro encontro', text: 'Foi nesse dia que tudo começou a ganhar um significado diferente para mim.' },
      { date: '24/09/2024', title: 'Começamos a namorar', text: 'O dia em que meu coração teve certeza de onde queria ficar.' },
      { date: '26/10/2024', title: 'Conheci seus pais', text: 'Um passo importante, porque amar você também é honrar tudo o que faz parte da sua vida.' },
      { date: '26/10/2024', title: 'Adotei a Sky', text: 'Nesse mesmo dia, a Sky entrou na minha vida e passou a carregar um pedacinho da nossa história.' },
      { date: '24/11/2024', title: 'Você conheceu meus pais', text: 'Ver você se aproximando do meu mundo só me fez imaginar ainda mais o nosso futuro.' },
      { date: '06/04/2025', title: 'Adotei o nosso Bibi', text: 'Um gatinho preto, cheio de significado, escolhido com amor para fazer parte de nós.' },
      { date: '14/06/2025', title: 'Nosso primeiro Dia dos Namorados', text: 'Mais um capítulo bonito da história que eu quero continuar escrevendo ao seu lado.' }
    ],
    closingMessage: 'Desde então, cada uma dessas datas se tornou prova de que amar você é um dos maiores sonhos da minha vida. Obrigado por ser minha mulher.'
  };

  function createEventCard(event, index) {
    var card = document.createElement('article');
    card.className = 'timeline-stairs__card reveal';
    card.style.setProperty('--delay', index * 80 + 'ms');
    card.style.setProperty('--step', String(index % 3));

    card.innerHTML =
      '<p class="timeline__date">' + event.date + '</p>' +
      '<h3>' + event.title + '</h3>' +
      '<p>' + event.text + '</p>';

    return card;
  }

  function renderTimeline(data) {
    var listContainer = document.getElementById('timeline-list');
    var subtitle = document.getElementById('timeline-subtitle');
    var closing = document.getElementById('timeline-closing');

    if (!listContainer || !data || !Array.isArray(data.events)) {
      return;
    }

    if (subtitle && data.subtitle) {
      subtitle.textContent = data.subtitle;
    }

    listContainer.innerHTML = '';
    data.events.forEach(function (event, index) {
      listContainer.appendChild(createEventCard(event, index));
    });

    if (closing && data.closingMessage) {
      closing.innerHTML = data.closingMessage.replace(/ /g, '&nbsp;');
      closing.setAttribute('aria-label', data.closingMessage);
    }
  }

  function initTimeline() {
    fetch('assets/data/timeline.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('timeline unavailable');
        }
        return response.json();
      })
      .then(renderTimeline)
      .catch(function () {
        renderTimeline(timelineFallbackData);
      });
  }

  window.MemoriesTimeline = {
    init: initTimeline
  };
})();
