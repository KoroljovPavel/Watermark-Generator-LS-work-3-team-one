var upload = function() {

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
	        		// Проверка (картинка или водяной знак)
	        		if (data.result.minName.indexOf('-img') + 1) {
	        			// Если картинка - определяем путь к ней
	        			path = 'users_img/' + data.result.minName + '?' + event.timeStamp;
	        			// Добавляем путь соответствующему элементу
	        			$('.img-display').attr({'src':path, 'alt':'Ваша картинка'});
	        		};
	        	} else {
	        		console.log('Upload error');
	        		console.log(data.result);
	        	};
	        },
		});
	};

	return {
		init: init
	};

}();

// Инициируем модуль
upload.init();