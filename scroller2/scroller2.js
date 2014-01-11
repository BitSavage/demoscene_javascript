var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;

var message = "Welcome to BitSavage. This is a simple sine wave side scroller I made using html5 and JavaScript.";

var fontSheetImage = new Image();

var spriteArray = new Array();
var charArray = new Array();

var amplitude = 10;
var frequency = 0.02;
var shiftStartingAngle = 0;
var shiftWaveY = canvas.height/4;

function reinitCharArray() {
	// create message character tracking array
	for(var i = 0; i < message.length; i++) {
		charArray[i].x = canvas.width + (i * 20);
		charArray[i].y = canvas.height / 2;
	}

}

function charLoc (options) {
	var that = {};
	
	that.x = options.x;
	that.y = options.y;
	
	return that;
}

function spriteLoc (options) {
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
	for(var i = 0; i < 100; i++) {
		spriteArray[i] = new spriteLoc({
			width: 40,
			height: 51,
			sx: startX + (xChar * 40),
			sy: startY + (yChar * 51),
			dx: canvas.width,
			dy: canvas.height/2,
		});
		
		if(xChar >= 9) {
			xChar = 0;
			yChar++;
		}
		else xChar++;
	}
	
	// create message character tracking array
	for(var i = 0; i < message.length; i++) {
		charArray[i] = new charLoc({x: canvas.width + (i * 20),	y: canvas.height / 2});
	}
	
   // call draw function every 10 msecs
   timer = setInterval(loop, 10);
   return timer;

}

function loop() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	var asciiVal = 0;
	
	for(var i = 0; i < message.length; i++) {
		
		charArray[i].y = (amplitude * (Math.sin(frequency * charArray[i].x) + shiftStartingAngle)) + shiftWaveY;
		asciiVal = message.charCodeAt(i) - 33;
		if (asciiVal >= 0) {
			ctx.drawImage(
				fontSheetImage, 
				spriteArray[asciiVal].sx, 
				spriteArray[asciiVal].sy, 
				spriteArray[asciiVal].width, 
				spriteArray[asciiVal].height, 
				charArray[i].x, 
				charArray[i].y, 
				spriteArray[asciiVal].width, 
				spriteArray[asciiVal].height);
		}
		
		if((charArray[i].x < 0) && (i == message.length-1)) {
			reinitCharArray();
		}
		else charArray[i].x--;
		 
	}
}

init();
