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
		newScaleW,
		newScaleH,
		newHeightImage,
		newWidthImage;

	var backgroundUploaded = false,
		watermarkUploaded = false;

	$('.watermark-upload__inputs').css('opacity', '.5');

	_setDisable(true);

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
			done: _done
		});
	};

	function _done(e, data){
		var path;
		if (data.textStatus == 'success') {
			console.log('Successfully uploaded');
			console.log(data.result);
			// Определяем путь к файлу
			path = 'users_img/' + data.result.minName + '?' + event.timeStamp;
			// Проверка (картинка или водяной знак)

			if (data.result.minName.indexOf('-img') + 1) {

				$('.img-display').attr({'src':path, 'alt':'Ваша картинка'});

				preventAction = false;
				$('.watermark-upload__inputs').css('opacity', '1');

				// Записываем оригинальные размеры изображения
				widthImage = data.result.imgSize['width'];
				heightImage = data.result.imgSize['height'];

				newWidthImage = data.result.newSize['newWidth'];
				newHeightImage = data.result.newSize['newHeight'];

				backgroundUploaded = true;

			} else if (data.result.minName.indexOf('-watermark') + 1) {
				//$('.watermark-display').css('display', 'none');
				$('.watermark-display').attr({'src':path, 'alt':'Ваш водяной знак'});

				// Записываем оригинальные размеры watermark
				watermarkWidth = data.result.imgSize['width'];
				watermarkHeight = data.result.imgSize['height'];

				newWatermarkWidth = data.result.newSize['newWidth'];
				newWatermarkHeight = data.result.newSize['newHeight'];

				_setDisable(false);

				// Сбрасываем текущие координаты блока
				wMark.css('left', '0px');
				wMark.css('top', '0px');
				movement.findPosition(wMark);

				watermarkUploaded = true;
			}

			// Масштабируем
			if(widthImage > 652 || heightImage > 535){
				scale = newWidthImage/widthImage;
				wMark.watermark({scale: scale});
				scaleRatio(scale);
				console.log('Watermark нормалдьный');
			}else{
				scale = 1;
				wMark.watermark({scale: scale});
				scaleRatio(scale);
			};

			if(watermarkWidth > widthImage || watermarkHeight > heightImage){
				newScaleW = (widthImage/watermarkWidth)*scale;
				newScaleH = (heightImage/watermarkHeight)*scale;
				if(newScaleW < newScaleH){
					wMark.watermark({scale: newScaleW});
					scaleRatio(newScaleW);
				}else{
					wMark.watermark({scale: newScaleH});
					scaleRatio(newScaleH);
				};
			};

			wMark.watermark('size_width', watermarkWidth)
					.watermark('size_height', watermarkHeight);
			console.log(scale);

			tile.reset();

			if (backgroundUploaded && watermarkUploaded) {
				tile.generate();
			}

		} else {
			console.log('Upload error');
			console.log(data.result);
		}
	}

	function _setDisable(value){
		$('.x-pos, .y-pos, .x-up, .x-down, .y-up, .y-down').attr('disabled', value);
	}

	var scaleRatio = function(sRatio){
		mainRatio = sRatio;
		console.log("Коэффициент масштбирования: " + sRatio);
		return mainRatio;

	};
	// Публичные методы
	return {
		init: init,
		scaleRatio : scaleRatio
	};

}();

// Инициируем модуль
upload.init();

