(function($) {

    var _defaults = {
        scale: 1
    };
    var _options = _defaults;
    var _positionNames = ["top", "left"];
    var isAtPosition = false;
    var atPositionHor, atPositionVert;

    function _setCss(block, property, value){

        block.css(property, value);
    }

    function _setPosition(me, property, offset, isAbsOffset) {

        if ($.inArray(property, _positionNames) < 0) {
            $.error("Wrong position property: " + property + ", expected: " + _positionNames);
            return;
        }

        var posValue;

        /*
        if (isAbsOffset) {
            posValue = _getNum(offset, "offset") * upload.scaleRatio().scale;
        }else{
            posValue = _getNum(me.css(property), property) + _getNum(offset, "offset");
        }
        */

        posValue = _getNum(offset, "offset") * upload.scaleRatio().scale;
        
        me.css(property, posValue);

        isAtPosition = false;
        console.log('posValue: ' + posValue);
    }

    function _getNum(value, name){
        value = parseInt(value);

        if (!$.isNumeric(value)) {
            value = 0;
        }

        return value;
    }

    function _getLeftPosition(horName, me){
        var left = 0;

        var parentWidth = me.parent().width();
        var myWidth = me.width();
        left = parseInt(me.parent().css("padding-left"));

        switch (horName){
            case fixedPosition.hor.left:
                left += 0;
                break;
            case fixedPosition.hor.center:
                left += (parentWidth - myWidth)/2;
                break;
            case fixedPosition.hor.right:
                left += parentWidth - myWidth;
                break;
            default:
                $.error("Unknown position " + horName + ", use {left, center, right} instead");
                break;
        }

        return left;
    }

    function _getTopPosition(vertName, me){
        var top = 0;

        var parentHeight = me.parent().height();
        var myHeight = me.height();
        top = parseInt(me.parent().css("padding-top"));

        switch (vertName){
                case fixedPosition.vert.top:
                    top += 0;
                    break;
                case fixedPosition.vert.center:
                    top += (parentHeight - myHeight)/2;
                    break;
                case fixedPosition.vert.bottom:
                    top += parentHeight - myHeight;
                    break;
                default:
                    $.error("Unknown position " + vertName + ", use {top, center, bottom} instead");
                    break;
            }

        return top;
    }

    function _checkParent(me){
        if (!me.parent()){
            $.error("Watermark block must have parent");
        }
    }

    function _size(me, value, property) {

        me.css(property, value);

        if (isAtPosition){
            _position_at( me, atPositionHor, atPositionVert );
        }

        return this;
    }

    function _position_at(me, valueHor, valueVert){
        _checkParent(me);

        var left = _getLeftPosition(valueHor, me),
            top = _getTopPosition(valueVert, me);

        me.css("top", top);
        me.css("left", left);

        isAtPosition = true;
        atPositionHor = valueHor;
        atPositionVert = valueVert;
    }

    //public
    var methods = {

        init:function(params) {
            var options = $.extend({}, _defaults, params);

            _options = params;

            return this;
        },

        image:function(imgPath) {

            var me = $(this);
            me.css("background-image", "url("+ imgPath +")");

            if (_options.scale != 1){
                _checkParent(me);


            }

            return this;
        },

        move_up:function(offset) {

            offset *= _options.scale;

            _setPosition($(this), "top", -offset, false);

            return this;
        },

        move_down:function(offset) {

            offset *= _options.scale;

            _setPosition($(this), "top", offset, false);

            return this;
        },

        move_left:function(offset) {

            offset *= _options.scale;

            _setPosition($(this), "left", -offset, false);

            return this;
        },

        move_right:function(offset) {

            offset *= _options.scale;

            _setPosition($(this), "left", offset, false);

            return this;
        },

        opacity:function(value) {

            $(this).css("opacity", value);

            return this;
        },

        position_at:function(valueHor, valueVert) {

            var me = $(this);

            _position_at(me, valueHor, valueVert);

            return this;
        },

        coordinate_x:function(x) {

            //x *= _options.scale;

            console.log('_options.scale: ' + _options.scale
                + '\n.secondScale' + upload.scaleRatio().secondScale
                + '\n.Scale' + upload.scaleRatio().scale
                );

            _setPosition($(this), "left", x, true);

            return this;
        },

        coordinate_y:function(y) {

            //y *= upload.scaleRatio().secondScale;

            _setPosition($(this), "top", y, true);

            return this;
        },

        size_width:function(width) {

            var me = $(this);

            width *= _options.scale;

            _size(me, width, "width");

            return this;
        },

        size_height:function(height) {

            var me = $(this);

            height *= _options.scale;

            _size(me, height, "height");

            return this;
        }
    };

    var fixedPosition = {
        hor:{
            left: "left",
            center: "center",
            right: "right"
        },
        vert:{
            top: "top",
            center: "center",
            bottom: "bottom"}
    };

    var fixedPositionHor = {
        left: "left",
        center: "center",
        right: "right"
    };

    $.fn.watermark = function(method){

        if ( methods[method] ) {
            // call method
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            // init with params
            return methods.init.apply( this, arguments );
        } else {
            $.error( "Method " +  method + " doesn't exist in jQuery.mySimplePlugin");
        }
    };

})(jQuery);