var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;

var numCircles = 765;
var amplitude = 100;
var frequency = 0.02;
var shiftStartingAngle = 0;
var shiftWaveY = 400;
var dx = 2;

var startX = 5;
var startY = 5;

var image = new Image();

var minColor = 0;
var maxColor = 255;
var stepColor = 0;

var _x = 5;

function Circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
}

function init() {
	
	image.src = "sprite_font.png";
		
	// Setup canvas
	canvas = document.getElementById("theCanvas");
	ctx = canvas.getContext("2d");
	ctx.drawImage(image, 800, 800)
	
	// call draw function every 10 msecs
	//timer = setInterval(draw, 10);
	//return timer;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

}

init();
