$(document).ready(function() {
    var ticking = false;
    var lastScrollY = 0;
    var scrollY = 0;
  
    $(window).scroll(function() {
      scrollY = $(this).scrollTop();
  
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (scrollY > lastScrollY) {
            // Прокрутка вниз
            $('html, body').stop().animate({ scrollTop: scrollY + 150 }, 500, 'easeOutCubic');
          } else {
            // Прокрутка вверх
            $('html, body').stop().animate({ scrollTop: scrollY - 150 }, 500, 'easeOutCubic');
          }
  
          lastScrollY = scrollY;
          ticking = false;
        });
  
        ticking = true;
      }
    });
  });