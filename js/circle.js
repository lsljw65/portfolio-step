/* Examples */
(function($) {
  /* function $canvasWidth(){
    var $canvas=$(".circle").width();
    $(".circle canvas").css({
      width:$canvas,
      height:$canvas
    })
  }
  
  $canvasWidth();
  $(window).resize(function(){
    $canvasWidth();
  }) */
  /*
   * Example 2:
   *
   * - default gradient
   * - listening to `circle-animation-progress` event and display the animation progress: from 0 to 100%
   */
  $('.photoshop.circle').circleProgress({
    value: 1
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });

  $('.ill.circle').circleProgress({
    value: 1
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });

  $('.figma.circle').circleProgress({
    value: 1
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });

  $('.html.circle').circleProgress({
    value: 1
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });

  $('.css.circle').circleProgress({
    value: 1
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });

  $('.javascript.circle').circleProgress({
    value: 1
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });


})(jQuery);
