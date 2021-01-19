var tower,towerImg;
var door,doorImg,doorG;
var climber,climberImg,climberG;
var ghost,ghostImg;
var iblock,iblockG;

var spooky;

var PLAY=1;
var END=0;

var gameState=PLAY;

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spooky = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  ghost.debug = true;
  
  doorG = new Group();
  climberG = new Group();
  iblockG = new Group();
}

function draw(){
  background(0);
  
  if(gameState===PLAY){
     //to reset the tower
      if(tower.y>600){
        tower.y = 300
        }
        
        //making the ghost move with arrows
        if(keyDown("LEFT_ARROW")){
          ghost.x = ghost.x-3
        }

        if(keyDown("RIGHT_ARROW")){
          ghost.x = ghost.x+3
        }

        if(keyDown("space")){
          ghost.velocityY = -5
        }

        ghost.velocityY = ghost.velocityY+0.8;

        if(climberG.isTouching(ghost)){
          ghost.velocityY = 0;
        }


        if(iblockG.isTouching(ghost) || ghost.y>600){
           ghost.destroy();
           gameState = END;
          }

        spawnDoor();
  }

  drawSprites();
  
  if(gameState===END){
    
    spooky.play();
    
    stroke("red");
    fill("yellow");
    textSize(40);
    text("GAME OVER",170,250)
    
    tower.destroy();
  }
  
}

function spawnDoor(){
  
  if(frameCount%100===0){
    door = createSprite(350,-50,20,50);
    door.addImage(doorImg);
    door.velocityY = 2;
    door.x = Math.round(random(150,400));
    door.lifetime=350
    doorG.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
    climber = createSprite(350,0);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climber.x = door.x
    climber.lifetime = 350
    climberG.add(climber)
    climber.depth = ghost.depth;
    climber.debug=true;
    
    iblock = createSprite(350,5)
    iblock.width=climber.width
    iblock.height=2;
    iblock.x=door.x;
    iblock.velocityY=2;
    iblock.debug=true;
    iblockG.add(iblock);
  }
}

