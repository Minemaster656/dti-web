$(document).ready(function() {
    var imageCount = Math.floor(Math.random() * 21) + 10; // Случайное количество картинок от 10 до 30
    var imageMaxSize = 1.25; // Максимальный размер картинки
    var imageMinSize = 0.5; // Минимальный размер картинки
    var maxIndex = 4; // Максимальное значение n
  
    for (var i = 0; i < imageCount; i++) {
      var n = Math.floor(Math.random() * maxIndex); // Случайное значение n от 0 до maxIndex
  
      var imageUrl = "/deco/bg/bg" + n + ".png"; // Формируем URL картинки
      var imageSize = Math.random() * (imageMaxSize - imageMinSize) + imageMinSize; // Случайный размер картинки
      var shiftMultiplier = Math.random(); // Множитель для сдвига
  
      // Создание элемента картинки и его стилизация
      var $image = $("<img>")
        .attr("src", imageUrl)
        .addClass("bg-image")
        .css({
          "width": imageSize * 100 + "%",
          "height": imageSize * 100 + "%",
          "top": shiftMultiplier * 100 + "vh"
        });
  
      // Добавление картинки на страницу
      $("body").append($image);
  
      // Добавление анимации сдвига вверх
      $image.css("animation", "shift-up " + (10 / shiftMultiplier) + "s linear infinite");
    }
  
    // Обновление позиции картинок при прокрутке страницы
    $(window).scroll(function() {
      $(".bg-image").each(function() {
        var currentShift = parseFloat($(this).css("top").replace("vh", "")); // Текущее значение сдвига
        var scrollPositionPercentage = ($(document).scrollTop() / ($(document).height() - $(window).height())) * 100; // Процент текущей прокрутки
  
        // Вычисление нового значения сдвига
        var newShift = currentShift + 0.5 - (scrollPositionPercentage / 100 * 0.5);
  
        $(this).css("top", newShift + "vh");
      });
    });
  
    // Обновление позиции картинок относительно курсора
    $(document).mousemove(function(e) {
      var mouseXPercentage = (e.pageX / $(window).width()) * 100; // Процент текущего положения курсора по горизонтали
  
      $(".bg-image").each(function() {
        var currentShift = parseFloat($(this).css("top").replace("vh", "")); // Текущее значение сдвига
  
        // Вычисление нового значения сдвига
        var newShift = currentShift - (1 - mouseXPercentage / 100) * 0.1;
  
        $(this).css("top", newShift + "vh");
      });
    });
  });