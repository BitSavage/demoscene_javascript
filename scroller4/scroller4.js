var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;

var music = new Audio("ReadySteadyGo.mp3");
var eyeImage = new Image();

var message = "Welcome to BitSavage --- This is a simple sine wave side scroller with oscillating amplitude + pulsating rasterbar I made using html5 and JavaScript. Music is Ready Steady Go by She. . . What's next?";
var fontSheetImage = new Image();
var spriteArray = new Array();
var charArray = new Array();

var amplitude = 10;
var ampDirection = 0;
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

var gradient = [79,123,167,211,255,255,211,167,123,79];
var alphaFlash = [0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
var alphaIndex = 0;
var alphaDirection = 0;

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
	canvas.width = 800;
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
	
	// eye image
	eyeImage.src = 'eye.png';
		
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

setInterval(function(){
	if ((alphaIndex > alphaFlash.length-2) && (alphaDirection == 0)) { alphaDirection = 1; }
	else if ((alphaIndex <= 0) && (alphaDirection == 1)) { alphaDirection = 0; }

	if (alphaDirection == 0) { alphaIndex++; }
	else alphaIndex--;	
},60);


setInterval(function(){
	
	if ((amplitude >= 30) && (ampDirection == 0)) ampDirection = 1;
	else if ((amplitude <= 0) && (ampDirection == 1)) ampDirection = 0;
	
	if (ampDirection == 0) amplitude++;
	else amplitude--;
	
},200);


function drawBar() {
	// bar	
	for (var i = 0; i < barArray.length; i++) {
		ctx.beginPath();
		ctx.moveTo(0,barArray[i].y);
		ctx.lineTo(canvas.width,barArray[i].y);
		ctx.strokeStyle='rgba('+gradient[i/2]+','+gradient[i/2]+','+gradient[i/2]+','+alphaFlash[alphaIndex]+')';
		//document.write(ctx.strokeStyle);
		ctx.stroke();
		ctx.closePath();
		
		if((barArray[i].y <= 0) && (barArray[i].direction == 0)) {
			barArray[i].direction = 1;
		} else if ((barArray[i].y >= canvas.height) && (barArray[i].direction == 1)) {
			barArray[i].direction = 0;	
		}
		
		if (barArray[i].direction == 0) barArray[i].y--;
		else barArray[i].y++;
	}
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(eyeImage,300,-30);
	if(barArray[0].direction == 1) {
		drawScroller();
		drawBar();	
	} else {
		drawBar();
		drawScroller();	
	}
}

music.play();
init();
