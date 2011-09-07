(function($){

	function generateRand(min,max){
		var arr = [];
		while(arr.length < max){
			var rand = Math.ceil(Math.random()*max);
			var found = false;
			for(var i = 0; i < arr.length; i++){
				if(arr[i]==rand){
					found = true;
					break;
				}
			}
			if(!found)arr.push(rand);
		}
		return arr;
	};

	$.fn.imgg = function(options){

		settings = {
			_rows : 4,
			_cols : 4,
			anim : 'fadein',
			duration: 500,
			height: 400,
			width: 400
		};
		
		if(options)
			$.extend(settings, options);

		if(options && options.images){
			if(!(typeof options.images == Array) && options.images.length <= 0){
				alert("Please provide images")
				return false;
			}
		}
			
		var i = 0, j = 0, x = 0, y = 0;
		var _rows = settings._rows, 
		_cols = settings._cols;
		
		var h = settings.height/_cols, 
			w = settings.width/_rows, 
			duration = settings.duration;

			
		var currentImage = settings.images[0];
		var el = $('<div id="img_g"/>').css('background-image','url(' + currentImage + ')');
		this.append(el);

		el.height(settings.height).width(settings.width).css('position','relative');
		
		while(i++ < _rows){
			while(j++ < _cols){
				el.append(
					$('<div id=id_' + i + '_' + j + '/>').css('left', x).css('top',y)
					.css('background-position',  (-x + ' ' + -y))
				);
				x+=w;
			}
			j=x=0;
			y+=h;
		}
		el.children().css('position','absolute').height(h).width(w);
		var arr = generateRand(0, _rows * _cols);
		var images = settings.images;
		
		var index = 0;
		var idx = 1;

		var interval = "";
		setInterval(function(){
			interval = setInterval(animate,duration);
			if(idx >= images.length){
				idx = 0;
				arr = generateRand(0,_rows * _cols);
			}
		},(duration*_rows*_cols) + 2000);

		var animate = function(){
			el.children(':nth-child(' + (arr[index]) + ')')
			.fadeIn('slow');

			index++;
			if(index >= arr.length){
				index = 0;
				el.css('background-image','url(' + currentImage + ')');
				el.children().hide();
				currentImage = images[idx++];	
				el.children().css('background-image','url(' + currentImage + ')');
				clearInterval(interval);
			}
		};
		
		// setTimeout(animate,2000);
	}

})(jQuery);