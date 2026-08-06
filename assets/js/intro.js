(function () {
  function initIntro() {
    var loveYouButton = document.getElementById('love-you-button');
    var firstSection = document.getElementById('timeline');

    if (!loveYouButton || !firstSection) {
      return;
    }

    loveYouButton.addEventListener('click', function () {
      firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  window.MemoriesIntro = {
    init: initIntro
  };
})();
