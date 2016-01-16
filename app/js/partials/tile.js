var tile = function() {

	var imageWidth, imageHeight, watermarkWidth, watermarkHeight,
  tileCount, tileInner;

	var init = function() {
    imageWidth = $(".img-display").width();
    imageHeight = $(".img-display").height();
    
    watermarkWidth = $('.watermark-display').width();
    watermarkHeight = $('.watermark-display').height();
    
    tileCount = (3 * imageWidth / watermarkWidth + 1) * 
        (3 * imageHeight / watermarkHeight + 1);
    
     tileInner = $(".watermarks");

    for (var i = 0; i < tileCount; i++) {
      var img = $('<img/>');
      img.attr({
        'src': $('#watermark-display').attr('src'),
        'class': 'wm__tile'
      });
      img.css({
        'display': 'block',
        'width': watermarkWidth,
        'height': watermarkHeight,
        'float': 'left'
      });
      img.appendTo($(tileInner));
    }
  }
  
  var setMarginGorizontal = function(marginX) {
  	$('.wm').css("margin-right", marginX);
  }
  var setMarginVertical = function(marginY) {
    $('.wm').css("margin-bottom", marginY);
  }
  
  var show = function() {
    $('.view__item-one').click(function(event) {
      $('.output__many-watermark').show();
    });
  	
  }
  
  var hide = function() {
    $('.view__item-two').click(function(event) {
      $('.output__many-watermark').hide();
    });
  }
  
  return {
  	init: init,
    setMarginGorizontal: setMarginGorizontal,
    setMarginVertical: setMarginVertical,
    show: show,
    hide: hide
  }

}();

tile.init();

