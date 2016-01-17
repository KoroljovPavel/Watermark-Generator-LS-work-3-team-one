var upload = function() {

	// Для работы данного модуля используются методы плагина jquery.fileupload.js и модуля movement.js
	mainRatio = 0;
	// Определяем поля загрузки файлов
	var mainImage = $('.img-input'),
		watermark = $('.watermark-input'),
		wMark = $('.output__watermark-result'),
		preventAction = true,
		widthImage,
		heightImage,
		watermarkWidth,
		watermarkHeight,
		newWatermarkWidth,
		newWatermarkHeight,
		scale,
		secondScale,
		newScaleW,
		newScaleH,
		newHeightImage,
		newWidthImage;

	var backgroundUploaded = false,
		watermarkUploaded = false;

	$('#my_canvas').css("display:", 'none');

	$('.watermark-upload__inputs').css('opacity', '.5');

	$('.manipulation__list').css({
		'pointer-events' : 'none',
		'opacity'        : '.5'
	});

	$('.watermark-upload__inputs').click(function(e){

		if(preventAction){
			e.preventDefault();
			$('.image-upload__inputs').effect('pulsate', 'hide', 'slow');
		}else{
			watermark.attr('disabled', false);
		}
	});

	var init = function() {
		_setUpListners();
	};

	// Вешаем обработчик
	var _setUpListners = function() {
		_uploadImage(mainImage, mainImage.attr('name'));
		_uploadImage(watermark, watermark.attr('name'));
	};

	var _uploadImage = function(image, type) {

		// Определяем GET параметр
		var url = 'php/upload.php?fileType=' + type;

		image.fileupload({
			url: url,
			dataType: 'json',
			add: function (e, data) {
				// Выводим название файла
				$(this).parent().find('input').attr('placeholder', data.files[0].name);
				console.log(data);
	        	data.submit();
	        },

			// Получаем ответ от сервера
			done: _done,
			progress: _progress
		});
	};

	function _done(e, data) {
		var path;

		if (data.textStatus != 'success') {
			console.log('Upload error');
			console.log(data.result);
			return;
		}

		console.log('Successfully uploaded');
		console.log(data.result);
		// Определяем путь к файлу
		path = 'users_img/' + data.result.minName + '?' + e.timeStamp;
		// Проверка (картинка или водяной знак)

		if (data.result.minName.indexOf('-img') + 1) {
			$('.loader').hide();
			// Добавляем путь соответствующему элементу
			$('.img-display').attr({'src': path, 'alt': 'Ваша картинка'});

			preventAction = false;
			$('.watermark-upload__inputs').css('opacity', '1');

			// Записываем оригинальные размеры изображения
			widthImage = data.result.imgSize['width'];
			heightImage = data.result.imgSize['height'];
			// И отмасштабированные
			newWidthImage = data.result.newSize['newWidth'];
			newHeightImage = data.result.newSize['newHeight'];

			backgroundUploaded = true;
		} else if (data.result.minName.indexOf('-watermark') + 1) {
			$('.loader').hide();
			$('.watermark-display').attr({'src': path, 'alt': 'Ваш водяной знак'});

			// Записываем оригинальные размеры watermark
			watermarkWidth = data.result.imgSize['width'];
			watermarkHeight = data.result.imgSize['height'];
			// И отмасштабированные
			newWatermarkWidth = data.result.newSize['newWidth'];
			newWatermarkHeight = data.result.newSize['newHeight']


			$('.view__item-two').addClass('active');
			$('.manipulation__list').css({
				'pointer-events': 'auto',
				'opacity': '1'
			});

			watermarkUploaded = true;
		}

		// Масштабируем
		if (widthImage > 652 || heightImage > 535) {
			scale = newWidthImage / widthImage;
			wMark.watermark({scale: scale});

		} else {
			scale = 1;
			wMark.watermark({scale: scale});
		}

		secondScale = 1;

		if (watermarkWidth > widthImage || watermarkHeight > heightImage) {
			newScaleW = (widthImage / watermarkWidth) * scale;
			newScaleH = (heightImage / watermarkHeight) * scale;
			if (newScaleW < newScaleH) {
				wMark.watermark({scale: newScaleW});
				scale = newScaleW;
				secondScale = widthImage / watermarkWidth;
			} else {
				wMark.watermark({scale: newScaleH});
				scale = newScaleH;
				secondScale = heightImage / watermarkHeight;
			}
		}

		wMark.watermark('size_width', watermarkWidth)
			.watermark('size_height', watermarkHeight)
			.watermark('position_at', 'left', 'top');

		tile.reset();

		if (backgroundUploaded && watermarkUploaded) {
			tile.generate();
		}
	}

	function _progress(e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('#my_canvas').css('display', 'block');
		var ctx = document.getElementById('my_canvas').getContext('2d');
		var al = progress;
		var start = 4.72;
		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;
		var diff;

		diff = ((al / 100) * Math.PI * 2 * 100).toFixed(2);
		ctx.clearRect(0, 0, cw, ch);
		ctx.lineWidth = 100;
		var gradient = ctx.createLinearGradient(0, 500, 0, 0);
		gradient.addColorStop(0, '#9b6d7b');
		gradient.addColorStop(1, '#d8ba9d');
		ctx.beginPath();
		ctx.arc(267.5, 267.5, 215, start, diff / 100 + start, false);
		ctx.strokeStyle = gradient;
		ctx.stroke();
		ctx.fillStyle = gradient;
		ctx.font = "50px Arial";
		ctx.textAlign = 'center';
		ctx.fillText(al + '%', cw * .5, ch * .5 + 2, cw);
		if (al >= 100) {
			$('#my_canvas').fadeOut('slow');
			$('.loader').fadeIn('slow').css("z-index", '2');
		}
	}

	var scaleRatio = function(){
		console.log("Коэффициент масштбирования: " + scale);
		return {scale: scale, secondScale: secondScale, bgWidth: widthImage, bgHeight: heightImage, wmWidth: watermarkWidth, wmHeight: watermarkHeight};
	};

	// Публичные методы
	return {
		init: init,
		scaleRatio : scaleRatio
	};

}();

// Инициируем модуль
upload.init();
