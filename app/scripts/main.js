$(function() {
  $.fn.lazyLoad = function() {
    return this.each(function() {
      var $this = $(this);
      if($this.data('loaded')){
        return;
      }

      var $a = $this.find('a'),
          imageUrl = $a.attr('href'), 
          $img = $('<img />').attr('src', imageUrl).attr('alt', '');

      $a.remove();
      $this.append($img).data('loaded', true);
      
    });
  }
  var $htmlNbody = $('html, body'),
      $slides = $('#slides');

  $(document).on('animating.slides', function(e, ss) {
    if(ss.upcoming_slide !== 0){
      $htmlNbody.animate({
          scrollTop: $slides.offset().top
      }, 400);
    }
    //$slides.find('li').eq(ss.upcoming_slide+1).lazyLoad();
  });

	$slides.superslides({
		slide_easing: 'easeInOutCubic',
		slide_speed: 800,
		pagination: true,
		hashchange: false,
		scrollable: true
	});
});
