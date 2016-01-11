var upload = function() {

	// Для работы данного модуля используются методы плагина jquery.fileupload.js и модуля movement.js

	// Определяем поля загрузки файлов
	var mainImage = $('.img-input');
		watermark = $('.watermark-input');

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

						// Записываем оригинальные размеры изображения
						widthImage = data.result.imgSize['width'];

					} else if (data.result.minName.indexOf('-watermark') + 1) {
	        			$('.watermark-display').attr({'src':path, 'alt':'Ваш водяной знак'});

						// Записываем оригинальные размеры изображения
						watermarkWidth = data.result.imgSize['width'];
						watermarkHeight = data.result.imgSize['height'];

	        		};

	        	// Сбрасываем текущие координаты блока
	        	$('.output__watermark-result').css('left', '0px');
	        	$('.output__watermark-result').css('top', '0px');
	        	movement.findPosition($('.output__watermark-result'));

					// Вычисляем масштаб
					var scale = $('.img-display').width()/widthImage;
					//$('.output__watermark-result').watermark({scale: scale})
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
