(function($) {

    var _positionNames = ["top", "left"];

    function _setCss(block, property, value){
        console.log("_setCss", block, property, value);

        block.css(property, value);
    }

    function _setPosition(me, property, offset){

        if ($.inArray(property, _positionNames) < 0){
            $.error("Wrong position property: " + property + ", expected: " + _positionNames);
            return;
        }

        var posValue = parseInt(me.css(property));

        if (!$.isNumeric(posValue)){
            console.log("value of " + property + " is not numeric, setting to zero");
            posValue = 0;
        }
        posValue += offset;
        me.css(property, posValue);
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

            _setPosition($(this), "top", -offset);

            return this;
        },

        move_down:function(offset) {
            console.log("move_down", offset);

            _setPosition($(this), "top", offset);

            return this;
        },

        move_left:function(offset) {
            console.log("move_left", offset);

            _setPosition($(this), "left", -offset);

            return this;
        },

        move_right:function(offset) {
            console.log("move_right", offset);

            _setPosition($(this), "left", offset);

            return this;
        },

        opacity:function(value) {
            console.log("opacity", value);

            $(this).css("opacity", value);

            return this;
        }
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