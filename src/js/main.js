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
    $session.addClass('pop');
  });

  $(".remove").click(function() {
    $(".session-info").removeClass('pop');
  });
  
});
