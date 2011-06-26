/***
**
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

E.game = (function(){
	var $canvas;
	var canvas;
	var ctx;
	var width = 1000;
	var height= 400;
	var frame = 0;
	var loop;
	var objects = [];
	var forRemoval = [];
	var startTime;
	var offset;
	
	function setTime(){
		startTime = new Date().getTime();
	}
	function init(func,loopfn){
		$('#canvasWrap').append('<canvas id="canvas"></canvas>');
		$canvas = $('#canvas');
		$canvas.attr('width',this.width);
		$canvas.attr('height',this.height);
		$canvas.attr('oncontextmenu','return false;');
		//console.log($canvas);
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
		
		
		console.log('init Done',ctx);
		start();
		E.controls.init();
	}
	
	function add(obj){
		objects.push(obj);
		console.log('objects:',objects);
	}
	
	function start(){
		ctx.fillStyle = '#fff';
		ctx.fillRect(0,0,width,height);
		var diff = startTime - new Date().getTime();
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
				if(objects[i].move(diff) == false){
					forRemoval.push(i);
				}else{
					objects[i].paint(ctx);
				}
			}
		}
		if(frame % 100 == 0){
			var no = forRemoval.length;
			for(var i = 0 ; i<no;i++){
				objects.splice(forRemoval[i],1);
			}
			forRemoval = [];
		}
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