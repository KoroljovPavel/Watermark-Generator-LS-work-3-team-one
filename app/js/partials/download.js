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
        $.ajax({url:"php/merge.php", 
            data: {
                type: actionType,
                ofsetX: $("#coordinate-cell-x").val(),
                ofsetY: $("#coordinate-cell-y").val(),
                paddingX: $("#coordinate-line-x").val(),
                paddingY: $("#coordinate-line-y").val(),
                opacity: ($("#opacity").data("opacity"))
            }, 
            type: "post", dataType: 'json'}
            )

        .success(function(data){
            if (data.status === "success")
            {
                window.location.href = 'php/download.php';
            } else {
                console.log(data);
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