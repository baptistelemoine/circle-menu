(function (window) {
	
	function CircleMenu(radius, color, title, titleOver, font, fontColor){

		this.initialize(radius, color, title, titleOver, font, fontColor);
	}

	CircleMenu.prototype = new Container();
	CircleMenu.prototype.Container_initialize = CircleMenu.prototype.initialize;
	CircleMenu.prototype.Container_tick = CircleMenu.prototype._tick;

	CircleMenu.prototype.initialize = function(radius, color, _title, titleOver, font, fontColor){
		
		this.Container_initialize();
		
		var g = new Graphics().beginFill(color).drawCircle(0, 0, radius);
		var mainCircle = new Shape(g);
		mainCircle.alpha = .4;
		this.addChild(mainCircle);

		var circlesCollection = new Container();
		this.addChild(circlesCollection);

		for (var i = 0; i < 5; i++) {
			var c = mainCircle.clone();
			var randomX = Math.floor(Math.random()*31) - 10;
			var randomY = Math.floor(Math.random()*31) - 10;
			c.x = randomX;
			c.y = randomY;
			c.alpha = .2;
			circlesCollection.addChild(c);

			TweenMax.to(c, 3, {x:Math.floor(Math.random()*31) - 10, y:Math.floor(Math.random()*31) - 10, 
							repeat:-1, yoyo:true, onUpdate:this.refresh});
			
		};

		var ogg = new Graphics().setStrokeStyle(2).beginStroke('#fff').beginFill(color).drawCircle(0, 0, radius*.4);
		var smallCircleOver = new Shape(ogg);
		smallCircleOver.x = radius / 1.5;
		smallCircleOver.y = - radius / 1.5;
		smallCircleOver.scaleX = smallCircleOver.scaleY = 0;
		this.addChild(smallCircleOver);

		//create the circle slideshow
		var showContainer = new Container();
		this.addChild(showContainer);		
		
		//circle on mouse over
		var circleOver;
		var base = this;

		var pattern = new Image();
		pattern.src = 'images/pattern1.png';		
		pattern.onload = function(){
			var og = new Graphics().setStrokeStyle(5).beginStroke('#fff').beginBitmapFill(pattern).drawCircle(0, 0, radius*1);
			circleOver = new Shape(og);			
			circleOver.x = circleOver.y = mainCircle.x*1;
			circleOver.scaleX = circleOver.scaleY = 0;
			base.addChildAt(circleOver, 2);//!!!Warning : hard coding because setchildindex is buggy...
		}
		

		//main title setup, cache it to apply color filter on mouseover
		//var title = new Text(_title, '36px Dancing Script', '#fff' );
		var title = new Text(_title, font, fontColor );
		var titleXPOS = (-title.getMeasuredWidth() / 2) + 10;
		var titleYPOS = radius / 12;
		title.x = titleXPOS;
		title.y = titleYPOS;
		this.addChild(title);
		title.cache(-title.getMeasuredWidth()/2, (-title.getMeasuredLineHeight()/2) -10, title.getMeasuredWidth()*2.5, title.getMeasuredLineHeight()*2);
		TweenMax.to(title, .5, {easel:{tint:"#fff", tintAmount:1}});
		
		var icon = new Text('GO!', '24px Dancing Script', '#fff')
		icon.x = smallCircleOver.x - 15;
		icon.y = smallCircleOver.y + 8;
		icon.alpha = 0;
		this.addChild(icon);		

		var tl;

		mainCircle.onMouseOver = function(e){
			document.body.style.cursor = 'pointer';			

			title.text = titleOver;
			title.x = -title.getMeasuredWidth() / 2;
			title.y = titleYPOS + 50;
			title.alpha = 0;

			tl = new TimelineMax();
			tl.to(circleOver, .3, {scaleX:1, scaleY:1, ease:Power1.easeOut, onReverseComplete:reset});
			tl.to(smallCircleOver, .3, {scaleX:1, scaleY:1, ease:Back.easeOut});
			tl.to(title, .3, {y:titleYPOS + 5, alpha:1, easel:{tint:color, tintAmount:.8}});
			tl.to(icon, .3, {alpha:1});				
			
			TweenMax.to(circlesCollection, .5, {alpha:0});			
		}

		mainCircle.onMouseOut = function(e){
			document.body.style.cursor = 'default';

			tl.reverse();			
			
			TweenMax.to(circlesCollection, .5, {alpha:1, delay:.5});
		}

		mainCircle.onClick = function(e){
			$(base).trigger('onCircleClic')
		}

		//ensure that all object reset scale to 0 when animation is finished and reset title
		function reset(){
			
			title.text = _title;
			title.updateCache();
			title.x = -title.getMeasuredWidth() / 2;
			title.y = titleYPOS;
			title.alpha = 1;
			
			TweenMax.to([circleOver, smallCircleOver], 0, {scaleX:0, scaleY:0});
			TweenMax.to(title, 0, {y:titleYPOS, x:titleXPOS, alpha:1});
		}
	}
	
	CircleMenu.prototype._tick = function(){
		this.Container_tick();		
	}
	
	window.CircleMenu = CircleMenu;

}(window));