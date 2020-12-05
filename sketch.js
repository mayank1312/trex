var trex, trexImage ,edges,ground,invisibleGround,clouds,obstacle,obstacle2,obstacle1,obstacle3,obstacle4,obstacle5,obstacle6,randomNumber,PLAY,END,gameState,obstacles,cloude,trexCollided,gameover,reset,gameOver,Reset,score,highScore,kala;
function preload(){
  trexImage=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground4=loadImage("ground2.png");
  cloud=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trexCollided=loadAnimation("trex_collided.png")
  gameover=loadImage("gameOver.png");
  reset=loadImage("restart.png");
  kala=loadSound("kala.mp3");
}
function setup() {
  createCanvas(400, 400);
trex=createSprite(40,370,10,10);
 
  trex.addAnimation("trexImage",trexImage);
  trex.addAnimation("trexCollided",trexCollided);
  trex.scale=0.6;
  
  ground=createSprite(200,370,10,10);
  ground.addImage(ground4);
  ground.velocityX=-3;
  invisibleGround=createSprite(40,385,10,10);
  invisibleGround.visible=false;
    PLAY=2;
  END=7;
  gameState=PLAY;
  obstacles=createGroup();
  cloude=createGroup();
  gameOver=createSprite(200,170,10,10);
  gameOver.addImage(gameover);
  gameOver.visible=false;
  
   Reset=createSprite(200,250,10,10);
  Reset.addImage(reset);
 Reset.visible=false;
  score=0;
  highScore=0;

}

function draw() {
  background(180);
  drawSprites();
  
  cloude.depth=trex.depth;
  trex.depth+=1;
  if(gameState===PLAY){
    if(keyDown("space") && trex.y>=352){
     trex.velocityY=-10;
     }
  trex.velocityY+=0.5;
    
    trex.collide(invisibleGround);
     if(ground.x<0){  
     ground.x=ground.width/2;
     }
    spawnClouds();
   spawnObstacles();
    score+=Math.round(getFrameRate()/40);
  }
  
  if(trex.isTouching(obstacles)){
    gameState=END;
    loadSound("kala.mp3",false);
  }
  if(gameState===END){
    ground.velocityX=0;
    trex.velocityY=0;
    obstacles.setVelocityEach(0);
    cloude.setVelocityEach(0);
    trex.changeAnimation("trexCollided",trexCollided);
    gameOver.visible=true;
    Reset.visible=true;
    if(mousePressedOver(Reset)){
      restarting();
      
    }
  }
  textSize(17);
 text("score: "+score,160,50);
  text("High score: "+highScore,270,50);
  if(score % 100===0){
    obstacles.velocityx+=0.2;
    
  }
}
function spawnClouds(){
  if(frameCount % 40===0){
     clouds=createSprite( 370,Math.round(random(250,300)),10,10);
  clouds.addImage(cloud);
    cloude.add(clouds);
     clouds.velocityX=-3;
    clouds.scale=0.7;
    clouds.lifetime=133;
  
     }
  
  
}
function spawnObstacles(){
    if(frameCount % 100===0){
      randomNumber=Math.round(random(1,6));
    obstacle=createSprite(370,370,10,10)
      obstacles.add(obstacle);
    obstacle.velocityX=-5;
      obstacle.lifetime=133;
     switch(randomNumber){
    
         case 1:
         obstacle.addImage(obstacle1);
         break;
         case 2:
         obstacle.addImage(obstacle2);
         break;
         case 3:
         obstacle.addImage(obstacle3);
          break;
         case 4:
         obstacle.addImage(obstacle4);
          break;
         case 5:
         obstacle.addImage(obstacle5);
          break;
         case 6:
         obstacle.addImage(obstacle6);
         break;
         default:
         break;
     }
      obstacle.scale=0.5;
    }
    
  }
function restarting(){
  gameState=PLAY;
  Reset.visible=false;
  trex.changeAnimation("trexImage",trexImage);
  cloude.destroyEach();
  obstacles.destroyEach();
  gameOver.visible=false;
  if(score>highScore){
    highScore=score;
     ground.velocityX=-3;
    
    
  }
  score=0;
}