/**
 * file controls.js
 */
(function(E){
	var controls = function(){
		this. posx = 0;
		this. posy = 0;
		this. keys = {};
		this. keyEvents = {}; 
		this. mouseEvents = {};
		 
		this. LEFTMB = 1;
		this. RIGHTMB = 3;
		this. MIDDLEMB = 2;
	};    
	controls.prototype.mouseup = function(e){
	    if(e.which == E.controls.LEFTMB)
	   	 E.controls.leftmbstate = false;
		else if (e.which == E.controls.RIGHTMB){
			E.controls.rightmbstate = false;
			e.preventDefault();
		}
		else if (e.which == E.controls.MIDDLEMB)
			E.controls.middlembstate = false;
		
		console.log('mouseup',e.which);
	};
	controls.prototype.mousedown= function(e){
		     if(e.which == E.controls.LEFTMB)
	    	E.controls.leftmbstate = true;
		else if (e.which == E.controls.RIGHTMB){
			E.controls.rightmbstate = true;
			e.preventDefault();
		}
		else if (e.which == E.controls.MIDDLEMB)
			E.controls.middlembstate = true;
		     
		if(typeof E.controls.mouseEvents[e.which]==='function')
			E.controls.mouseEvents[e.which]();
		console.log('mousedown',e.which);
	};
	controls.prototype.mousemove = function(e){
		var posx,posy;
		if (e.pageX || e.pageY){
			posx = e.pageX;
			posy = e.pageY;
		}else if (e.clientX || e.clientY){
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		E.controls.posx = posx - E.game.offset.left;
		E.controls.posy = posy - E.game.offset.top;
		//console.log(this.posx);
	};
	controls.prototype.keydown = function(e){
		var code;
		if (!e) var e = window.event;
		if (e.keyCode) 
			code = e.keyCode;
		else if (e.which)
			code = e.which;
		
		E.controls.keys[code] = true;
		
		if(typeof(E.controls.keyEvents[code])==='function'){
			E.controls.keyEvents[code]();
		}
		console.log('keydown',e.which);
	};
	controls.prototype.keyup = function(e){
		var code;
		if (!e) var e = window.event;
		if (e.keyCode) 
			code = e.keyCode;
		else if (e.which)
			code = e.which;
		
		E.controls.keys[code] = false;
		console.log('keyup',e.which);
	};

	controls.prototype.removeMouseListener = function(button){
		this.mouseEvents[button] = undefined;
	};
	controls.prototype.addMouseListener = function(button,func){
			this.mouseEvents[button] = func;
	};
	controls.prototype.removeKeyListener = function(key){
		this.keyEvents[key] = undefined;
	};
	controls.prototype.addKeyListener = function(key,func){
		this.keyEvents[key] = func;
	};
	controls.prototype.getKeyState = function(keyno){
		keyno = keyno || 1;
		return this.keys[keyno];
	};
	controls.prototype.init = function(){
		$canvas = $('#canvas');
		$document = $(document);
		console.log('controls done',$canvas);
		// mouse move event for position
		$canvas.bind('mousemove',this.mousemove);
		// key up event
		$document.keydown(this.keydown);
		/// key up event
		$document.keyup(this.keyup);
		/// mouse down event
		$canvas.bind('mousedown',this.mousedown);
		/// mouse up event
		$canvas.bind('mouseup',this.mouseup);
	};
	controls.prototype.getMouseX = function(){
		return this.posx;
	};
	controls.prototype.getMouseY = function(){
		return this.posy;
	};
	controls.prototype.getMouseLeft = function(){
		return this.leftmbstate;
	};
	
	E.controls =  new controls();
})(E);
/**
 * end of file controls.js
 */
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
 *//**
 * file shapes.js
 */
(function(E){
	
	var shapes = {};
	shapes.rect = function rect(width,height,x,y,colour,move){
		
		// variables
		this.y 			= y;
		this.x 			= x;
		this.width 		= width;
		this.height 	= height;
		this.colour 	= colour;
		
		// functions
		this. move	 	 = move || undefined;
		this. paint 	 = function(ctx){
				ctx.fillStyle = this.colour;
				ctx.fillRect(this.x,this.y,this.height,this.width);
		};
	};
	shapes.circle = function circle(diam,x,y,colour,movefunc,vars){
		
		// variables
		this.y 			= y;
		this.x 			= x;
		this.diam 		= diam;
		this.colour 	= colour;

		// functions
		this. move 		 = movefunc;
		this. paint 	 = function(ctx){
				ctx.fillStyle = this.colour;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.diam, 0, Math.PI*2, true); 
				ctx.closePath();
				ctx.fill();
		};
		for(var key in vars){
			this[key] = vars[key];
		}
	};
	shapes.line = function line(){};
	
	E.shapes = shapes;
})(E);
/**
 * end of file shapes.js
 *//**
 * file vector.js
 */

(function(E){
	var vector = function(newx,newy){
		this. x = newx;
		this. y = newy;
	};
	vector.prototype.add = function(vector){
		this.x += vector.x;
		this.y += vector.y;
	};
	vector.prototype.del = function(vector){
		this.x -= vector.x;
		this.y -= vector.y;
	};
	vector.prototype.norm = function(){
		var mag = this.mag;
		this.x /= mag;
		this.y /= mag;
	};
	vector.prototype.mag = function(){
		return Math.sqrt(this.x*this.x + this.y * this.y);
	};
	
	E.vector = vector;
})(E);

/**
 * end of file vector.js
 */