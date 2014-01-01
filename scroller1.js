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
var input;
var output;

var minColor = 0;
var maxColor = 255;
var stepColor = 0;

var fontArray = new Array();

var _x = 5;



function Font(val, image) {
	this.val = val;
	this.image = new Image();
	this.image = image;
}

function init() {
	
	image.src = "sprite_font.png";
		
	// Setup canvas
	canvas = document.getElementById("theCanvas");
	ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);
	output = createImageData(canvas.width, canvas.height);	
	output.data = ctx.getImageData(0, 0, 42, 53);
	output.data = input.data;
	
	/*
	 *	 for(var i=33; i < 33+26; i++)
	 {
	 startX = ((i%10)-1)*42;
	 startY = (i/10)*42;
	 ctx.getImageData( startX, startY, 42, 53);

	 } 
	 */
	
	// call draw function every 10 msecs
	timer = setInterval(draw, 10);
	return timer;
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.putImageData(output, 110, 110);
}

init();
