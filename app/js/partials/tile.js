var tile = (function() {

    var viewSingle = ".view__item-one",
        viewTile = ".view__item-two",
        tileWrapperName = ".output__many-watermark",
        singleWrapperName = ".output__watermark-result",
        tileInnerName = ".watermarks",
        backgroundName = ".img-display",
        singleWatermarkName = "#watermark-display",
        tileItemClass = "wm__tile",
        tileItem = "." + tileItemClass,
        multiplier = 5;

    var imageWidth,
        imageHeight,
        watermarkWidth,
        watermarkHeight;

    var currentOpacity,
        isGenerated = false;

    function _init() {

        $(viewSingle).on("click", function(){

            _updateSizes();

            $(tileWrapperName).show();
            $(singleWrapperName).hide();

            _generate();

            _setOpacity(currentOpacity);
        });

        $(viewTile).on("click", function(){
            $(tileWrapperName).hide();
            $(singleWrapperName).show();
        });

    }

    function _generate(){

        var tileCount = multiplier * (imageWidth / watermarkWidth + 1) *
            (imageHeight / watermarkHeight + 1);

        var tileInner = $(tileInnerName);

        for (var i = 0; i < tileCount; ++i) {
            var img = $('<img/>');

            img.attr({
                'src': $(singleWatermarkName).attr('src'),
                'class': tileItemClass
            });

            img.css({
                'display': 'block',
                'width': watermarkWidth + "px",
                'height': watermarkHeight + "px",
                'float': 'left'
            });

            img.appendTo(tileInner);
        }

        isGenerated = true;
    }

    function _setMarginHorizontal(marginX) {
        console.log("_setMarginHorizontal", marginX);
        $(tileItem).css("margin-right", marginX + "px");
    }

    function _setMarginVertical(marginY) {
        console.log("_setMarginVertical", marginY);
        $(tileItem).css("margin-bottom", marginY + "px");
    }

    function _setOpacity(value){
        currentOpacity = value;

        console.log("_setOpacity", currentOpacity);
        console.log("isGenerated ", isGenerated);

        if (isGenerated){
            $(tileItem).css("opacity", value);
        }
    }

    function _reset(){
        $(tileInnerName).empty();

        _updateSizes();
    }

    function _updateSizes(){
        imageWidth = $(backgroundName).width();
        imageHeight = $(backgroundName).height();

        watermarkWidth = $(singleWatermarkName).width();
        watermarkHeight = $(singleWatermarkName).height();
    }

    return {
        init: _init,
        generate: _generate,
        setMarginHorizontal: _setMarginHorizontal,
        setMarginVertical: _setMarginVertical,
        opacity: _setOpacity,
        reset: _reset
    }

})();

tile.init();
