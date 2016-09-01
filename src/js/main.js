$(document).ready(function() {
  $('.right.menu.open').on("click",function(e){
    e.preventDefault();
    $('.ui.vertical.menu').toggle();
  });

  $('.ui.dropdown').dropdown();

  $(".open").click(function() {
    var name = $(this).parents('div.speaker-wrapper').attr('data-name');
    var job = $(this).parents('div.speaker-wrapper').attr('data-job');
    var image = $(this).parents('div.speaker-wrapper').attr('data-image');
    var title = $(this).parents('div.speaker-wrapper').attr('data-title');
    var dsecription = $(this).parents('div.speaker-wrapper').attr('data-dsecription');
    var twitter = $(this).parents('div.speaker-wrapper').attr('data-twitter');

    var $session = $('.session-info');
    $session.find('.name').html(name);
    $session.find('.job').html(job);
    $session.find('.description').html(dsecription);
    // $session.find('.time').html(time);
    $session.find('.title').html(title);
    $session.find('.image img').attr('src', 'images/' + image);
    $session.find('.social').html('');

    if (twitter) {
      var $social = $session.find('.social');
      $social.append('<a class="twitter" href="https://twitter.com/' +  twitter + '" target="_blank"><i class="twitter icon"></i>' + twitter + '</a>');
    }

    $session.addClass('pop');
  });

  $(".remove").click(function() {
    $(".session-info").removeClass('pop');
  });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 60
        }, 800);
        return false;
      }
    }
  });
  
});
