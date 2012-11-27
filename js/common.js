(function ($) {

	var vGap = ($(window).height() - 250) >> 1;
	$('#container').css('margin-top', vGap);

	//first browse nav element and return new obj for each list item
	var items = $.map($('nav ul > li'), function (value, index) {
		return {
			title : $(value).text(),
			link : $('a', value).attr('href'),
			color : Utils.colorToHex($(value).css('color')),
			size : $(value).css('width'),
			titleOver : $(value).data('text-over'),
			font: $(value,'.title').css('font-size') + '' + $(value,'.title').css('font-family'),
			fontColor: Utils.colorToHex($(value,'.title').css('color'))
		}
	});
	
	$.each(items, function (index, value) {

		//create all canvas here in a specified div
		$('<div class=item><canvas width='+value.size+' height='+value.size+'>').appendTo($('#container'));
		
		//then, create circle menu items
		var element = $('canvas').eq(index); 
		var canvas = $(element).get(0);
		var item = $(element);
		var stage = new Stage(canvas);
		var radius = item.width() / 3;
		var centerPos = item.width() >> 1;

		stage.mouseEventsEnabled = true;
		stage.enableMouseOver();

		//trace(value.font + '' + value.fontColor)

		var circle = new CircleMenu(radius, value.color, value.title, value.titleOver, value.font, value.fontColor);
		circle.x = circle.y = centerPos;
		stage.addChild(circle);
        
		//redraw stage
		stage.update();
		
		//listen to tick event, and update stage each tick
		Ticker.setFPS(60);
		Ticker.addListener(stage);
		
	});

	function tick (){
		this.update();
	}

	function trace(value){
		console.log(value);
	}


})(jQuery);