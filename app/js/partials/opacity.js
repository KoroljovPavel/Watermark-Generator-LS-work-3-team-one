var opacity = function(){

    // Определяем ватермарк и блок со слайдером
    var watermark = $('.watermark-display'),
        slider = $('#opacity');


    var initOpacity = watermark.css('opacity');
    console.log(initOpacity);

    slider.slider({range: 'min',
                   value: initOpacity*100});


    var init = function(){
        _setUpListeners();
        tile.opacity(initOpacity);
    };

    var _setUpListeners = function(){
        slider.on( "slide", function( event, ui ) {
            var opacity = ui.value/100;

            watermark.watermark("opacity", opacity);
            tile.opacity(opacity);

            slider.data('opacity', opacity).attr('data-opacity',opacity);
        });
    };

    return {
        init: init
    }

}();

opacity.init();