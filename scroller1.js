var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;

var message = "BitSavage super simple scroller.";

var fontSheetImage = new Image();

var spriteArray = new Array();

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
	canvas.width = 500;
	canvas.height = 500;
	
	var cropX = 0;
	var cropY = 0;
	var startX = 20;//100; // 20 + (2 * 40)
	var startY = 20; //170; // 20 + (3 * 51)
	var xChar = 0;
	var yChar = 0;

	
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
	
	for(var i = 0; i < message.length; i++) {
		charLoc[i] = canvas.width + (i * 20);		
	}
	
   // call draw function every 10 msecs
   timer = setInterval(loop, 10);
   return timer;

}

var charLoc = Array();

function loop() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	var asciiVal = 0;
	
	for(var i = 0; i < message.length; i++) {
		
		asciiVal = message.charCodeAt(i) - 33;
		if (asciiVal >= 0) {
			ctx.drawImage(
				fontSheetImage, 
				spriteArray[asciiVal].sx, 
				spriteArray[asciiVal].sy, 
				spriteArray[asciiVal].width, 
				spriteArray[asciiVal].height, 
				charLoc[i], 
				spriteArray[asciiVal].dy, 
				spriteArray[asciiVal].width, 
				spriteArray[asciiVal].height);
		}
			
		charLoc[i]--;
		 
	}
}

init();
