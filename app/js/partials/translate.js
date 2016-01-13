
$.html5Translate = function(dict, lang){
    
    $('[data-translate-key]').each(function(){
        $(this).html( dict[ lang ][ $(this).data('translateKey') ] );
    });
    
};
$(function(){
    $('.language__btn-eng').click(function(event) {
       $.html5Translate(dict, 'en');
    });
    $('.language__btn-rus').click(function(event) {
       $.html5Translate(dict, 'ru');
    });
});
