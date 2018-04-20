var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false;
var keys = [];
var friction = 0.91;
var gravity = 0.9;
var complete = false;


var titleStart = new Image();
titleStart.src = "../Cow-Tipping/images/Start-menu.png"
var bgImage = new Image();
bgImage.src = "../Cow-Tipping/images/New-Background.png";
var mikeIdle = new Image();
mikeIdle.src = "../Cow-Tipping/images/Mike-1@216x-8.png";
var mikeRight1 = new Image();
mikeRight1.src = "../Cow-Tipping/images/Mike-2-Right@216x-8.png";
var mikeRight2 = new Image();
mikeRight1.src = "../Cow-Tipping/images/Mike-3-Right@216x-8.png";

var treeHouse = {
  x: 658,
  y: 222,
  width: 50,
  height: 85
};


var mikeRight = [];


mikeRight.push(mikeRight1);
mikeRight.push(mikeIdle);
mikeRight.push(mikeRight2);




console.log(mikeRight)

var mike = {
	x: canvas.width/2,
	y: canvas.height - 110,
	width: 40,
	height: 60,
	speed: 4,
	velX: 0,
	velY: 0,
	color: "#fff",
	jumping: false,
  grounded: false,
  position: "idle",
	jumpStrength: 7,
	draw: function(){
    context.drawImage(mikeIdle, this.x, this.y, this.width, this.height);
    
    
	}
}

var platforms = [];
var platform_width = 100;
var platform_height = 15;

platforms.push({ //Bottom Platform
  x: 95,
  y: 1100,
  width: 540,
  height: 100
});

platforms.push({ // Platform 1
    x: 470,
    y: 1020,
    width: platform_width,
    height: platform_height,
});

platforms.push({ // Platform 2
    x: 290,
    y: 965,
    width: platform_width,
    height: platform_height,
});

platforms.push({ // Platform 3
    x: 65,
    y: 905,
    width: 235,
    height: platform_height,
});

platforms.push({ // Platform 4
  x: 380,
  y: 810,
  width: 150,
  height: 15,
});

platforms.push({ // Platform 5
  x: 215,
  y: 740,
  width: 40,
  height: 20,
});

platforms.push({ // Platform 6  
  x: 355,
  y: 640,
  width: 120,
  height: 20,
});

platforms.push({ // Platform 7
  x: 455,
  y: 585,
  width: 230,
  height: platform_height,
});

platforms.push({ // Platform 8  
  x: 220,
  y: 545,
  width: 140,
  height: 15,
});

platforms.push({ // Platform 9  
  x: 60,
  y: 425,
  width: 120,
  height: 20,
});

platforms.push({ // Platform 10
  x: 310,
  y: 375,
  width: 45,
  height: 20,
});

platforms.push({ // TreeHouse Platform  
  x: 465,
  y: 310,
  width: 260,
  height: 25,
});

document.body.addEventListener("keydown", function(event){

	if(event.keyCode == 13 && !gameStarted){
		startGame();
  } 
  if(event.keyCode == 13 && complete){
		reset();
	}
	keys[event.keyCode] = true;

});

document.body.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
});

var startMusic = new sound("")

intro_screen();

function intro_screen(){

}

function startGame(){
	gameStarted = true;
	clearCanvas();

 requestAnimationFrame(loop)
}

function levelCompleted(){
  clearCanvas();
  complete = true;
  context.drawImage(mikeIdle, 0, 0, 40, 60)
}

function reset(){
  mike.x = canvas.width/2,
	mike.y = canvas.height - 110,
	mike.grounded = true;
	mike.velY = 0;
  mike.velX = 0;
  mike.speed = 4;
	complete = false;

	requestAnimationFrame(loop);
}


function draw_platforms(){
	context.fillStyle = "rgba(100, 100, 100, 0)";

	for(var i = 0; i < platforms.length; i++){
		context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
	}
}



function loop(){
 
  context.drawImage(bgImage, 0, 0, 720, 1200);
	draw_platforms();
	mike.draw();

	if(keys[38] || keys[32]){
		if(!mike.jumping){
			mike.velY = -mike.jumpStrength*2;
			mike.jumping = true;
		}
	}

	if(keys[39]){
		if(mike.velX < mike.speed){
      mike.velX++;
      mike.position === "right";
		}
	}

	if(keys[37]){
		if(mike.velX > -mike.speed){
			mike.velX--;
		}
	}

	mike.x += mike.velX;
	mike.y += mike.velY;

	mike.velX *= friction;
	mike.velY += gravity;

	mike.grounded = false;
	for(var i = 0; i < platforms.length; i++){
		var direction = collisionCheck(mike, platforms[i]);

		if(direction == "left" || direction == "right"){
			mike.velX = 0;
		} else if(direction == "bottom"){
			mike.jumping = false;
			mike.grounded = true;
		} else if(direction == "top"){
			mike.velY *= -1;
		}

	}

	if(mike.grounded){
		mike.velY = 0;
  }
  
  if (collisionCheck(mike, treeHouse)){
    levelCompleted();
  }
  
  if (!complete){
    requestAnimationFrame(loop);
  }


}

function collisionCheck(character, platform){

	var vectorX = (character.x + (character.width/2)) - (platform.x + (platform.width/2));
	var vectorY = (character.y + (character.height/2)) - (platform.y + (platform.height/2));

	var halfWidths = (character.width/2) + (platform.width/2);
	var halfHeights = (character.height/2) + (platform.height/2);

	var collisionDirection = null;

	if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){

		var offsetX = halfWidths - Math.abs(vectorX);
		var offsetY = halfHeights - Math.abs(vectorY);
		if(offsetX < offsetY){

			if (vectorX > 0){
				collisionDirection = "left";
				character.x += offsetX;
			} else {
				collisionDirection = "right";
				character.x -= offsetX;
			}

		} else {

			if (vectorY > 0){
				collisionDirection = "top";
				character.y += offsetY;
			} else {
				collisionDirection = "bottom";
				character.y -= offsetY;
			}

		}

	}

  return collisionDirection;
  
  


}

function clearCanvas(){
	context.clearRect(0, 0, 720, 1200);
}

