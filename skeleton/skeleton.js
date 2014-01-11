var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var r = 100;
var a = 400;
var n = 10000;
var start = 0;
var end = Math.PI * 2;
var curPos = 0;
var inc = (end - start) / n;

var timer;
var cube = [{x:0,y:0,z:0,theta:0},{x:0,y:100,z:0,theta:0},{x:100,y:0,z:0,theta:0},{x:100,y:100,z:0,theta:0},
			{x:0,y:0,z:100,theta:0},{x:0,y:100,z:100,theta:0},{x:100,y:0,z:100,theta:0},{x:100,y:100,z:100,theta:0}];

function init() {

	// Setup canvas
	canvas.width = 800;
	canvas.height = 800;
	
	var lastPoint = 0;
	for(var i = 0; i < cube.length; i++) {
		cube[i].theta = lastPoint;
		lastPoint = (cube[i].theta + inc) + 300;
	}

	// call draw function every 10 msecs
	timer = setInterval(loop, 10);
	return timer;
}

function draw() {

	for (var i = 0; i < cube.length; i += 1) {
		//var c = cube[i];
		
		// size of circle determines z value or visual depth
		//r = a * Math.cos(2 * c.theta);
		cube[i].x = a+(r * Math.sin(cube[i].theta));
		cube[i].y = a+(r * Math.cos(cube[i].theta));
		cube[i].theta += inc;

		// draw cube
		ctx.beginPath();
		ctx.arc(cube[i].x, cube[i].y, (cube[i].z/100)+2, 0, Math.PI * 2, true);
		ctx.fillStyle = "#FFffFF";
		ctx.fill();
	}
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	draw();
}

init();
