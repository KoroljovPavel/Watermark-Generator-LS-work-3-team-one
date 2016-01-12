var opacity = function(){

    // Определяем ватермарк и блок со слайдером
    var watermark = $('.watermark-display'),
        slider = $('#opacity');

    slider.slider({range: 'min',
                   value: watermark.css('opacity')*100});


    var init = function(){
        _setUpListeners();
    };

    var _setUpListeners = function(){
        slider.on( "slide", function( event, ui ) {
            var opacity = ui.value/100;
                watermark.css('opacity', opacity);
                slider.data('opacity', opacity).attr('data-opacity',opacity);
        });
    };

    return {
        init: init
    }

}();

opacity.init();