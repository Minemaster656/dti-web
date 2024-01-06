$(document).ready(function() {
  console.log('main.js loaded');
  // Показать элементы страницы с плавным появлением при загрузке
  $('#page').fadeIn(500); // 500 миллисекунд = 0.5 секунды

  // Скрыть элементы страницы с плавным исчезновением при уходе со страницы
  $('a').click(function(e) {
    e.preventDefault(); // Отменить стандартное поведение ссылки

    $('#page').fadeOut(250, function() {
      window.location = $(e.target).attr('href'); // Перенаправить на ссылку после завершения скрытия
    });
  });

  function calc_levelByXP(xp) {
    const DIFFICULTY = 1.6;
    let level = Math.floor(Math.log((xp * (DIFFICULTY-1) / 100) + 1) / Math.log(DIFFICULTY));
    let xp_current = Math.round(xp - ((100 * (Math.pow(DIFFICULTY, level - 1) - 1)) / (DIFFICULTY-1)));
    let xp_next = Math.round(100 * (Math.pow(DIFFICULTY, level - 1)));
    return [level, xp_current, xp_next];
  }

  function calc_xpBarValue(xp) {
    let xps = calc_levelByXP(xp);
    return (xps[1] / xps[2]) * 100;
  }

  function calc_xpLevel(xp) {
    let xps = calc_levelByXP(xp);
    return xps[0];
  }
});