var Rect = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.width  = width;
	this.height = height;
	this.color  = 'black';
	this.points = [[this.x, this.y],
								 [this.x + this.width, y],
								 [this.x + this.width, this.y + this.height],
								 [this.x, this.y + this.height]];
}

//设置颜色
Rect.prototype.setColor = function (color) {
	this.colore = color;
}

//绘制矩形
Rect.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.closePath();
}

Rect.prototype.set = function (obj) {
	var objArr = Object.keys(obj);
	for(var key in objArr) {
		this[objArr[key]] = obj[objArr[key]];
	}
	return this;
}

Rect.prototype.move = function () {
	this.x += this.vx;
	this.y += this.vy;
	return this;
}

var Circle = function (x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.vx = 0;
	this.vy = 0;
	this.color = 'blcak';
}

Circle.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
	return this;
}

Circle.prototype.set = function (obj) {
	var objArr = Object.keys(obj);
	for(var key in objArr) {
		this[objArr[key]] = obj[objArr[key]];
	}
	return this;
}

Circle.prototype.move = function () {
	this.x += this.vx;
	this.y += this.vy;
	return this;
}

Circle.prototype.collision = function (graphical) {
	if (graphical instanceof Rect) {
		var rect = graphical,
			rectPoints = [],
			rectVector = [], //各条边的向量的法向量的单位向量
			produnctLength = [],  //储存多边形相对于单位向量的点积长度
			circleProdunct;

		var circleVector = new Vector(this.x, this.y);

		rectPoints[0] = new Vector(rect.x, rect.y);
		rectPoints[1] = new Vector(rect.x + rect.width, rect.y);
		rectPoints[2] = new Vector(rect.x + rect.width, rect.y + rect.height);
		rectPoints[3] = new Vector(rect.x, rect.y + rect.height);

		//计算矩形各个边的向量
		for (var i = 0; i + 1 < rectPoints.length; i++) {
			rectVector[i] = rectPoints[i+1].substract(rectPoints[i]).prependicular().normalize();
		}
		rectVector[3] = rectPoints[0].substract(rectPoints[3]).prependicular().normalize();

		for (var i = 0; i < rectPoints.length; i++) {
			circleProdunct = circleVector.dotProduct(rectVector[i]);  //计算圆心和单位向量的点积
			//对矩形上的每个点求点积
			rectPoints.forEach(function (point, key) {
				produnctLength.push(point.dotProduct(rectVector[i]));
			})
			produnctLength.sort();
			if (circleProdunct + this.r >= produnctLength[0] || circleProdunct - this.r <= produnctLength[produnctLength.length]) {
				return true;
			} else {
				return false;
			}
		}		
	}
}