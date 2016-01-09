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
	        		} else if (data.result.minName.indexOf('-watermark') + 1) {
	        			$('.watermark-display').attr({'src':path, 'alt':'Ваш водяной знак'});
	        			// Сбрасываем текущие координаты блока
	        			$('.output__watermark-result').css('left', '0px');
	        			$('.output__watermark-result').css('top', '0px');
	        			movement.findPosition($('.output__watermark-result'));
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