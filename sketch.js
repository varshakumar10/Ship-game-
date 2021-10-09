var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restart=loadImage("restart.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water=createSprite(200,350,600,600);
  water.addImage("water ground",waterbg);
  water.velocityX= -4;
 
 
  
  
  //creating ship
  ship=createSprite(200,300,50,50);
  ship.addImage("ship",shipimg);
  ship.scale=0.4;
  
  ship.setCollider("rectangle",0,10,50,50);
  
  //creating helicopter group
helicopterGroup=new Group();

  //creating bomb group
  bombGroup= new Group();
  
    

  //ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);


    if(keyDown("LEFT")){
      ship.x=ship.x-10;

    }
    if(keyDown("RIGHT")){
      ship.x=ship.x+10;
    }

  
    edges=createEdgeSprites();
    ship.collide(edges);
    //Call user defined function
    spawnBomb();
    spawnHelicopter();
   
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage("ship",restart);
    ship.scale=0.1;
   //water velocity becomes zero
   water.velocityX=0;

   //destroy Helicopter group
   helicopterGroup.destroyEach();

   //destroy bomb group
   bombGroup.destroyEach();
    
  
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    helicopter.lifetime = 800;
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random

 if(frameCount %200 ==0){
   bomb = createSprite(Math.round(random(40,400)),80,200,50);
  bomb.addImage(bombimg);
  bomb.scale= 0.1;
  bomb.velocityY=3;
  bombGroup.add(bomb);
  bomb.lifetime=300;
}
}




