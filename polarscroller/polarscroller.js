var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;
var accum;

var message = "welcome to bitsavage... this is my rose curve scroller! follow @bitsavage on twitter";
var charArray = [];

var r = 0;
var a = 300;
var n = 2000;
var start = 0;
var end = Math.PI * 2;
var curPos = 0;
var inc = (end - start) / n;


function initCharArray() {
	// create message character tracking array
	accum = canvas.width;
	for (var i = 0; i < message.length; i++) {
		
		nChar = message.charCodeAt(i) - 32;

		charArray[i] = {
			x : 0,
			y : 0,
			cur : accum/8
		};
				
		if ((nChar > 0) && (nChar < myFontsheet.spriteArray.length)) {		
			accum += 100;			
		} else accum += 100;
	}	
}

function init() {

	// Setup canvas
	canvas.width = 800;
	canvas.height = 800;
	accum = canvas.width;

	myFontsheet = new Fontsheet("font.png", "font.xml", 2);
	myFontsheet.loadFontsheet();

	// create message character tracking array
	initCharArray();
		
	// call draw function every 10 msecs
	timer = setInterval(loop, 10);
	return timer;
}

function drawScroller() {
    // scroller
	var asciiVal = 0;
	for (var i = 0; i < message.length; i++) {

		asciiVal = message.charCodeAt(i) - 32;
		if (asciiVal >= 0) {
			ctx.drawImage(myFontsheet.fontsheetImage, 
				myFontsheet.spriteArray[asciiVal].sx, 
				myFontsheet.spriteArray[asciiVal].sy, 
				myFontsheet.spriteArray[asciiVal].width, 
				myFontsheet.spriteArray[asciiVal].height, 
				charArray[i].x,
				charArray[i].y, 
				myFontsheet.spriteArray[asciiVal].width, 
				myFontsheet.spriteArray[asciiVal].height);
		}

		r = a * Math.cos(2 * charArray[i].cur);
		charArray[i].x = 400 + (r * Math.sin(charArray[i].cur));
		charArray[i].y = 400 + (r * Math.cos(charArray[i].cur));
		charArray[i].cur += inc;
		
		// if ((charArray[i].x < -100) && (i == message.length-1)) {
			// initCharArray();
		// } else
			// charArray[i].x -= 1;
	}
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawScroller();
}

init();
