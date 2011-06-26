
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
			with(this){
				ctx.fillStyle = colour;
				ctx.fillRect(x,y,height,width);
			}
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
			with(this){
				ctx.fillStyle = colour;
				ctx.beginPath();
				ctx.arc(x, y, diam, 0, Math.PI*2, true); 
				ctx.closePath();
				ctx.fill();
			}
		};
		for(var key in vars){
			this[key] = vars[key];
		}
	};
	shapes.line = function line(){};
	
	E.shapes = shapes;
})(E);