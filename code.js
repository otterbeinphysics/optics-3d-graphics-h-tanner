// Code put here is executed as the page is loading.
// Use this area to initialize global variables.

var gViewport = null;
var ctx = null;
var gWidth = null;
var gHeight = null;

var gT = 0; 		// This will always be set to the current time-since-page-load, in ms
var gdT = 50; 		// This will always be set to the current time-since-last frame, (but capped at something reasonable)
var g_last_frame_t = Date.now();

var gBoxSize;
var gMyCheckbox;
var gCtl2

var gContinuousRedraw = true;

$(function(){
	// Code in this block is executated when the page first loads.

	// This sort of line can be put anywhere: it doesn't show up on the page, but shows up in the "Console"
	// To see your console:
	// On chrome: View / Developer / Javascript Console    (or command-option-j or control-option-j)
	// On firefox: Tools / Web Developer / Web Console
	// Tools also in other browers, but I recommend using one of the two above.
	// Note that you can also issue commands in the console, just like the code here!

	console.log("Hello there intrepid programmer!");

	// This is where you set up your controls.  The name of your control (id="myID") is controlled by attaching 
	// an event hook to #myID

	// How to use an input box:
	gBoxSize = parseInt($('#boxsize').val()); // initialize it

	$('#boxsize').change(function(){
		// This code is run when someone changes the content of the text box.
		gBoxSize = parseInt($(this).val());
		console.log("Changing text box size to",gBoxSize)
	})

	// The check box
	gMyCheckbox = $("#checkbox1").is(":checked");
	$("#checkbox1").change(function(){
		gMyCheckbox = $(this).is(":checked");
		console.log("checkbox is now",gMyCheckbox);
	})

	// The clickable box
	$("#ctl1").click(function(){
		console.log("ctl1 was clicked");
	});

	// The holdable box
	gCtl2 = false;
	$("#ctl2").mousedown(function(){
		console.log("ctl2 was pushed");
		gCtl2 = true;
	});
	$(window).mouseup(function(){ // this is on the whole window in case user's mouse moves off of button while holding it down.
		if(gCtl2){
			console.log("ctl2 was released");
			gCtl2 = false;
		}
	});


	// Set up the view
	gViewport = $('#viewport');
	ctx = gViewport.get(0).getContext('2d');
	gWidth = gViewport.get(0).width = gViewport.innerWidth();
	gHeight = gViewport.get(0).height =gViewport.innerHeight();

	// Set the canvas coordinates up so that the origin is in the center of the viewport
	ctx.translate(gWidth/2,gHeight/2);
	//the coord system is +x to the right and +y is down (computer paints top to bottom)
	DummyExample();

	// This draws once.
	AnimationFrame();



})

var last_frame = Date.now();
var t0 = Date.now();


function SetTime()
{
	// this function sets the global values gT and gdT to be the time since page update
}

function AnimationFrame()
{
	// This routine gets called every time a new frame happens.
	//not particularly important, it's just for the frame rate thing to make sure it doesn't stutter too bad
	//	Some utility code in case you want to make animations:
	const max_dt = 50;
	var now = Date.now();
	var dt = now - g_last_frame_t;
	g_last_frame_t = now;
	gdT = Math.min(dt,max_dt); // Call the callback function, give it the time delta.
	gT += gdT;
	$("#time").text(gT);
	$("#fps").text((1000/dt).toFixed(1));

	// Execute your code
	Draw();


	if(gContinuousRedraw) requestAnimationFrame(AnimationFrame);  // Ask the browser to call this function again when it's ready for another frame.
	// If you set gContinuousRedraw to false, it will stop doing this (which will save energy on your computer, but the display won't update unless you call AnimationFrame() manually)
}


function Draw()
{
	//does this everytime! Basically refreshes as all white
	// Here's where you will draw things!
	Clear(); // Clear the viewport; code below.

	// Note that in this projection, x is RIGHT, y is DOWN (not up!) 
	//changed 0,0 to 50,50, though I may have changed it earlier
	//add theta as a parameter for when you make it spin
	
	//theta spin
	//var deg = 133;
	//var my_theta = gT*((Math.PI)*(deg))/(180);
	DrawBox(0,0, gBoxSize, (Math.PI/180*0.1*gT));
	//not here though
	if(gMyCheckbox) DrawBox(-100,-100,gBoxSize/2);
}


function Clear()
{
	// Clears the viewport.
	//--if you change what's in the "" for fillStyle, maybe make it a grid? css 
	ctx.fillStyle= "white";
	ctx.fillRect(-gWidth/2, -gHeight/2, gWidth, gHeight);  // from xy to deltax, deltay
}

	/*
	function Project(p)
	{
	var xy = vec2(0.0);
	xy[0] = p.x()/p.z()+eye_distance)*screen_distance;
	xy[1] = p.x()/p.z()+eye_distance)*screen_distance;
	return xy;
	}

	made a a part of the thing earlier
	DrawCube(a) {
	var p1 = vec3(-a,-a,-a); var xy1 = Project(vec3(-a,-a,-a));
	2 -,+,- 3 +,+,-, 4 +,-,-, 5 -,-,+ 6 -,+,+ 7 +,+,+ 8 +,-,+
	}
	*/

	

function DrawBox(x,y,size,my_theta)
{
	// Sample code to show some simple draw commands in 2d
	ctx.strokeStyle = "red";  
	ctx.lineWidth = 2;  // thickish lines
	
	//size is the amount that you shift over to the next point?
	/*
	var x1 = x ;
	var y1 = y ;
	var x2 = x+size ;
	var y2 = y+size ;
	*/
	//***** actually, let's try to translate it first
	
	/*
	var trans_x = 30;
	var trans_y = 30;
	
	var x1 = x +trans_x;
	var y1 = y +trans_y;
	var x2 = x+size +trans_x;
	var y2 = y+size +trans_y;
	
	//****** trans_x shifts the top left corner either left or right, trans_y shifts it either up or down
	*/
	//-----let's make the box move by 15 degrees!
	
	
	
	//the rotation angle theta
	
	var deg = 133;
	// var my_theta = 0.0001*gT*((Math.PI)*(deg))/(180);
	//console.log(my_theta);
	var cos = Math.cos(my_theta);
	var sin = Math.sin(my_theta);
	console.log(" cos =", cos);
	console.log(" sin =", sin);
	
	//prev was x: +,- ... y:+,+..
	//var rot_size = size * (Math.sqrt(2))/(2);
	var x1 = x;
	var y1 = y;
	/*
	var x_plus = x1 + size;
	var y_plus = y1 + size;
	
	//var rot_x1 = x1*cos + y1*sin ;//+rot_size;
	//var rot_y1 = -x1*sin + y1*cos ;//+rot_size;
	//var rot_x2 = rot_x1 +size;
	//var rot_y2 = rot_y1 +size;
	var x2 = x_plus;
	//var x2 = x_plus*cos + y_plus*sin;
	var y2 = -x_plus*sin + y_plus*cos ;;

	var x3 = x_plus*cos + y_plus*sin
	var y3 = -x_plus*sin + y_plus*cos;
	
	var x4 = x_plus*cos + y_plus*sin;
	var y4 = -x_plus*sin + y_plus*cos;
	*/
	
	var x2 = x1 + size;
	var y2 = y1;
	
	var x3 = x2;
	var y3 = y1 + size;
	
	var x4 = x1;
	var y4 = y3;
	/*
	var rot_x1 = x1*cos + y1*sin;
	var rot_y1 = -x1*sin + y1*cos;
	*/
	var rot_x1 = x1;
	var rot_y1 = y1;
	
	var rot_x2 = x2*cos + y2*sin;
	var rot_y2 = -x2*sin + y2*cos;
	
	var rot_x3 = x3*cos + y3*sin;
	var rot_y3 = -x3*sin + y3*cos;
	
	var rot_x4 = x4*cos + y4*sin;
	var rot_y4 = -x4*sin + y4*cos;
	
	//var rot_y1 = -x1*sin + y1*cos;
	//var rot_x2 = x2*cos + y2*sin + rot_size;
	//var rot_y2 = -x2*sin + y2*cos +rot_size;
	
	// FIRST EXERCISE:
	// Modify the coordinates above so that they are rotated by 15 degrees to draw the box
	/*
	ctx.beginPath();  // We want to draw a line.
	ctx.moveTo(x1,y1);  // start at a corner upper left hand cornner
	ctx.lineTo(x2,y1);  // draw a line to the right
	ctx.lineTo(x2,y2); //  draw a line down
	ctx.lineTo(x1,y2); // draw a line left
	ctx.lineTo(x1,y1);       // Draw a line up and back to the start corner
	ctx.stroke(); // actually draw the line on the screen as a red line of thickness 
	*/
	
	ctx.beginPath();  // We want to draw a line.
	ctx.moveTo(rot_x1,rot_y1);  // start at a corner upper left hand cornner
	ctx.lineTo(rot_x2,rot_y2);  // draw a line to the right
	ctx.lineTo(rot_x3,rot_y3); //  draw a line down
	ctx.lineTo(rot_x4,rot_y4); // draw a line left
	ctx.lineTo(rot_x1,rot_y1);       // Draw a line up and back to the start corner
	ctx.stroke(); // actually draw the line on the screen as a red line of thickness 2
	
	// This code fills the box green if ctl2 is being held down with the mouse.
	ctx.fillStyle = "green";
	if(gCtl2) ctx.fill();
}



function DummyExample()
{
	// Note two different libraries in use:
	// Math.sin(x)     --> buildin javascript Math library, capital M
	// math.matrix(3)  --> our 'math' library

	// This code shows how to use matrices
	var I = identity3(); // Creates a 3x3 identity matrix

	// Create a 3x3 rotation matrix that rotates about the z-axis by an angle of 45 degrees:
	var theta = Math.PI/4;  // computers use radians!
	var R = mat3(       [ Math.cos(theta),  -Math.sin(theta), 0 ],
						[ Math.sin(theta),   Math.cos(theta), 0 ],
						[ 0              ,   0              , 1 ]
						);

	console.log("R=",R);
	// make a column vector
	var v = vec3(2,2,5); // 2i + 3j + 5k

	// multiple I x R x v
	var v_rotated = R.mult(v);



	console.log("Dummy Example",v,v_rotated);
	console.log("R",R);
	console.log("identity",I.mult(R));
	console.log("identity",R.mult(I));
}
