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

     var resetOpacity = function() {
        slider.slider({value: 50});
        watermark.watermark('opacity', .5);
        slider.data('opacity', .5).attr('data-opacity', .5);
        tile.opacity(.5);
    };

    return {
        init: init,
        resetOpacity: resetOpacity
    }

}();

opacity.init();