var tile = (function() {

    var viewSingle = ".view__item-two",
        viewTile = ".view__item-one",
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
        currentMarginX = 0,
        currentMarginY = 0,
        isGenerated = false;

    function _init() {

        $(viewTile).on("click", function(){

            console.log("viewTile");

            _updateSizes();

            $(tileWrapperName).show();
            $(singleWrapperName).hide();

            _generate();

        });

        $(viewSingle).on("click", function(){

            console.log("viewSingle");

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

    function _generate() {

        if (isGenerated) return;

        console.log("_generate");

        var xCount = multiplier * (imageWidth / watermarkWidth + 1);
        var yCount = multiplier * (imageHeight / watermarkHeight + 1);
        var tileCount = xCount * yCount;

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

        _setOpacity(currentOpacity);
    }

    function _setMarginHorizontal(marginX) {

        currentMarginX = marginX;

        var value = marginX*upload.scaleRatio().scale;
        $(tileItem).css("margin-right", value + "px");
    }

    function _setMarginVertical(marginY) {

        currentMarginY = marginY;

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

        console.log("_reset");

        $(tileInnerName).empty();

        isGenerated = false;
        _updateSizes();
    }

    function _updateSizes(){
        imageWidth = $(backgroundName).width();
        imageHeight = $(backgroundName).height();

        $(tileInnerName).css('margin-top', imageHeight * -2);
		watermarkWidth = $(singleWatermarkName).data("scaled-width");
		watermarkHeight = $(singleWatermarkName).data("scaled-height");
    }

    function _lineX(){
        console.log("_lineX");
        var xValue = $("#coordinate-line-y").val();
        var newValue = xValue * upload.scaleRatio().scale;

        var newlineWidth = Math.ceil((newValue * 105) / (watermarkWidth * 2 + newValue));

        $(".position-lines-y").css({
            'width': newlineWidth + "px"
        });
    }

    function _lineY(){
        console.log("_lineY");
        var yValue = $("#coordinate-line-x").val();
        var newValue = yValue * upload.scaleRatio().scale;

        var newlineHeight = Math.ceil((newValue * 100) / (watermarkHeight * 2 + newValue));

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
