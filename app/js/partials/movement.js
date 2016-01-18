var movement = function() {

	// Для работы данного модуля используются методы плагина watermark.js

	// Определяем блок с водяным знаком и переменные для его координат
	var image = $('.output__watermark-result'),
		wmTile = $('.watermarks'),
		tileContainer = $('.output__many-watermark'),
		left,
		top,
		info;

	var init = function() {
		_setUpListners();
		_changePositionDrag();
		_tileDrag();
	};

	var mouseInterval;

	var handlers = {
		".x-up": {
			"input": ".x-pos",
			"param": 1
		},
		".x-down": {
			"input": ".x-pos",
			"param": -1
		},
		".y-up": {
			"input": ".y-pos",
			"param": 1
		},
		".y-down": {
			"input": ".y-pos",
			"param": -1
		}
	};

	// Вешаем обработчики
	var _setUpListners = function() {

		$.each( handlers, function( handlerName, value ) {
			var eventObject = {input: $(value["input"]), param: value["param"]};

			$(handlerName).on('click', eventObject, _changePositionArrow);
			$(handlerName).on("mousedown", eventObject, _changePositionContinious);
			$(handlerName).on("mouseup mouseleave", function () {
				clearInterval(mouseInterval)
			});
		});

		$('.x-pos').on('change', _changePositionInput);
		$('.y-pos').on('change', _changePositionInput);
		$('.x-pos').on('keypress', _noSubmit);
		$('.y-pos').on('keypress', _noSubmit);

		for (var i = 1; i <= 9; i += 1) {
			$('.cell' + i).on('click', {number: i}, _changePositionGrid)
		};
		$('.reset-btn').on('click', _resetPosition);
	};

	function _changePositionContinious(e){
		mouseInterval = setInterval(function(){
			_changePositionArrow(e);
		}, 100);
	}

	// Смена координат с помощью стрелочек
	var _changePositionArrow = function(event) {
		event.preventDefault();

		//not $(this) because is called from _changePositionContinious
		var me = $(event.target);
		var input = event.data.input.filter("[data-view=" + me.data("view") + "]");

		var val = +input.val() + event.data.param;

		input.val(val);

		input.trigger('change');
	};

	// Смена координат с помощью инпутов
	var _changePositionInput = function(event) {
		event.preventDefault();
		_InputsRound();

		var me = $(this);

		var isSingleView = me.data("view") == "single";

		// Проверки на соответствие границам
		if (me.val() < 0) {
			me.val(0);
		}

		if (isSingleView){
			info = upload.scaleRatio();
			if (me.hasClass('x-pos')) {
				if (me.val() > Math.round(info.bgWidth - info.wmWidth * info.scale)) {
					me.val(Math.round(info.bgWidth - info.wmWidth * info.scale));
				}
				image.watermark('coordinate_x', $(this).val() / info.scale);
			} else {
				if (me.val() > Math.round(info.bgHeight - info.wmHeight * info.scale)) {
					me.val(Math.round(info.bgHeight - info.wmHeight * info.scale));
				}
				image.watermark('coordinate_y', me.val() / info.scale);
			}
		}else {
			if (me.hasClass('x-pos')) {
				//tile, hor margin
				tile.setMarginHorizontal($(this).val());
			} else {
				//tile, vert margin
				tile.setMarginVertical($(this).val());
			}
		}
		_InputsRound();
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
		_InputsRound();
	};

	// Смена координат с помощью мыши
	var _changePositionDrag = function() {
		image.draggable({
			cursor: 'move',
			containment: 'parent',
	        drag: function(event, ui) {
				info = upload.scaleRatio();
				$('.x-pos[data-view=single]').val(ui.position.left / info.scale * info.secondScale);
				$('.y-pos[data-view=single]').val(ui.position.top / info.scale * info.secondScale);
				$('.x-pos[data-view=single]').trigger('change');
				$('.y-pos[data-view=single]').trigger('change');
			}
		});
	};

	// Смена координат замощения с помощью мыши
	var _tileDrag = function() {
		wmTile.draggable({
			cursor: 'move',
			stop: function(event, ui) {
				tileTop = ui.position.top;
				tilePaddingY = $('.wm__tile').css('margin-bottom');
				tilePaddingY = +tilePaddingY.substr(0, tilePaddingY.length - 2);
				tileH = $('.wm__tile').css('height');
				tileH = +tileH.substr(0, tileH.length - 2);
				tileLeft = ui.position.left;
				tilePaddingX = $('.wm__tile').css('margin-right');
				tilePaddingX = +tilePaddingX.substr(0, tilePaddingX.length - 2);
				tileW = $('.wm__tile').css('width');
				tileW = +tileW.substr(0, tileW.length - 2);
				wmTile.css('top', tileTop % (tileH + tilePaddingY));
				wmTile.css('left', tileLeft % (tileW + tilePaddingX));
			}
		});
	};

	// Запись текущих координат в инпуты
	var findPosition = function(block) {
		info = upload.scaleRatio();
		left = block.css('left');
		top = block.css('top');
		$('.x-pos[data-view=single]').val(left.substr(0, left.length - 2) / info.scale);
		$('.y-pos[data-view=single]').val(top.substr(0, top.length - 2) / info.scale);
	};

	// Округление значений в инпутах до целых чисел
	var _InputsRound = function() {
		var xInput = $('.x-pos[data-view=single]');
		var yInput = $('.y-pos[data-view=single]');

		xInput.val(Math.round(xInput.val()));
		yInput.val(Math.round(yInput.val()));
	};

	// Сброс позиции
	var _resetPosition = function(event) {
		event.preventDefault();
		$('.x-pos').val(0);
		$('.y-pos').val(0);
		$('.x-pos').trigger('change');
		$('.y-pos').trigger('change');
		opacity.resetOpacity();
	};

	// Публичные методы
	return {
		init: init,
		findPosition: findPosition
	};

}();

// Инициируем модуль
movement.init();