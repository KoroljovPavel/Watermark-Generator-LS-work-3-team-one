var upload = function() {

	// Определяем поля загрузки файлов
	var mainImage = $('.image-upload__upload');
		watermark = $('.watermark-upload__upload');

	var init = function() {
		_setUpListners();
	};

	// Вешаем обработчик
	var _setUpListners = function() {
		_uploadImage(mainImage, 'img');
		_uploadImage(watermark, 'watermark');
	};

	var _uploadImage = function(image, type) {

		// Определяем GET параметр
		var url;
		if (type == 'img') {
			url = 'upload.php?fileType=img';
		} else {
			url = 'upload.php?fileType=watermark';
		}
		image.fileupload({ 
			url: url,
			dataType: 'json',
			add: function (e, data) {
				console.log(data);
	        	data.submit();

	        },
			// получаем ответ от сервера
			done: function (e, data) {
	        	if (data.result.status == 'success') {
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