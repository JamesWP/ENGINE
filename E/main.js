/***
** file main.js
**/
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            return window.setTimeout(callback, 1000 / 60);
        };
})();
E = {};
E.game = (function(){
	var $canvas;
	var canvas;
	var ctx;
	var width;
	var height;
	var frame = 0;
	var loop;
	var objects = [];
	var forRemoval = [];
	var startTime;
	var offset;
	
	function setTime(){
		startTime = new Date().getTime();
	}
	function init(element,func,loopfn){
		$element = $(element);
		width  = this.width = $element.innerWidth();
		height = this.height = $element.innerHeight();
		var $canvasel = $('<canvas  id="canvas"></canvas>');
		$canvasel.attr('height',this.height);
		$canvasel.attr('width',this.width);
		$element.append($canvasel);
		$canvas = $('#canvas');
		$canvas.attr('oncontextmenu','return false;');

		$element.css('overflow','hidden');
		console.log(this.height,this.width);
		this.offset =  $canvas.offset();
		canvas 	= $canvas[0];
		ctx 	= canvas.getContext('2d');
		setTime();
		this.frame = 0;
		loop = loopfn; 
		objects = objects;
		//ctx.fillStyle = '#000000';
		//ctx.fillRect(10,10,10,10);
		
		if(typeof func ==='function')
			func();
		

		E.controls.init();
		console.log('init Done',ctx);
		start();
	}
	
	function add(obj){
		objects.push(obj);
	}
	
	function start(){
		ctx.clearRect(0,0,width,height);
		var diff = new Date().getTime() - startTime;
		update(diff);
		if(typeof loop ==='function')
			loop();
		E.game.frame++;
		setTime(); 
		requestAnimFrame(start,canvas);
	}
	function update(diff){
		var no = objects.length;
		for(var i = 0 ; i<no;i++){
			if(objects[i]){
				if(typeof objects[i].move === 'function' && objects[i].move(diff) == false){
					//forRemoval.push(i);
					objects[i].move = undefined;
				}else{
					objects[i].paint(ctx);
				}
			}
		}
		/*if(frame % 500 == 0){
			var no = forRemoval.length;
			for(var i = 0 ; i<no;i++){
				//objects.splice(forRemoval[i],1);
			}
			forRemoval = [];
		}*/
	}

	return{
		init 	: init,
		add	 	: add,
		start	: start,
		objects : objects,
		height	: height,
		width	: width,
		frame	: frame,
		offset	: offset
	};
})();
/**
 *  end of file main.js
 */