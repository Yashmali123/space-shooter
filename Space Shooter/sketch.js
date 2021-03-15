const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine,world;
var PLAY=1;
var END=0;
var gameState=PLAY;
var ground,bg;
var player,playerimg;
var heartimg,heart;
var crossimg,cross;
var die,checkpoint;
var score=0;
var life=2;
var wall1,wall2,wall3,wall4;
var rocket,rocketimg;
var aliens1,aliens2,aliens3,aliens4,aliens5,aliens6;
var meter1,meter2,img1,img2;
var satellite,satelliteimg;
var enemy2,enemy3,enemy4,enemy4,enemy5,enemy6,enemy7;
var enemyGroup,satelliteGroup,rocketGroup;

function preload() {
 
bg=loadImage("back.png")
playerimg=loadImage("spaceship.png")
heartimg=loadImage("heart.png")
crossimg=loadImage("x.png")
rocketimg=loadAnimation("sprites/rocket1.png","sprites/rocket2.png",
"sprites/rocket3.png","sprites/rocket4.png","sprites/rocket5.png",
"sprites/rocket6.png","sprites/rocket7.png","sprites/rocket8.png",
"sprites/rocket9.png","sprites/rocket10.png")

enemy1=loadImage("enemy1.png");
enemy2=loadImage("enemy2.png");
enemy3=loadImage("enemy3.png");
enemy4=loadImage("enemy4.png");
enemy5=loadImage("enemy5.png");
enemy6=loadImage("enemy6.png");
enemy7=loadImage("enemy7.png");


img1=loadImage("sprites/meter2.png");
img2=loadImage("sprites/meter4.png");

satelliteimg=loadImage("download.png")

  }

  function setup(){
    var canvas  = createCanvas(800,500);
    engine = Engine.create();
    world = engine.world;

    player=createSprite(370,400,20,20)
    player.addImage("ship",playerimg)
    player.scale=0.7;
    player.debug=true;
    player.setCollider("rectangle",0,0,110,110)


   
  

    heart=createSprite(40,40,20,20)
    heart.addImage("heart",heartimg)
   //heart.scale=0.2;

     cross=createSprite(80,40,20,20)
     cross.addImage("heart1",crossimg)
     cross.scale=0.2;

     wall1=createSprite(10,390,20,300);
     wall2=createSprite(400,250,800,20);
     wall3=createSprite(400,490,800,20);
     wall4=createSprite(790,390,20,300); 

     wall1.visible=false;
     wall2.visible=false;
     wall3.visible=false;
     wall4.visible=false;
     
     enemyGroup=createGroup();
     satelliteGroup=createGroup();
     rocketGroup=createGroup();

    
  }


  function draw(){
    background(bg);

  if(gameState=PLAY){
  
    player.velocityX=0;
    player.velocityY=0;

    if(keyDown(LEFT_ARROW)){
    player.velocityX=-8
    player.velocityY=0;
    }

    if(keyDown(RIGHT_ARROW)){
    player.velocityX=8
    player.velocityY=0;
      }

    if(keyDown(UP_ARROW)){
    player.velocityX=0
    player.velocityY=-8;
        }

    if(keyDown(DOWN_ARROW)){
    player.velocityX=0
    player.velocityY=8;
          }
      

    if(keyDown("m")){
     bullets()
    }
    
    player.collide(wall1);
    player.collide(wall2);
    player.collide(wall3);
    player.collide(wall4);
    monster1();
    monster2();
    monster3();
    monster4();
    monster5();
    monster6();
    meters1();
    meters2();
    satellites()

  if(enemyGroup.getisTouching(player)){
      gameState=END
    }

   
    }else if(gameState===END){
      enemyGroup.destroyEach();
      player.x=100;
    }

   
  
  
    Engine.update(engine);
    drawSprites();
    }


    function bullets(){
    if(frameCount % 7=== 0){
        rocket=createSprite(player.x,player.y,20,20)
        rocket.addAnimation("rocket",rocketimg)
        rocket.velocityY=-10;
        rocket.scale=0.14
        rocket.depth=player.depth
        player.depth=+1
        rocket.lifetime=100
        rocketGroup.add(rocket);
      }

     
    }


    function monster1(){
    if(frameCount%300===0){
    aliens1=createSprite(500,-20)
    aliens1.addAnimation("alien",enemy2)
    aliens1.velocityY=6;
    aliens1.scale=0.2
    aliens1.lifetime=100
    //enemyGroup.add(aliens1);
     }

    }

    function monster2(){
    if(frameCount%150===0){
        aliens2=createSprite(400,-20)
        aliens2.addAnimation("alien",enemy3)
        aliens2.velocityY=6;
        aliens2.scale=0.2
        aliens2.depth = player.depth;
        player.depth = player.depth + 1;
        //aliens2.lifetime=100
        aliens2.debug=true;
        aliens2.addToGroup(enemyGroup)
        //enemyGroup.add(aliens2);
      }
      
     }

    function monster3(){
    if(frameCount%190===0){
        aliens3=createSprite(700,-20)
        aliens3.addAnimation("alien",enemy4)
        aliens3.velocityY=6;
        aliens3.scale=0.2
        aliens3.lifetime=100
       // enemyGroup.add(aliens3)
        }
      
      }

    function monster4(){
      if(frameCount%420===0){
     aliens4=createSprite(100,-20)
     aliens4.addAnimation("alien",enemy6)
     aliens4.velocityY=6;
     aliens4.scale=0.2
     aliens4.lifetime=100
     //enemyGroup.add(aliens4)
      }
    
    }

    function monster5(){
    if(frameCount%280===0){
    aliens5=createSprite(180,-20)
    aliens5.addAnimation("alien",enemy7)
    aliens5.velocityY=6;
    aliens5.scale=0.2
    aliens5.lifetime=150
    //enemyGroup.add(aliens5)
    }

   }

  function monster6(){
   if(frameCount%400===0){
  aliens6=createSprite(260,-20)
  aliens6.addAnimation("alien",enemy5)
  aliens6.velocityY=6;
  aliens6.scale=0.2
  aliens6.lifetime=100
  //enemyGroup.add(aliens6)
   }
  
  }

  function meters1(){
  if(frameCount%300===0){
  meter1=createSprite(-20,120,20,20)
  meter1.addAnimation("meter1",img1)
  meter1.scale=0.2;
  meter1.velocityX=10;
  meter1.lifetime=120;
    }
  }

  function meters2(){
  if(frameCount%200===0){
  meter2=createSprite(820,250,20,20)
  meter2.addAnimation("meter1",img2)
  meter2.scale=0.2;
  meter2.velocityX=-10;
  meter2.lifetime=120;
    }
  }

  function satellites(){
   if(frameCount%600===0){
  satellite=createSprite(820,225,20,20)
  satellite.addAnimation("meter1",satelliteimg)
  satellite.scale=0.4;
  satellite.velocityX=-5;
  satellite.lifetime=200;
  satelliteGroup.add(satellite)
  }

  }


