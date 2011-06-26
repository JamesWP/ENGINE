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
