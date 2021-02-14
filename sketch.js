var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;
var bg
var gameOver, restart;


function preload(){
 // jumpSound = loadSound("assets/sounds/jump.wav")
  //collidedSound = loadSound("assets/sounds/collided.wav")
  
  bg= loadImage("images/bg.jpg")
 // sunAnimation = loadImage("assets/sun.png");
  
  trex_running = loadAnimation("images/row1.png","images/row2.png","images/row3.png");
 // trex_collided = loadAnimation("assets/trex_collided.png");
  
  //groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("images/daimond.png");
  
  obstacle1 = loadImage("images/boxb.png");
  obstacle2 = loadImage("images/boxs.png");
  
 // gameOverImg = loadImage("assets/gameOver.png");
  //restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //sun = createSprite(width-50,100,10,10);
  //sun.addAnimation("sun", sunAnimation);
  //sun.scale = 0.1
  bg1 = createSprite(0,0,windowWidth,windowHeight);
  bg1.addImage(bg);
  bg1.velocityX = -3;
  bg1.scale = 2

  trex = createSprite(50,height-70,20,50);
  
  
  trex.addAnimation("running", trex_running);
 // trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,350)
  
  // trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  //ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
 
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
 // background(bg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
    //  jumpSound.play( )
      trex.velocityY = -10;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
      //  collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
   // gameOver.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
  //  ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   // trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      touches = []
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

