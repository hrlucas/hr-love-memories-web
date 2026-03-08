(function () {
  var referenciaRelacionamento = new Date('2024-09-24T00:00:00-03:00');

  function formatarNumero(numero) {
    return String(numero).padStart(2, '0');
  }

  function atualizarContador() {
    var agora = new Date();
    var diferenca = Math.max(0, agora.getTime() - referenciaRelacionamento.getTime());

    var totalSegundos = Math.floor(diferenca / 1000);
    var dias = Math.floor(totalSegundos / 86400);
    var horas = Math.floor((totalSegundos % 86400) / 3600);
    var minutos = Math.floor((totalSegundos % 3600) / 60);
    var segundos = totalSegundos % 60;

    var elementoDias = document.getElementById('contador-dias');
    var elementoHoras = document.getElementById('contador-horas');
    var elementoMinutos = document.getElementById('contador-minutos');
    var elementoSegundos = document.getElementById('contador-segundos');

    if (elementoDias) elementoDias.textContent = String(dias);
    if (elementoHoras) elementoHoras.textContent = formatarNumero(horas);
    if (elementoMinutos) elementoMinutos.textContent = formatarNumero(minutos);
    if (elementoSegundos) elementoSegundos.textContent = formatarNumero(segundos);
  }

  function calcularResumoNamoro() {
    var agora = new Date();
    var anos = agora.getFullYear() - referenciaRelacionamento.getFullYear();
    var meses = agora.getMonth() - referenciaRelacionamento.getMonth();
    var dias = agora.getDate() - referenciaRelacionamento.getDate();

    if (dias < 0) {
      meses -= 1;
      var diasNoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += diasNoMesAnterior;
    }

    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    return {
      anos: Math.max(0, anos),
      meses: Math.max(0, meses),
      dias: Math.max(0, dias)
    };
  }

  function atualizarResumoNamoro() {
    var resumo = calcularResumoNamoro();

    var elementoAnos = document.getElementById('resumo-anos');
    var elementoMeses = document.getElementById('resumo-meses');
    var elementoDias = document.getElementById('resumo-dias');

    if (elementoAnos) elementoAnos.textContent = String(resumo.anos);
    if (elementoMeses) elementoMeses.textContent = String(resumo.meses);
    if (elementoDias) elementoDias.textContent = String(resumo.dias);
  }

  function atualizarBlocoTempo() {
    atualizarContador();
    atualizarResumoNamoro();
  }

  function inicializarContador() {
    atualizarBlocoTempo();
    window.setInterval(atualizarBlocoTempo, 1000);
  }

  window.MemoriasContador = {
    inicializar: inicializarContador
  };
})();
