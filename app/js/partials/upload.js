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
		widthImage = 0, heightImage = 0,watermarkWidth = 0,	watermarkHeight = 0; //scaleHeight = 0; scaleWidth = 0;
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
						heightImage = data.result.imgSize['height'];





					} else if (data.result.minName.indexOf('-watermark') + 1) {
	        			$('.watermark-display').attr({'src':path, 'alt':'Ваш водяной знак'});
						// Записываем оригинальные размеры изображения
						watermarkWidth = data.result.imgSize['width'];
						watermarkHeight = data.result.imgSize['height'];





						// Сбрасываем текущие координаты блока
						$('.output__watermark-result').watermark('position_at', 'left', 'top');
						movement.findPosition($('.output__watermark-result'));

					};

					_initScale();

				} else {
	        		console.log('Upload error');
	        		console.log(data.result);
	        	};

	        },
		});
	};

	var _initScale = function(){
		var scaleWidth = $('.img-display').width()/widthImage;
		var scaleHeight =$('.img-display').height()/heightImage;
		console.log($('.img-display').width() + ':' + $('.img-display').height());
		console.log(scaleWidth + ' ' + scaleHeight);
		if(widthImage <= 652 && heightImage <= 535) {
			$('.output__watermark-result').watermark('size_width', watermarkWidth)
					.watermark('size_height', watermarkHeight);
		}else if(scaleWidth < scaleHeight){
			$('.output__watermark-result').watermark({scale:scaleWidth})
					.watermark('size_width', watermarkWidth)
					.watermark('size_height', watermarkHeight);
		}else{
			$('.output__watermark-result').watermark({scale:scaleHeight})
					.watermark('size_width', watermarkWidth)
					.watermark('size_height', watermarkHeight);
		};
	};

	// Публичные методы
	return {
		init: init
	};

}();

// Инициируем модуль
upload.init();
