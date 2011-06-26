/**
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