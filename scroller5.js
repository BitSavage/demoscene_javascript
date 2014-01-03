var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;
var accum;

var music = new Audio("ReadySteadyGo.mp3");
var eyeImage = new Image();

var message = "This is a test message.";
var fontSheetImage = new Image();
var spriteArray = new Array();
var charArray = new Array();

function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", dname, false);
	xhttp.send();
	return xhttp.responseXML;
} 

function initCharArray() { // 0Xdeadc0de
	// create message character tracking array
	accum = canvas.width;
	for (var i = 0; i < message.length; i++) {
		
		nChar = message.charCodeAt(i) - 33;

		charArray[i] = new charLoc({
			x : accum,
			y : 15
		});
				
		if ((nChar >= 0) && (nChar < spriteArray.length)) {
			singleSprite = spriteArray[ nChar ];
			
			accum += singleSprite.width;			
		} 
		else accum += 20;
	}	
}

function charLoc(options) {
	var that = {};

	that.x = options.x;
	that.y = options.y;

	return that;
}

function spriteLoc(sx,sy,width,height) {
	this.sx = sx;
	this.sy = sy;
	this.width = width;
	this.height = height;
}

function alertme() {
	document.write("here");
}

function init() {

	fontSheetImage.src = "font.png";

	// Setup canvas
	//canvas = document.getElementById("theCanvas");
	canvas.width = 200;
	canvas.height = 100;
	accum = canvas.width;

	// create message character tracking array
	initCharArray();
		
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

		//charArray[i].y = 0;//(amplitude * (Math.sin(frequency * charArray[i].x) + shiftStartingAngle)) + shiftWaveY;
		//charArray[i].x--;
		asciiVal = message.charCodeAt(i) - 33;
		if (asciiVal >= 0) {
			ctx.drawImage(fontSheetImage, 
				spriteArray[asciiVal].sx, 
				spriteArray[asciiVal].sy, 
				spriteArray[asciiVal].width, 
				spriteArray[asciiVal].height, 
				charArray[i].x, 
				charArray[i].y, 
				spriteArray[asciiVal].width, 
				spriteArray[asciiVal].height);
		}

		if ((charArray[i].x < 0) && (i == message.length - 1)) {
			initCharArray();
		} else
			charArray[i].x--;
	}
}

// function drawBar() {
	// // bar	
	// for (var i = 0; i < barArray.length; i++) {
		// ctx.beginPath();
		// ctx.moveTo(0,barArray[i].y);
		// ctx.lineTo(canvas.width,barArray[i].y);
		// ctx.strokeStyle='rgba('+gradient[i/2]+','+gradient[i/2]+','+gradient[i/2]+','+alphaFlash[alphaIndex]+')';
		// ctx.stroke();
// 		
		// if((barArray[i].y <= 0) && (barArray[i].direction == 0)) {
			// barArray[i].direction = 1;
		// } else if ((barArray[i].y >= canvas.height) && (barArray[i].direction == 1)) {
			// barArray[i].direction = 0;	
		// }
// 		
		// if (barArray[i].direction == 0) barArray[i].y--;
		// else barArray[i].y++;
	// }
// }

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(eyeImage,0,-30);
	drawScroller();
	// if(barArray[0].direction == 1) {
		// drawScroller();
		// drawBar();	
	// } else {
		// drawBar();
		// drawScroller();	
	// }
}

xmlDoc = loadXMLDoc("fontmetrics.xml");
xmlCharacters = xmlDoc.getElementsByTagName("character");

for (i = 0; i < xmlCharacters.length; i++){
	spriteArray[i] = {
		sx: +( xmlCharacters[i].getElementsByTagName("x")[0].childNodes[0].nodeValue ), 
		sy: +( xmlCharacters[i].getElementsByTagName("y")[0].childNodes[0].nodeValue ), 
		width: +( xmlCharacters[i].getElementsByTagName("width")[0].childNodes[0].nodeValue ), 
		height: +( xmlCharacters[i].getElementsByTagName("height")[0].childNodes[0].nodeValue )};
}

init();
