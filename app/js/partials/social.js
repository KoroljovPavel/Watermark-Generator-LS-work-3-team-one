
$(function() {
	$('.social__btn-open').mouseenter(function(event) {
		$('.socials').show('400')
	});
	$('.social__list').mouseleave(function(event) {
		$('.socials').hide();
	})
});


function socialopen(url){
	var winpar='width=500,height=400,left=' + ((window.innerWidth - 500)/2) + ',top=' + ((window.innerHeight - 400)/2) ;
	window.open(url,'tvkw',winpar);
}
	(function ($) {
		$(document).ready(function(e) {
		$('a.social__btn').click(function(){
		var loc = window.location.href; 
		var url = $(this).attr('href');
		socialopen(url + loc);

	return false;
	})
});
})(jQuery);