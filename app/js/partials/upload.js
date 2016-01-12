var upload = function() {

	// Для работы данного модуля используются методы плагина jquery.fileupload.js и модуля movement.js

	// Определяем поля загрузки файлов
	var mainImage = $('.img-input'),
		watermark = $('.watermark-input'),
		preventAction = true;
	$('.watermark-upload__inputs').css('opacity', '.5');
	$('.x-pos').attr('disabled', true);
	$('.y-pos').attr('disabled', true);
	$('.x-up').attr('disabled', true);
	$('.x-down').attr('disabled', true);
	$('.y-up').attr('disabled', true);
	$('.y-down').attr('disabled', true);
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
		widthImage = 0, heightImage = 0,watermarkWidth = 0,	watermarkHeight = 0;
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
			done: function (e, data) {
				var path;
	        	if (data.textStatus == 'success') {
	        		console.log('Successfully uploaded');
	        		console.log(data.result);
	        		// Определяем путь к файлу
	        		path = 'users_img/' + data.result.minName + '?' + event.timeStamp;
	        		// Проверка (картинка или водяной знак)

	        		if (data.result.minName.indexOf('-img') + 1) {
	        			// Добавляем путь соответствующему элементу
	        			$('.img-display').attr({'src':path, 'alt':'Ваша картинка'});

						$('.watermark-upload__inputs').css('opacity', '1');
						preventAction = false;
						// Записываем оригинальные размеры изображения
						widthImage = data.result.imgSize['width'];

					} else if (data.result.minName.indexOf('-watermark') + 1) {
	        			$('.watermark-display').attr({'src':path, 'alt':'Ваш водяной знак'});

						// Записываем оригинальные размеры изображения
						watermarkWidth = data.result.imgSize['width'];
						watermarkHeight = data.result.imgSize['height'];


						$('.x-pos').attr('disabled', false);
						$('.y-pos').attr('disabled', false);
						$('.x-up').attr('disabled', false);
						$('.x-down').attr('disabled', false);
						$('.y-up').attr('disabled', false);
						$('.y-down').attr('disabled', false);


						// Сбрасываем текущие координаты блока
						$('.output__watermark-result').css('left', '0px');
						$('.output__watermark-result').css('top', '0px');
						movement.findPosition($('.output__watermark-result'));



	        		};



					// Вычисляем масштаб
					var scale = $('.img-display').width()/widthImage;
					var watermarkScale = $('.watermark-display').width()/watermarkWidth;
					console.log(watermarkScale);
					// Применям масштаб к ватермарку
					if(widthImage <= 652 && heightImage <= 535) {
						$('.watermark-display').watermark('size_width', watermarkWidth);
						$('.watermark-display').watermark('size_height', watermarkHeight);
					}else{
						$('.watermark-display').watermark({scale: scale})
								.watermark('size_width', watermarkWidth);
						$('.watermark-display').watermark({scale: scale})
								.watermark('size_height', watermarkHeight);
					};

	        	} else {
	        		console.log('Upload error');
	        		console.log(data.result);
	        	};
	        },
		});
	};

	// Публичные методы
	return {
		init: init
	};

}();

// Инициируем модуль
upload.init();
