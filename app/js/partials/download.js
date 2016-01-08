(function(){

var download = function() {
    // Переменные модуля

    var selectorBtn = ".downloadBtn"
        , downloadBtn = $(selectorBtn)
        , iframeTransport = null
    ;
    // Бдлок публичных методов

    var init = function() {
        //$('body').append('<iframe id="jjsdhfbjsdhvfhsdgf">');
        //iframeTransport =  $("#jjsdhfbjsdhvfhsdgf")
        //console.log(iframeTransport);
        _setUpListners(); 
    };

    // Блок приватных методов

    // Вешаем обработчик

    var _downloadStart = function(eventObj) {
        eventObj.preventDefault();
        $.ajax({url:"php/merge.php"}).success(function(data){ 
            //iframeTransport.src = "php/merge.php";
            window.location.href = 'php/download.php';
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