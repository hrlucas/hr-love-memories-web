(function () {
  var METEOR_PHRASES = [
    'Te amo',
    'Minha mulher',
    'Meu amor',
    'Meu bem',
    'A mulher da minha vida',
    'Meu lugar favorito é perto de você',
    'Você ilumina meus dias',
    'Meu universo tem você',
    'Com amor, Lucas',
    'Você faz qualquer instante parecer especial',
    'Os momentos que guardo com mais carinho têm você',
    'Meu coração encontrou paz em você',
    'Estar ao seu lado é o meu lar',
    'Meu maior sonho é amar você',
    'Você é meu presente favorito da vida',
    'Obrigado por existir',
    'Você é a luz que mudou meus caminhos',
    'Com você, tudo ficou mais leve',
    'Meu futuro sempre encontra você',
    'Você é minha melhor escolha',
    'Te amar é uma das partes mais bonitas da minha vida',
    'Meu amor mora em você',
    'Tudo fica mais bonito quando estou com você',
    'A paz do meu coração tem o seu nome',
    'As memórias mais bonitas sempre têm você nelas',
    'Entre todos os lugares, você é o meu favorito',
    'Seu sorriso ilumina o meu mundo',
    'Eu sempre escolherei você',
    'Você faz meu mundo parar e florescer ao mesmo tempo',
    'Meu destino ficou mais bonito quando encontrou o seu',
    'Ao seu lado, a vida parece mais viva',
    'Você é meu sonho mais bonito',
    'Te ver feliz também é meu lar',
    'Você é a parte mais bonita dos meus dias',
    'Meu coração reconheceu você como casa',
    'Se existe amor, ele se parece com você',
    'Você transformou meus dias em memórias',
    'Meu carinho sempre encontra você',
    'Seu abraço tem paz',
    'Você é meu céu preferido',
    'Meu lugar no mundo é ao seu lado',
    'Meu coração sempre escolhe você',
    'Você faz minha vida ter mais sentido',
    'Com você, cada dia vale mais a pena',
    'Seu amor mudou meu mundo',
    'Minha vida ficou mais bonita quando você chegou',
    'Você é minha paz',
    'Você é minha melhor lembrança',
    'Meu amor sempre volta para você',
    'Meu futuro tem o seu nome',
    'Você é a razão de tantos sorrisos meus',
    'Você faz meu coração sorrir',
    'Minha história favorita é a que estou vivendo com você'
  ];

  var intervals = [];

  function randomPhrase() {
    return METEOR_PHRASES[Math.floor(Math.random() * METEOR_PHRASES.length)];
  }

  function meteorImages() {
    var list = [];
    for (var index = 1; index <= 12; index++) {
      list.push('assets/img/gallery/provas-do-meu-amor/' + index + '-prova-do-meu-amor-por-voce.jpg');
    }
    return list;
  }

  function clearIntervals() {
    intervals.forEach(function (id) {
      window.clearInterval(id);
    });
    intervals = [];
  }

  function createStars(container) {
    var total = window.matchMedia('(max-width: 768px)').matches ? 52 : 104;
    for (var i = 0; i < total; i++) {
      var star = document.createElement('span');
      star.className = 'meteor-star';
      star.style.left = (Math.random() * 100).toFixed(2) + '%';
      star.style.top = (Math.random() * 100).toFixed(2) + '%';
      star.style.opacity = (0.18 + Math.random() * 0.62).toFixed(2);
      star.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      container.appendChild(star);
    }
  }

  function countActive(container, selector) {
    return container.querySelectorAll(selector).length;
  }

  function createMeteorPhrase(container) {
    var limit = window.matchMedia('(max-width: 768px)').matches ? 3 : 4;
    if (countActive(container, '.meteor-phrase') >= limit) {
      return;
    }

    var item = document.createElement('span');
    item.className = 'meteor-phrase';
    item.textContent = randomPhrase();
    item.style.left = (64 + Math.random() * 34).toFixed(2) + '%';
    item.style.top = (-12 + Math.random() * 26).toFixed(2) + '%';
    item.style.animationDuration = (22 + Math.random() * 12).toFixed(2) + 's';
    item.style.fontSize = (14 + Math.random() * 12).toFixed(0) + 'px';
    item.style.opacity = (0.6 + Math.random() * 0.34).toFixed(2);
    container.appendChild(item);

    item.addEventListener('animationend', function () {
      item.remove();
    });
  }

  function createMeteorImage(container, photos) {
    var limit = window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
    if (countActive(container, '.meteor-image') >= limit) {
      return;
    }

    var wrapper = document.createElement('span');
    wrapper.className = 'meteor-image';
    wrapper.style.left = (70 + Math.random() * 28).toFixed(2) + '%';
    wrapper.style.top = (-10 + Math.random() * 24).toFixed(2) + '%';
    wrapper.style.animationDuration = (20 + Math.random() * 12).toFixed(2) + 's';

    var image = document.createElement('img');
    image.src = photos[Math.floor(Math.random() * photos.length)];
    image.alt = 'Memória do nosso amor';

    wrapper.appendChild(image);
    container.appendChild(wrapper);

    wrapper.addEventListener('animationend', function () {
      wrapper.remove();
    });
  }

  function initMeteors() {
    var scene = document.getElementById('meteors-scene');
    if (!scene) {
      return;
    }

    clearIntervals();
    scene.innerHTML = '';

    createStars(scene);
    var photos = meteorImages();

    intervals.push(window.setInterval(function () {
      createMeteorPhrase(scene);
    }, 4200));

    intervals.push(window.setInterval(function () {
      if (Math.random() > 0.26) {
        createMeteorImage(scene, photos);
      }
    }, 9800));

    for (var index = 0; index < 2; index++) {
      window.setTimeout(function () {
        createMeteorPhrase(scene);
      }, index * 1600);
    }
  }

  window.MemoriesMeteors = {
    init: initMeteors
  };
})();
