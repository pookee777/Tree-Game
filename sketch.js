const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;
const Engine = Matter.Engine;
var engine,world;
var gameState = 0;
var tree , treeImg;
var lumberjack,lumberjackImg,lumberJackCut,lumberjackGroup;
var water,waterImg,waterGroup;
var cloud,cloudsGroup,cloudImg;
var seedImg,seed1,seed2,seed3,seed4,seed5;
var deadTreeImg,ground;
var polluted,button;
var back1,back1Img;
var life1,life2,life3,life4,life5,lifeImg;
var life = 3;
var seed = 1;
var congrats,congratsImg;
var block,blockGroup;
var lumberCut;
var gameOver,gameOverImg;
function preload()
{  
  back1Img = loadImage("background 1.jpg");
  polluted = loadImage("polluted.jpg");
  treeImg = loadImage("tree.png");
  lumberjackImg = loadAnimation("cutter 1.png","cutter 2.png","cutter 3.png","cutter 4.png","cutter 5.png","cutter 6.png");
  lumberJackCut = loadImage("cut tree.png");
  waterImg = loadImage("water.png");
  seedImg = loadImage("seed.png");
  deadTreeImg = loadImage("cut tree 1.png");
  lifeImg = loadImage("life.png");
  cloudImg = loadImage("cloud.png");
  congratsImg = loadImage("congrats.png");
  gameOverImg = loadImage("gameover.png");
}

function setup() 
{
  createCanvas(1250,570);
  engine = Engine.create();
  world = engine.world;
  back1 = createSprite(width/1.2,height/2,width,height);
  back1.addImage("back",back1Img);
  back1.scale = 3;
  back1.visible = false;
  back1.velocityX = -4;
  tree = createSprite(width/8,height-210,100,100);
  tree.addImage("tree",treeImg);
  tree.setCollider("rectangle",-10,0,50,680);
  tree.scale = 0.6;
  ground = createSprite(width/2,height,width,20);
  ground.setCollider("rectangle",0,8);
  ground.shapeColor = "#5c3c10"
  button = new Button();
  waterGroup = new Group();
  blockGroup = new Group();
  lumberjackGroup = new Group();
  cloudsGroup = new Group();
  life1 = createSprite(50,height/20,10,10);
  life1.addImage("life1",lifeImg);
  life1.scale = 0.3;
  life1.visible = false;
  life2 = createSprite(110,height/20,10,10);
  life2.addImage("life2",lifeImg);
  life2.scale = 0.3;
  life2.visible = false;
  life3 = createSprite(170,height/20,10,10);
  life3.addImage("life3",lifeImg);
  life3.scale = 0.3;
  life3.visible = false;
  seed1 = createSprite(940,height/20,10,10);
  seed1.addImage("seed1",seedImg);
  seed1.visible = false;
  seed2 = createSprite(1000,height/20,10,10);
  seed2.addImage("seed2",seedImg);
  seed2.visible = false;
  seed3 = createSprite(1060,height/20,10,10);
  seed3.addImage("seed3",seedImg);
  seed3.visible = false;
  seed4 = createSprite(1120,height/20,10,10);
  seed4.addImage("seed4",seedImg);
  seed4.visible = false;
  seed5 = createSprite(1180,height/20,10,10);
  seed5.addImage("seed5",seedImg);
  seed5.visible = false;
  lumberCut = createSprite(140,height-130,100,100);
  lumberCut.addImage(lumberJackCut);
  lumberCut.scale = 0.7;
  lumberCut.visible = false;
  lumberCut.velocityX = 0;
  congrats = createSprite(width/2,height/2,50,50);
  congrats.addImage("congrats",congratsImg);
  congrats.scale = 2;
  congrats.visible = false;
  gameOver = createSprite(width/2,height/2,50,50);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;
}
function draw() 
{
  if(gameState === 0)
  {
   background("#000000");
   textSize(65);
   fill("#a7d129");
   textFont('Times New Roman');
   text("It is the year 2075,all the trees but one have",width/20,height/4);
   text("been cut down.Help the last tree on Earth to",width/20,height/2.5);
   text("plant more trees.",width/3,height/1.8)
   tree.visible = false;
   ground.visible = false;
   button.display();   
  }
    if(gameState === 1)
    {
      background("#a6e4e7");
      tree.visible = true;
      ground.visible = true;
      button.hide();
      back1.visible = true; 
      spawnWater();  
      makeBlocks();
      spawnClouds();
      cutTree();
      if(tree.isTouching(waterGroup))
      {
        waterGroup.destroyEach();
        seed += 1;
      }
      if(seed === 1)
      {
        seed1.visible = true;
        seed2.visible = false;
        seed3.visible = false;
        seed4.visible = false;
        seed5.visible = false;
      }
      if(seed === 2)
      {
        seed1.visible = true;
        seed2.visible = true;
        seed3.visible = false;
        seed4.visible = false;
        seed5.visible = false;
      }
      if(seed === 3)
      {
        seed1.visible = true;
        seed2.visible = true;
        seed3.visible = true;
        seed4.visible = false;
        seed5.visible = false;
      }
      if(seed === 4)
      {
        seed1.visible = true;
        seed2.visible = true;
        seed3.visible = true;
        seed4.visible = true;
        seed5.visible = false;
      }
      if(seed === 5)
      {
        seed1.visible = true;
        seed2.visible = true;
        seed3.visible = true;
        seed4.visible = true;
        seed5.visible = true;
        gameState = 3;
      }
      if(lumberjackGroup.isTouching(tree))
      {
        life -= 1;
        lumberjackGroup.destroyEach();
      }  
      if(life === 3)
      {
        life1.visible = true;
        life2.visible = true;
        life3.visible = true;
      }   
      if(life === 2)
      {
        life1.visible = true;
        life2.visible = true;
        life3.visible = false;
      }
      if(life === 1)
      {
        life1.visible = true;
        life2.visible = false;
        life3.visible = false;
      }
      if(life === 0)
      {
        life1.visible = false;
        life2.visible = false;
        life3.visible = false;
        gameState = 2;
      }
    }
    if(gameState === 2)
    {
      lumberCut.x = tree.x + 140;
      tree.x= height-210;
      background("lavender");
      waterGroup.setVelocityXEach(0);
      lumberjackGroup.setVelocityXEach(0);
      blockGroup.setVelocityXEach(0);
      waterGroup.setLifetimeEach(-1);
      lumberjackGroup.setLifetimeEach(-1);
      blockGroup.setLifetimeEach(-1);
      tree.addImage("tree",deadTreeImg);
      lumberCut.visible = true;
      lumberjackGroup.destroyEach();
      ground.velocityX = 0;
      tree.velocityX = 0;
      tree.velocityY = 0;
      back1.velocityX = 0;
      gameOver.visible = true;
    }
    if(gameState === 3)
    {
      waterGroup.setVelocityXEach(0);
      lumberjackGroup.setVelocityXEach(0);
      blockGroup.setVelocityXEach(0);
      waterGroup.setLifetimeEach(-1);
      lumberjackGroup.setLifetimeEach(-1);
      blockGroup.setLifetimeEach(-1);
      lumberjackGroup.destroyEach();
      ground.velocityX = 0;
      tree.velocityX = 0;
      tree.velocityY = 0;
      back1.velocityX = 0;
      congrats.visible = true;
    }
  
   if(keyDown(LEFT_ARROW))
   {
     tree.velocityX = -7;
   }
   if(keyDown(RIGHT_ARROW))
   {
     tree.velocityX = 7;
   }
   if(keyWentUp(LEFT_ARROW))
   {
     tree.velocityX = 0;
   }
   if(keyWentUp(RIGHT_ARROW))
   {
     tree.velocityX = 0;
   }
   if(keyDown(UP_ARROW))
   {
     tree.velocityY = -7;
   }
   if(keyWentUp(UP_ARROW))
   {
     tree.velocityY = 7;
   }
   if(back1.x <=width/10)
   {
     back1.x = width/1.2;
   }
   if(blockGroup.isTouching(tree))
   {
     tree.collide(blockGroup);
   }
   else
   {
   tree.collide(ground);
   }
   if(blockGroup.isTouching(lumberjackGroup))
   {
     lumberjackGroup.collide(blockGroup);
   }
   else
   {
   lumberjackGroup.collide(ground);
   }

  drawSprites();
}
function spawnWater()
{
  if(frameCount%450 === 0)
  {
    water = createSprite(width-80,height-100,50,50);
    water.y = Math.round(random(height-100,height-200));
    water.velocityX = -5;
    water.lifetime = 1500;
    water.setCollider("rectangle",0,0,2,2);
    water.addImage("water",waterImg);
    waterGroup.add(water);
  }
}
function makeBlocks()
{
  if(frameCount%370===0)
  {
    block = createSprite(width,height-27,380,50);
    block.shapeColor = "#5c3c10"
    block.velocityX = -6;
    block.lifetime = 1500;
    block.setCollider("rectangle",0,0,379,49);
    blockGroup.add(block)
  }
}
function cutTree()
{
  if(frameCount% 280==0)
  {
  lumberjack = createSprite(width/1.5,height-130,100,100);
  lumberjack.addAnimation("lumber",lumberjackImg);
  lumberjack.scale = 0.7;
  lumberjack.velocityX = -7;
  lumberjack.lifetime = 1500;
  lumberjackGroup.add(lumberjack);
  }
}
function spawnClouds()
{
  if(frameCount%300 === 0)
  {
    cloud = createSprite(width/1.5,height/3,10,10);
    cloud.addImage("cloud",cloudImg);
    cloud.y = Math.round(random(height/4,height/6));
    cloud.velocityX = -7;
    cloud.lifetime = 1300;
    cloudsGroup.add(cloud);
  }
}