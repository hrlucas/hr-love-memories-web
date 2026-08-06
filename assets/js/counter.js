(function () {
  var relationshipStart = new Date('2024-09-24T00:00:00-03:00');

  function formatNumber(number) {
    return String(number).padStart(2, '0');
  }

  function updateCounter() {
    var now = new Date();
    var diff = Math.max(0, now.getTime() - relationshipStart.getTime());

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    var daysElement = document.getElementById('counter-days');
    var hoursElement = document.getElementById('counter-hours');
    var minutesElement = document.getElementById('counter-minutes');
    var secondsElement = document.getElementById('counter-seconds');

    if (daysElement) daysElement.textContent = String(days);
    if (hoursElement) hoursElement.textContent = formatNumber(hours);
    if (minutesElement) minutesElement.textContent = formatNumber(minutes);
    if (secondsElement) secondsElement.textContent = formatNumber(seconds);
  }

  function calculateRelationshipSummary() {
    var now = new Date();
    var years = now.getFullYear() - relationshipStart.getFullYear();
    var months = now.getMonth() - relationshipStart.getMonth();
    var days = now.getDate() - relationshipStart.getDate();

    if (days < 0) {
      months -= 1;
      var daysInPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += daysInPreviousMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days)
    };
  }

  function updateRelationshipSummary() {
    var summary = calculateRelationshipSummary();

    var yearsElement = document.getElementById('summary-years');
    var monthsElement = document.getElementById('summary-months');
    var daysElement = document.getElementById('summary-days');

    if (yearsElement) yearsElement.textContent = String(summary.years);
    if (monthsElement) monthsElement.textContent = String(summary.months);
    if (daysElement) daysElement.textContent = String(summary.days);
  }

  function updateTimeBlock() {
    updateCounter();
    updateRelationshipSummary();
  }

  function initCounter() {
    updateTimeBlock();
    window.setInterval(updateTimeBlock, 1000);
  }

  window.MemoriesCounter = {
    init: initCounter
  };
})();
