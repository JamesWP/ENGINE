/**
 * file shapes.js
 */
(function(E){
	
	var shapes = {};
	shapes.rect = function rect(vars,move){
		// variables
		for(var key in vars){
			this[key] = vars[key];
		}
		
		// functions
		this. move	 	 = move || undefined;
		this. paint 	 = function(ctx){
				ctx.fillStyle = this.colour;
				ctx.fillRect(this.x,this.y,this.height,this.width);
		};
	};
	shapes.circle = function circle(vars,move){
		// variables
		for(var key in vars){
			this[key] = vars[key];
		}
		// functions
		this. move 		 = move || undefined;
		this. paint 	 = function(ctx){
				ctx.fillStyle = this.colour;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.diam, 0, Math.PI*2, true); 
				ctx.closePath();
				ctx.fill();
		};
	};
	shapes.line = function line(){};
	
	E.shapes = shapes;
})(E);
/**
 * end of file shapes.js
 */