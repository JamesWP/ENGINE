/**
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
 */