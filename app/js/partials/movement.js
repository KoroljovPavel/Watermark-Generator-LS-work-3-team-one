var movement = function() {

	// Для работы данного модуля используются методы плагина watermark.js

	// Определяем блок с водяным знаком и переменные для его координат
	var image = $('.output__watermark-result'),
		left,
		top;

	var init = function() {
		_setUpListners();
	};

	// Вешаем обработчики
	var _setUpListners = function() {
		$('.x-up').on('click', {method: 'move_right', param: 1}, _changePositionArrow);
		$('.x-down').on('click', {method: 'move_left', param: 1}, _changePositionArrow);
		$('.y-up').on('click', {method: 'move_up', param: 1}, _changePositionArrow);
		$('.y-down').on('click', {method: 'move_down', param: 1}, _changePositionArrow);
		$('.x-pos').on('change', _changePositionInput);
		$('.y-pos').on('change', _changePositionInput);
		$('.x-pos').on('keypress', _noSubmit);
		$('.y-pos').on('keypress', _noSubmit);
		for (var i = 1; i <= 9; i += 1) {
			$('.cell' + i).on('click', {number: i}, _changePositionGrid)
		};
	};

	// Смена координат с помощью стрелочек
	var _changePositionArrow = function(event) {
		event.preventDefault();
		image.watermark(event.data.method, event.data.param);
		findPosition(image);
	};

	// Смена координат с помощью инпутов
	var _changePositionInput = function(event) {
		event.preventDefault();
		if ($(this).hasClass('x-pos')) {
			image.css('left', $(this).val() + 'px');	
		} else {
			image.css('top', -$(this).val() + 'px');
		};
	};

	// Обработка нажатия клавиши Enter при вводе координат в инпуты
	var _noSubmit = function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			$(this).trigger('change');
		};
	};

	// Смена координат с помощью сетки
	var _changePositionGrid = function(event) {
		console.log($(this));
		switch (event.data.number) {
			case 1:
				image.watermark('position_at', 'left', 'top');
				findPosition(image);
				break;
			case 2:
				image.watermark('position_at', 'center', 'top');
				findPosition(image);

				break;
			case 3:
				image.watermark('position_at', 'right', 'top');
				findPosition(image);
				break;
			case 4:
				image.watermark('position_at', 'left', 'center');
				findPosition(image);
				break;
			case 5:
				image.watermark('position_at', 'center', 'center');
				findPosition(image);
				break;
			case 6:
				image.watermark('position_at', 'right', 'center');
				findPosition(image);
				break;
			case 7:
				image.watermark('position_at', 'left', 'bottom');
				findPosition(image);
				break;
			case 8:
				image.watermark('position_at', 'center', 'bottom');
				findPosition(image);
				break;
			case 9:
				image.watermark('position_at', 'right', 'bottom');
				findPosition(image);
				break;
		};
	};

	// Запись текущих координат в инпуты
	var findPosition = function(block) {
		left = block.css('left');
		top = block.css('top');
		$('.x-pos').val(left.substr(0, left.length - 2));
		$('.y-pos').val(-top.substr(0, top.length - 2));
	};

	// Публичные методы
	return {
		init: init,
		findPosition: findPosition
	};

}();

// Инициируем модуль
movement.init();