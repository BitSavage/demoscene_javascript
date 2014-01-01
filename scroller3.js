var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;

var message = "Welcome to BitSavage. This is a simple sine wave side scroller I made using html5 and JavaScript. Music is Ready Steady Go by She. . .";
var fontSheetImage = new Image();
var spriteArray = new Array();
var charArray = new Array();

var amplitude = 10;
var frequency = 0.02;
var shiftStartingAngle = 0;
var shiftWaveY = canvas.height / 4;

var barArray = new Array();

function bar(options) {
	var that = {};
	that.y = options.y;
	that.color = options.color;
	that.direction = options.direction;
	return that;
}

var gradient = ['rgba(79,79,79,1.0)','rgba(123,123,123,1.0)','rgba(167,167,167,1.0)','rgba(211,211,211,1.0)','rgba(255,255,255,1.0)','rgba(255,255,255,1.0)','rgba(211,211,211,1.0)','rgba(167,167,167,1.0)','rgba(123,123,123,1.0)','rgba(79,79,79,1.0)'];

function reinitCharArray() {
	// create message character tracking array
	for (var i = 0; i < message.length; i++) {
		charArray[i].x = canvas.width + (i * 20);
		charArray[i].y = canvas.height / 2;
	}

}

function charLoc(options) {
	var that = {};

	that.x = options.x;
	that.y = options.y;

	return that;
}

function spriteLoc(options) {
	var that = {};

	that.width = options.width;
	that.height = options.height;
	that.sx = options.sx;
	that.sy = options.sy;
	that.dx = options.dx;
	that.dy = options.dy;

	return that;
}

function init() {

	fontSheetImage.src = "sprite_font2.png";

	// Setup canvas
	//canvas = document.getElementById("theCanvas");
	canvas.width = 1024;
	canvas.height = 100;

	var startX = 20;
	var startY = 20;
	var xChar = 0;
	var yChar = 0;
	// create sprite array for characters
	for (var i = 0; i < 100; i++) {
		spriteArray[i] = new spriteLoc({
			width : 40,
			height : 51,
			sx : startX + (xChar * 40),
			sy : startY + (yChar * 51),
			dx : canvas.width,
			dy : canvas.height / 2,
		});

		if (xChar >= 9) {
			xChar = 0;
			yChar++;
		} else
			xChar++;
	}

	// create message character tracking array
	for (var i = 0; i < message.length; i++) {
		charArray[i] = new charLoc({
			x : canvas.width + (i * 20),
			y : canvas.height / 2
		});
	}

	// create bar
	for (var i = 0; i < 20; i++) {
		barArray[i] = new bar({y: canvas.height+i, color: gradient[i/2], direction: 0});
	}
	
	// call draw function every 10 msecs
	timer = setInterval(loop, 10);
	return timer;

}

function drawScroller() {
    // scroller
	var asciiVal = 0;
	for (var i = 0; i < message.length; i++) {

		charArray[i].y = (amplitude * (Math.sin(frequency * charArray[i].x) + shiftStartingAngle)) + shiftWaveY;
		asciiVal = message.charCodeAt(i) - 33;
		if (asciiVal >= 0) {
			ctx.drawImage(fontSheetImage, spriteArray[asciiVal].sx, spriteArray[asciiVal].sy, spriteArray[asciiVal].width, spriteArray[asciiVal].height, charArray[i].x, charArray[i].y, spriteArray[asciiVal].width, spriteArray[asciiVal].height);
		}

		if ((charArray[i].x < 0) && (i == message.length - 1)) {
			reinitCharArray();
		} else
			charArray[i].x--;
	}

}

function drawBar() {
	// bar
	for (var i = 0; i < barArray.length; i++) {
		ctx.beginPath();
		ctx.globalAlpha = 1.0;
		ctx.moveTo(0,barArray[i].y);
		ctx.lineTo(canvas.width,barArray[i].y);
		ctx.strokeStyle=barArray[i].color;
		ctx.stroke();
		ctx.closePath();
		
		if((barArray[i].y <= -10) && (barArray[i].direction == 0)) {
			barArray[i].direction = 1;
		} else if ((barArray[i].y >= canvas.height+10) && (barArray[i].direction == 1)) {
			barArray[i].direction = 0;	
		}
		
		if (barArray[i].direction == 0) barArray[i].y--;
		else barArray[i].y++;
	}
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
		
	if(barArray[0].direction == 1) {
		drawScroller();
		drawBar();
	} else {
		drawBar();
		drawScroller();		
	}
}

init();
