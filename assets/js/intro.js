(function () {
  function inicializarIntro() {
    var botaoAmoTe = document.getElementById('botao-amote');
    var primeiraSecao = document.getElementById('timeline');

    if (!botaoAmoTe || !primeiraSecao) {
      return;
    }

    botaoAmoTe.addEventListener('click', function () {
      primeiraSecao.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  window.MemoriasIntro = {
    inicializar: inicializarIntro
  };
})();
