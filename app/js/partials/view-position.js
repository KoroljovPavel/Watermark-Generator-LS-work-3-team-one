$(function() {

	$(".img-display").load(function() {
		var height = $(this).height();
		var width = $(this).width();

		$('.output__image-result').css('width', width);
		$('.output__image-result').css('height', height);
	});

	$('.view__item-one').click(function(event){
			event.preventDefault();
			$('.view__item-one').addClass('active');
			$('.view__item-two').removeClass('active');
      		$('.manipulation__item_position-block--lines').show();
     		$('.manipulation__item_position-block--cells').hide();
    });
		$('.view__item-two').click(function(event){
			event.preventDefault();
			$('.view__item-two').addClass('active');
			$('.view__item-one').removeClass('active');
			$('.manipulation__item_position-block--cells').show();
			$('.manipulation__item_position-block--lines').hide();
		});
});
