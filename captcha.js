var captchas = [];

	function reload() {
		captchas.idx = (captchas.idx || 0) + 1;
		if (captchas.idx >= captchas.length)
			captchas.idx = 0;

		captcha1.src = captchas[captchas.idx];

		container.style.display = 'none';
		/*
		captcha.onload = function () {
			var canvas = document.createElement('canvas');
			canvas.getContext('2d').drawImage(captcha, 0, 0);
			console.log(canvas.toDataURL());
		}*/
	}

	function breakCaptcha() {
		container.style.display = '';

		var canvas = segmentacao;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(captcha1, 0, 0);

		var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

		var d = pixels.data;
		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			var v = 0;

		    //Extract only gray pixels
            //Filter darker pixels (<100)
			var diff = Math.abs(r - g) + Math.abs(r - b) + Math.abs(g - b);
			var isGray = diff <= 30 && r > 100;
			//var isGray = Math.abs(r - g) <= 5 && Math.abs(r - b) <= 5 && Math.abs(g - b) <= 5;

			var color = isGray ? 255 : 0;
			d[i] = d[i + 1] = d[i + 2] = color;
		}

		ctx.putImageData(pixels, 0, 0);

	    //GOCR is a library for OCR
        //In this simple captchas it is enough
		var text = GOCR(segmentacao)
		document.getElementsByName("captcha")[0].value = text.toUpperCase();
	}


//	reload();
