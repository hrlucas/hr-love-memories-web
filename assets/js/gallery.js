(function () {
  var galleryItems = [];
  var currentIndex = 0;
  var currentGalleryData = null;
  var resizeTimer = null;
  var defaultCaptions = [
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

  function buildGalleryFallback() {
    var items = [];
    for (var index = 1; index <= 45; index++) {
      items.push({
        src: 'assets/img/gallery/provas-do-meu-amor/' + index + '-prova-do-meu-amor-por-voce.jpg',
        alt: 'Prova do meu amor por você ' + index,
        caption: defaultCaptions[(index - 1) % defaultCaptions.length]
      });
    }

    return {
      subtitle: 'Cada foto guarda um instante. Cada instante guarda um pedaço do meu amor por você.',
      items: items,
      captionLines: defaultCaptions
    };
  }

  function updateLightbox() {
    var image = document.getElementById('lightbox-image');
    var caption = document.getElementById('lightbox-caption');

    if (!image || !caption || !galleryItems[currentIndex]) {
      return;
    }

    var item = galleryItems[currentIndex];
    image.src = item.src;
    image.alt = item.alt || 'Imagem da nossa galeria';
    caption.textContent = item.caption || '';
  }

  function openLightbox(index) {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox || !galleryItems.length) {
      return;
    }

    currentIndex = index;
    updateLightbox();
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  function createGalleryCard(item, index) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'gallery__card reveal';
    card.style.setProperty('--delay', index * 38 + 'ms');

    card.innerHTML =
      '<span class="gallery__media">' +
      '<img loading="lazy" src="' + item.src + '" alt="' + (item.alt || 'Foto da nossa história') + '">' +
      '</span>';

    card.addEventListener('click', function () {
      openLightbox(index);
    });

    return card;
  }

  function createCaptionLine(text, index) {
    var line = document.createElement('p');
    line.className = 'gallery__phrase-line reveal';
    line.setAttribute('data-caption-line', 'true');
    line.style.setProperty('--delay', index * 70 + 'ms');
    line.textContent = text;
    return line;
  }

  function extractCaptionLines(data) {
    if (data && Array.isArray(data.captionLines) && data.captionLines.length) {
      return data.captionLines.filter(function (caption) {
        return typeof caption === 'string' && caption.trim();
      });
    }

    if (data && Array.isArray(data.items)) {
      var uniqueCaptions = [];
      data.items.forEach(function (item) {
        if (!item || !item.caption) {
          return;
        }

        if (uniqueCaptions.indexOf(item.caption) === -1) {
          uniqueCaptions.push(item.caption);
        }
      });

      if (uniqueCaptions.length) {
        return uniqueCaptions;
      }
    }

    return defaultCaptions.slice();
  }

  function getItemsPerRow() {
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

  function renderGallery(data) {
    var container = document.getElementById('gallery-grid');
    var subtitle = document.getElementById('gallery-subtitle');

    if (!container || !data || !Array.isArray(data.items)) {
      return;
    }

    currentGalleryData = data;

    if (subtitle && data.subtitle) {
      subtitle.textContent = data.subtitle;
    }

    galleryItems = data.items.filter(function (item) {
      return item && item.src;
    });

    var captionLines = extractCaptionLines(data);
    var itemsPerRow = getItemsPerRow();
    var captionIndex = 0;

    container.innerHTML = '';

    if (galleryItems.length) {
      container.appendChild(createCaptionLine(captionLines[captionIndex % captionLines.length], captionIndex));
    }

    galleryItems.forEach(function (item, index) {
      container.appendChild(createGalleryCard(item, index));

      var isRowEnd = (index + 1) % itemsPerRow === 0;
      var hasMoreItems = index < galleryItems.length - 1;

      if (isRowEnd && hasMoreItems) {
        captionIndex += 1;
        container.appendChild(createCaptionLine(captionLines[captionIndex % captionLines.length], captionIndex));
      }
    });
  }

  function setupRowResponsiveness() {
    window.addEventListener('resize', function () {
      if (!currentGalleryData) {
        return;
      }

      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(function () {
        renderGallery(currentGalleryData);
      }, 160);
    });
  }

  function setupLightbox() {
    var closeButton = document.getElementById('lightbox-close');
    var lightbox = document.getElementById('lightbox');

    if (!lightbox) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    if (closeButton) {
      closeButton.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', function (event) {
      if (!lightbox.hidden && event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  function initGallery() {
    setupLightbox();
    setupRowResponsiveness();

    fetch('assets/data/gallery.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('gallery unavailable');
        }
        return response.json();
      })
      .then(renderGallery)
      .catch(function () {
        renderGallery(buildGalleryFallback());
      });
  }

  window.MemoriesGallery = {
    init: initGallery
  };
})();
