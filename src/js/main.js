$(document).ready(function() {
  $('.right.menu.open').on("click",function(e){
    e.preventDefault();
    $('.ui.vertical.menu').toggle();
  });

  $('.ui.dropdown').dropdown();

  $(".open").click(function() {
    debugger;
    $(".session-info").addClass('pop');
  });

  $(".remove").click(function() {
    $(".session-info").removeClass('pop');
  });
});

