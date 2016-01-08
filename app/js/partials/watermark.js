(function($) {

    var _positionNames = ["top", "left"];
    var isAtPosition = false;
    var atPositionHor, atPositionVert;

    function _setCss(block, property, value){
        console.log("_setCss", block, property, value);

        block.css(property, value);
    }

    function _setPosition(me, property, offset, isAbsOffset) {

        if ($.inArray(property, _positionNames) < 0) {
            $.error("Wrong position property: " + property + ", expected: " + _positionNames);
            return;
        }

        var posValue;

        if (isAbsOffset) {
            posValue = _getNum(offset, "offset");
        }else{
            posValue = _getNum(me.css(property), property) + _getNum(offset, "offset");
        }

        me.css(property, posValue);

        isAtPosition = false;
    }

    function _getNum(value, name){
        value = parseInt(value);

        if (!$.isNumeric(value)) {
            console.log("value of " + name + " is not numeric, setting to zero");
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

    //public
    var methods = {

        init:function(params) {
            var options = $.extend({}, defaults, params);

            return this;
        },

        image:function(imgPath) {
            console.log("image", imgPath);

            $(this).css("background-image", "url("+ imgPath +")");

            return this;
        },

        move_up:function(offset) {
            console.log("move_up", offset);

            _setPosition($(this), "top", -offset, false);

            return this;
        },

        move_down:function(offset) {
            console.log("move_down", offset);

            _setPosition($(this), "top", offset, false);

            return this;
        },

        move_left:function(offset) {
            console.log("move_left", offset);

            _setPosition($(this), "left", -offset, false);

            return this;
        },

        move_right:function(offset) {
            console.log("move_right", offset);

            _setPosition($(this), "left", offset, false);

            return this;
        },

        opacity:function(value) {
            console.log("opacity", value);

            $(this).css("opacity", value);

            return this;
        },

        position_at:function(valueHor, valueVert) {
            console.log("position_at", valueHor, valueVert);

            var me = $(this);

            if (!me.parent()){
                $.error("Watermark block must have parent");
            }

            var left = _getLeftPosition(valueHor, me),
                top = _getTopPosition(valueVert, me);
            console.log(top, left);

            me.css("top", top);
            me.css("left", left);

            isAtPosition = true;
            atPositionHor = valueHor;
            atPositionVert = valueVert;

            return this;
        },

        coordinate_x:function(x) {
            console.log("coordinate_x", x);

            _setPosition($(this), "left", x, true);

            return this;
        },

        coordinate_y:function(y) {
            console.log("coordinate_y", y);

            _setPosition($(this), "top", y, true);

            return this;
        },

        size_width:function(width) {
            console.log("size_width", width);

            var me = $(this);

            me.css("width", width);

            if (isAtPosition){
                methods.position_at.apply( this, [atPositionHor, atPositionVert] );
            }

            return this;
        },

        size_height:function(height) {
            console.log("size_height", height);

            var me = $(this);

            me.css("height", height);

            if (isAtPosition){
                methods.position_at.apply( this, [atPositionHor, atPositionVert] );
            }

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