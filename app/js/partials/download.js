(function(){

var download = function() {
    // Переменные модуля

    var selectorBtn = ".downloadBtn"
        , downloadBtn = $(selectorBtn)
        , iframeTransport = null
    ;
    // Бдлок публичных методов

    var init = function() {
        _setUpListners(); 
    };

    // Блок приватных методов

    // Вешаем обработчик

    var _downloadStart = function(eventObj) {
        eventObj.preventDefault();
        var actionType = $(".view__item-one").hasClass("active") ? "tiling" : "stamp";
        var ofsetX = (actionType === 'stamp') ? $("#coordinate-cell-x").val() : 
                (parseInt($(".watermarks").css('left'), 10) / upload.scaleRatio().scale);
        var ofsetY = (actionType === 'stamp') ? $("#coordinate-cell-y").val() : 
                (parseInt($(".watermarks").css('top'), 10) / upload.scaleRatio().scale);
        console.log('ofsetX: ' + ofsetX + '\nofsetY: ' + ofsetY);
        $.ajax({url:"php/merge.php", 
            data: {
                type: actionType,
                ofsetX: ofsetX,
                ofsetY: ofsetY,
                paddingX: $("#coordinate-line-y").val(),
                paddingY: $("#coordinate-line-x").val(),
                opacity: ($("#opacity").data("opacity"))
            }, 
            type: "post", dataType: 'json'}
            )

        .success(function(data){
            if (data.status === "success")
            {
                window.location.href = 'php/download.php';
            } else {
                alert("Произошла непредвиденная ошибка. Не удалось склеить файлы.");
            }
        });
    };

    var _setUpListners = function() {
        downloadBtn.on("click", {}, _downloadStart);
    };

    return {
        init: init
    };
}();


// Инициируем модуль
download.init();


}());