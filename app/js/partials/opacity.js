var opacity = function(){

    // Определяем ватермарк и блок со слайдером
    var watermark = $('.watermark-display'),
        slider = $('#slider');

    slider.slider({range: 'min',
                    value: watermark.css('opacity')*100});


    var init = function(){
        _setUpListeners();
    };

    var _setUpListeners = function(){
        $(slider).bind( "slide", _setOpacity);
    };

    var _setOpacity = function(e, ui){
        watermark.watermark('opacity', slider.slider("option", "value")/100);
    };



    return {
        init: init
    }

}();


opacity.init();