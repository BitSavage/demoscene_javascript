var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var timer;
var accum;

var eyeImage = new Image();

var message = "this is a big fat scroller . . . more crap to come.";
var charArray = new Array();


function initCharArray() {
	// create message character tracking array
	accum = canvas.width;
	for (var i = 0; i < message.length; i++) {
		
		nChar = message.charCodeAt(i) - 32;

		charArray[i] = {
			x : accum,
			y : 15
		};
				
		if ((nChar >= 0) && (nChar < myFontsheet.spriteArray.length)) {
			singleSprite = myFontsheet.spriteArray[ nChar ];
			
			accum += singleSprite.width+myFontsheet.kerning;			
		} 
		else accum += 20;
	}	
}

function init() {

	// Setup canvas
	canvas.width = 1200;
	canvas.height = 200;
	accum = canvas.width;

	myFontsheet = new Fontsheet("font3.png", "font3.xml", 2);
	myFontsheet.loadFontsheet();

	// create message character tracking array
	initCharArray();
		
	// eye image
	eyeImage.src = "eye.png";
	
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

		if ((charArray[i].x < -100) && (i == message.length-1)) {
			initCharArray();
		} else
			charArray[i].x -= 1;
	}
}

eyeLoc = 0;
eyeDir = 0;
function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(eyeImage,eyeLoc,0);
	if((eyeLoc > canvas.width) && (eyeDir == 0)) eyeDir = 1;
	else if ((eyeLoc < -200) && (eyeDir == 1)) eyeDir = 0
	else if (eyeDir == 0) eyeLoc += 3;
	else eyeLoc -= 3;
	 
	drawScroller();
}

init();
