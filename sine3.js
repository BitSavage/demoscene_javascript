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

var circleArray = new Array();
var colorArray = new Array();

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
       // Setup canvas
       canvas = document.getElementById("theCanvas");
       ctx = canvas.getContext("2d");

       // procedural init of circle, color gradient arrays

       // smooth gradient
       stepColor = numCircles / (maxColor-50);
       
       var color = 50;
       var colorCount = 0;

       for (var i = 0; i < numCircles; i++) {
       	  if(colorCount > stepColor) { color++; colorCount = 0; }
       	  else colorCount++;

	      circleArray[i] = new Circle(startX + (i * 1), startY, 2);
	      colorArray[i] = "#" + color.toString(16) + color.toString(16) + color.toString(16);     
       }

       // call draw function every 10 msecs
       timer = setInterval(draw, 10);
       return timer;
}

function drawBall(c) {
       ctx.beginPath();
       ctx.shadowBlur = 1;
       //ctx.shadowColor = "#ffffff";
       ctx.globalAlpha = 0.5;
       ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true);
       ctx.closePath();
       ctx.fill();
}

function adjustCircle(c) {
       if (c.x >= canvas.width)
	      c.x = 5;
       else
	      c.x += dx;

       c.y = (amplitude * (Math.sin(frequency * c.x) + shiftStartingAngle)) + shiftWaveY;

}

function draw() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       for (var i = 0; i < numCircles; i++) {
	      ctx.fillStyle = colorArray[i];
	      adjustCircle(circleArray[i]);
	      drawBall(circleArray[i]);
       }
}

init();
