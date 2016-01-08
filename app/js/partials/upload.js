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
				$(this).parent().find('input').attr('placeholder', data.files[0].name);
	        	data.submit();
	        },
			// Получаем ответ от сервера
			done: function (e, data) {
	        	if (data.textStatus == 'success') {
	        		console.log('Successfully uploaded');
	        		console.log(data.result);
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