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
        $(".x-pos").on("change", function(){
            _lineX();
        });
        $(".y-pos").on("change", function(){
            _lineY();
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
 
        tileInner.css('margin-top', -imageHeight * 2 + 'px');

        isGenerated = true;
    }

    function _setMarginHorizontal(marginX) {
        console.log("_setMarginHorizontal", marginX);

        var value = marginX*upload.scaleRatio().scale;
        $(tileItem).css("margin-right", value + "px");
    }

    function _setMarginVertical(marginY) {
        console.log("_setMarginVertical", marginY);

        var value = marginY*upload.scaleRatio().scale;
        $(tileItem).css("margin-bottom", value + "px");
    }

    function _setOpacity(value){
        currentOpacity = value;

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

    function _lineX(){ 
        var xValue = $("#coordinate-line-y").val();
        var newValue = xValue * upload.scaleRatio().scale;

            var newlineWidth = Math.ceil((newValue * 105) / (watermarkWidth * 2 + newValue))
             $(".position-lines-y").css({
                 'width': newlineWidth + "px"
              });
    }
    function _lineY(){ 
        var yValue = $("#coordinate-line-x").val();
        var newValue = yValue * upload.scaleRatio().scale;

            var newlineHeight = Math.ceil((newValue * 100) / (watermarkHeight * 2 + newValue))
             $(".position-lines-x").css({
                 'height': newlineHeight + "px"
              });
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
