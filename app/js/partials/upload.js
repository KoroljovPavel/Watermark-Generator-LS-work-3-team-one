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
							//var progress = parseInt(data.loaded / data.total * 100, 10);
							//console.log(progress);

                        //$('.img-display').css('display', 'none');
                        $('.img-display').attr({'src':path, 'alt':'Ваша картинка'});
                        //$('.img-display').on('load', function(){
							//$('#my_canvas').css('display', 'block');
							//var ctx = document.getElementById('my_canvas').getContext('2d');
							//var al = 0;
							//var start = 4.72;
							//var cw = ctx.canvas.width;
							//var ch = ctx.canvas.height;
							//var diff;
							//function progressSim(){
							//	diff = ((al / 100) * Math.PI*2*100).toFixed(2);
							//	ctx.clearRect(0, 0, cw, ch);
							//	ctx.lineWidth = 100;
							//	var gradient = ctx.createLinearGradient(0,500,0, 0);
							//	gradient.addColorStop(0, '#9b6d7b');
							//	gradient.addColorStop(1, '#d8ba9d');
							//	ctx.beginPath();
							//	ctx.arc(267.5, 267.5, 215, start, diff/100+start, false);
							//	ctx.strokeStyle = gradient;
							//	ctx.stroke();
							//	ctx.fillStyle = gradient;
							//	ctx.font = "50px Arial";
							//	ctx.textAlign = 'center';
							//	ctx.fillText(al+'%', cw*.5, ch*.5+2, cw);
                        //
							//	if(al >= 100){
							//		clearTimeout(sim);
							//		$('#my_canvas').fadeOut('fast');
							//		$('.img-display').fadeIn('fast');
							//		$('watermark-display').css('position', 'absolute');
							//	}
							//	al++;
							//}
							//var sim = setInterval(progressSim, 10);
                        //
                        //});
						preventAction = false;
						$('.watermark-upload__inputs').css('opacity', '1');
						// Записываем оригинальные размеры изображения
						widthImage = data.result.imgSize['width'];
						heightImage = data.result.imgSize['height'];

						newWidthImage = data.result.newSize['newWidth'];
						newHeightImage = data.result.newSize['newHeight'];





					} else if (data.result.minName.indexOf('-watermark') + 1) {
						//$('.watermark-display').css('display', 'none');
                        $('.watermark-display').attr({'src':path, 'alt':'Ваш водяной знак'});
						//$('.watermark-display').on('load', function(){
						//	$('#my_canvas').css('display', 'block');
						//	var ctx = document.getElementById('my_canvas').getContext('2d');
						//	var al = 0;
						//	var start = 4.72;
						//	var cw = ctx.canvas.width;
						//	var ch = ctx.canvas.height;
						//	var diff;
						//	function progressSim(){
						//		diff = ((al / 100) * Math.PI*2*100).toFixed(2);
						//		ctx.clearRect(0, 0, cw, ch);
						//		ctx.lineWidth = 100;
						//		var gradient = ctx.createLinearGradient(0,500,0, 0);
						//		gradient.addColorStop(0, '#9b6d7b');
						//		gradient.addColorStop(1, '#d8ba9d');
						//		ctx.beginPath();
						//		ctx.arc(267.5, 267.5, 215, start, diff/100+start, false);
						//		ctx.strokeStyle = gradient;
						//		ctx.stroke();
						//		ctx.fillStyle = gradient;
						//		ctx.font = "50px Arial";
						//		ctx.textAlign = 'center';
						//		ctx.fillText(al+'%', cw*.5, ch*.5+2, cw);
                        //
						//		if(al >= 100){
						//			clearTimeout(sim);
						//			$('#my_canvas').fadeOut('fast');
						//			$('.watermark-display').fadeIn('fast');
                        //
						//		}
						//		al++;
						//	}
						//	var sim = setInterval(progressSim, 10);
                        //
						//});
						// Записываем оригинальные размеры watermark
						watermarkWidth = data.result.imgSize['width'];
						watermarkHeight = data.result.imgSize['height'];

						newWatermarkWidth = data.result.newSize['newWidth'];
						newWatermarkHeight = data.result.newSize['newHeight']


						$('.x-pos').attr('disabled', false);
						$('.y-pos').attr('disabled', false);
						$('.x-up').attr('disabled', false);
						$('.x-down').attr('disabled', false);
						$('.y-up').attr('disabled', false);
						$('.y-down').attr('disabled', false);


						// Сбрасываем текущие координаты блока
						wMark.css('left', '0px');
						wMark.css('top', '0px');
						movement.findPosition(wMark);



	        		};

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


	        	} else {
	        		console.log('Upload error');
	        		console.log(data.result);
	        	};
	        },
		});
	};


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

