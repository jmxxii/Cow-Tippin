// var canvasBg = document.getElementById('game');
// var ctx = canvasBg.getContext("2d");

// var image = new Image();
// image.src = "../Cow-Tipping/images/Level-Layout.png";

// ctx.drawImage(image, 0, 0, 7680, 720)


var canvas = document.getElementById('game');
var context = canvas.getContext("2d");
var keys = [];
var gameStart = false;
var friction = 0.6;
var gravity = .9;

var bgImage = new Image();
// bgImage.src = "../Cow-Tipping/images/Level-Layout.png";

var backgroundScroll = {
  x: 0,
  y: 0
}


// STAR BACKGROUND



// PLAYER 1=================================================================================

var mike = {
  x: 10,
  y: 300,
  width: 80,
  height: 100,
  speed: 30,
  velX: 0,
  velY: 0,
  jump: false,
  grounded: false,
  jumpPower: 8,
  color: "#fbfbfb",
  draw: function(){
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}


// PLATFORMS================================================================================
var platform = [];
var grassPfWidth = 1065; 
var grassPfheight = 215; // height 215 width 800

platform.push({ //#1
  x: 0,
  y: 525,
  width: 1060,
  height: grassPfheight
});

platform.push({ //#2
  x: 1145,
  y: 525,
  width: grassPfWidth,
  height: grassPfheight
});

platform.push({ //#3
  x: 2340,
  y: 525,
  width: 210,
  height: grassPfheight
});

platform.push({ //#4
  x: 2670,
  y: 525,
  width: grassPfWidth,
  height: grassPfheight
});

platform.push({ //#5
  x: 3835,
  y: 450,
  width: 85,
  height: 25
});

platform.push({ //#6
  x: 3960,
  y: 400,
  width: 90,
  height: 25
});

platform.push({ //#7
  x: 4065,
  y: 325,
  width: 205,
  height: 25
});

platform.push({ //#8
  x: 4320,
  y: 375,
  width: 90,
  height: 25
});

platform.push({ //#9
  x: 4345,
  y: 190,
  width: 90,
  height: 25
});

platform.push({ //#10
  x: 4400,
  y: 170,
  width: 275,
  height: 20
});

platform.push({ //#11
  x: 4650,
  y: 190,
  width: 90,
  height: 25
});

platform.push({ //#12
  x: 4570,
  y: 450,
  width: 85,
  height: 25
});


platform.push({ //#13
  x: 4695,
  y: 400,
  width: 90,
  height: 25
});

platform.push({ //#14
  x: 4800,
  y: 325,
  width: 205,
  height: 25
});

platform.push({ //#15
  x: 5065,
  y: 375,
  width: 90,
  height: 25
});

platform.push({ //#16
  x: 5180,
  y: 525,
  width: grassPfWidth,
  height: grassPfheight
});

platform.push({ //#17
  x: 6450,
  y: 580,
  width: 45,
  height: 120
});

platform.push({ //#17
  x: 6700,
  y: 525,
  width: 1000,
  height: grassPfheight
});


// PLATFORM END================================================================================

// class Vector2{
//   constructor(x, y){
//     this.x = x;
//     this.y = y;
//   }
// }

// class AABB {
//   constructor(center, halfSize) {
//     this.center = center;
//     this.halfSize = halfSize;
//   }

//    overlapss(other) {
//      var center = this.center;
//      var halfSize = this.halfSize;
//     if ( Math.abs(center.x - other.center.x) > halfSize.x + other.halfSize.x ){
//       return false;
//     } 

//     if ( Math.abs(center.y - other.center.y) > halfSize.y + other.halfSize.y ) {
//       return false;
//     }

//     return true;
//   }
// }

// class MovingObject {
//   constructor (){
//     this.oldPosition = new Vector2(50, 50);
//     this.position = new Vector2(50, 50);

//     this.oldSpeed = new Vector2(0, 0);
//     this.speed = new Vector2(0, 0); 

//     this.scale = new Vector2(1, 1);

//     this.boundingBox = new AABB(this.position, new Vector2(20, 20));
  
//     this.pushedRightWall = false;
//     this.pushesRightWall = false;

//     this.pushedLeftWall = false;
//     this.pushesLeftWall = false;

//     this.wasOnGround = false;
//     this.onGround = false;

//     this.wasAtCeiling = false;
//     this.atCeiling = false;
  
//   }

//   updatePhysics(){ //updating old position...
//     this.oldPosition = this.position; 
//     this.oldSpeed = this.speed;
    
//     this.wasOnGround = this.onGround;
//     this.pushedRightWall = this.pushesRightWall;
//     this.pushedLeftWall = this.pushesLeftWall;
//     this.wasAtCeiling = this.atCeiling;

//     this.position += this.speed * 1000/60;
//     if (this.position.y < 0.0){
//       this.position.y = 0.0;
//       this.onGround = true;
//     } else {
//       this.onGround = false;
//     }

//     this.AABB.center = this.position;
//   }

// }

// var CharacterState = {
//   "Stand": 0,
//   "Walk": 1,
//   "Jump": 2
// };

// class Character { 
//     constructor(){ // Game Start values...
//       this.body = new MovingObject();
//       this.currentState = CharacterState.Stand;
//       this.walkSpeed = 0;
//       this.jumpSpeed = 0;

//     }

//     updateCharacter(){
//       switch (this.currentState){
//           case CharacterState.Stand:
//             this.body.speed = new Vector2(0, 0);
//             break;
//           case CharacterState.Walk:
//               break;
//           case CharacterState.Jump:
//               break;
//       }
//       this.body.updatePhysics();
//       draw();
//     }

//     draw() {
//       // this.body.position.x, this.body.boundingBox.halfSize.x*2, this.body.boundingBox.halfSize.y*2;
//     }
// }

// var mike = new Character();

// GAME MENU================================================================================

document.body.addEventListener("keydown", function(event){

  if (event.keyCode == 13 && !gameStart){
    startGame();
  }

  keys[event.keyCode] = true;

});

document.body.addEventListener("keyup", function(event){
  keys[event.keyCode] = false;
});

startScreen();

function startScreen (){
context.font = "50px Impact";
context.fillStyle = "#fff";
context.textAlign = "center";
context.fillText("Cow Tippin", canvas.width/2, canvas.height/2);

context.font = "20px Arial";
context.fillText("Enter To Start", canvas.width/2, canvas.height/2 + 50);
}

// GAME START========================================================================================

function startGame(){
  gameStart = true;
  clearCanvas();

  setInterval(function(){
    clearCanvas();
    gameLoop();
  }, 1000/60)

}

// PLATFORMS=========================================================================================

function drawPlatforms(){
  context.fillStyle = "rgba(100, 100, 100, 0.6)";
  for(var i = 0; i < platform.length; i++){
    context.fillRect(platform[i].x + backgroundScroll.x, platform[i].y, platform[i].width, platform[i].height);
  }
}


// GAME SPEED/GAME REFRESH/MOVEMENTS====================================================================

function gameLoop(){
  // BackGround Scroll
  context.drawImage(bgImage, backgroundScroll.x, backgroundScroll.y, 7680, 720)
  
  drawPlatforms();
 
  mike.draw();
  if(keys[90] || keys[32]){
    if(!mike.jump){
    mike.velY = -mike.jumpPower * 2; 
    mike.jump = true;
    }
  }

  if(keys[39]){ // RIGHT
    mike.velX = mike.speed;
  }
  if(keys[37]){ // LEFT
    mike.velX = -mike.speed;
  }

  var newX = mike.x + mike.velX;
  mike.y += mike.velY;
  mike.velX *= friction;
  mike.velY += gravity;
  mike.grounded = false;
  // mike.xDirection = 1;
  
  for(var i = 0; i < platform.length; i++){
    var direction = checkCollision(mike, platform[i]);
    if (direction == "left" || direction == "right"){
      mike.velX = 0;
    } else if(direction == "bottom"){
      mike.jump = false;
      mike.grounded = true;
    } else if (direction == "top"){
      mike.velY *= -1;
    }
    if (mike.grounded) {
      mike.velY = 0;
    }
  }

  // if(mike.y >= canvas.height - 295){
  //   mike.y = canvas.height - 295;
  //   mike.jump = false;
  // }

  function checkCollision(character, platform){
    var vectorX = (character.x + (character.width/2) - (platform.x + platform.width/2) );
    var vectorY = (character.y + (character.height/2) - (platform.y + platform.height/2) );
    var halfWidth = (character.width/2) + (platform.width/2);
    var halfHeight = (character.height/2) + (platform.height/2);

    var collisionDir = null;

    if(Math.abs(vectorX) < halfWidth && Math.abs(vectorY) < halfHeight){

      var offsetX = halfWidth - Math.abs(vectorX);
      var offsetY = halfHeight - Math.abs(vectorY);

      if (offsetX < offsetY){
        if(vectorX > 0) {
          collisionDir = "left";
          character.x += offsetX;
        } else {
          collisionDir = "right";
          character.x -= offsetX;
        }
      } else {
         if (vectorY > 0 ){
           collisionDir = "top";
           character.y += offsetY;
         } else {
           collisionDir = "bottom";
           character.y -= offsetY;
         }
      }
    }

    return collisionDir;

  
  }


  //BACKGROUND SCROLL================================================================================================
  // var FIXED_X_POS = 425;

  if (backgroundScroll.x === 0 && mike.x < 425) { // start of level
    mike.x = Math.max(10, newX); // position needs to be at least 10
    mike.x = Math.min(425, mike.x); // at most 425
  }
  else if (backgroundScroll.x === 0 && mike.x === 425) {
    mike.x = newX;
  }
  else if (backgroundScroll.x === -6400 && mike.x >= 425) { // end of level
    mike.x = Math.min(newX, canvas.width - 20);
  } 
  else {
    var newPos = backgroundScroll.x - mike.velX;
    newPos = Math.min(0, newPos); // position of background needs to be at most 0
    backgroundScroll.x = Math.max(-6400, newPos); // and at least -6400
    mike.x = 425; // while background is scrolling, we fix mike at 425
  }

  console.log(mike.x)


}


function clearCanvas(){
  context.clearRect(0, 0, 1280, 720);
};