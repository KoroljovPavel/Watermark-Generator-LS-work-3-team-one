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
        $.ajax({url:"php/merge.php", dataType: 'json'}).success(function(data){
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