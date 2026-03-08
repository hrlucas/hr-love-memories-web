(function () {
  var FRASES_METEORO = [
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

  var intervalos = [];

  function fraseAleatoria() {
    return FRASES_METEORO[Math.floor(Math.random() * FRASES_METEORO.length)];
  }

  function imagensMeteoro() {
    var lista = [];
    for (var indice = 1; indice <= 12; indice++) {
      lista.push('assets/img/gallery/provas-do-meu-amor/' + indice + '-prova-do-meu-amor-por-voce.jpg');
    }
    return lista;
  }

  function limparIntervalos() {
    intervalos.forEach(function (id) {
      window.clearInterval(id);
    });
    intervalos = [];
  }

  function criarEstrelas(container) {
    var total = window.matchMedia('(max-width: 768px)').matches ? 52 : 104;
    for (var i = 0; i < total; i++) {
      var estrela = document.createElement('span');
      estrela.className = 'meteoro-estrela';
      estrela.style.left = (Math.random() * 100).toFixed(2) + '%';
      estrela.style.top = (Math.random() * 100).toFixed(2) + '%';
      estrela.style.opacity = (0.18 + Math.random() * 0.62).toFixed(2);
      estrela.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      container.appendChild(estrela);
    }
  }

  function contarAtivos(container, seletor) {
    return container.querySelectorAll(seletor).length;
  }

  function criarMeteoroFrase(container) {
    var limite = window.matchMedia('(max-width: 768px)').matches ? 3 : 4;
    if (contarAtivos(container, '.meteoro-frase') >= limite) {
      return;
    }

    var item = document.createElement('span');
    item.className = 'meteoro-frase';
    item.textContent = fraseAleatoria();
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

  function criarMeteoroImagem(container, fotos) {
    var limite = window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
    if (contarAtivos(container, '.meteoro-imagem') >= limite) {
      return;
    }

    var wrapper = document.createElement('span');
    wrapper.className = 'meteoro-imagem';
    wrapper.style.left = (70 + Math.random() * 28).toFixed(2) + '%';
    wrapper.style.top = (-10 + Math.random() * 24).toFixed(2) + '%';
    wrapper.style.animationDuration = (20 + Math.random() * 12).toFixed(2) + 's';

    var imagem = document.createElement('img');
    imagem.src = fotos[Math.floor(Math.random() * fotos.length)];
    imagem.alt = 'Memória do nosso amor';

    wrapper.appendChild(imagem);
    container.appendChild(wrapper);

    wrapper.addEventListener('animationend', function () {
      wrapper.remove();
    });
  }

  function inicializarMeteoros() {
    var cena = document.getElementById('meteoros-cena');
    if (!cena) {
      return;
    }

    limparIntervalos();
    cena.innerHTML = '';

    criarEstrelas(cena);
    var fotos = imagensMeteoro();

    intervalos.push(window.setInterval(function () {
      criarMeteoroFrase(cena);
    }, 4200));

    intervalos.push(window.setInterval(function () {
      if (Math.random() > 0.26) {
        criarMeteoroImagem(cena, fotos);
      }
    }, 9800));

    for (var indice = 0; indice < 2; indice++) {
      window.setTimeout(function () {
        criarMeteoroFrase(cena);
      }, indice * 1600);
    }
  }

  window.MemoriasMeteoros = {
    inicializar: inicializarMeteoros
  };
})();