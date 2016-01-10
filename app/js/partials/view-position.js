$(function() {
		$('.view__item-one').click(function(event){
			event.preventDefault();
			console.log('первый вид')
      		$('.manipulation__item_position-block--lines').show();
     		$('.manipulation__item_position-block--cells').hide();
    });
		$('.view__item-two').click(function(event){
			event.preventDefault();
			console.log('второй вид')
			$('.manipulation__item_position-block--cells').show();
			$('.manipulation__item_position-block--lines').hide();
		});
});

