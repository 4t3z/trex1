//crea las variables del t-rex y del piso
var trex, trex_running, edges;
var groundImage;
var CloudImage;
var nube;
var cactusImage1,cactusImage2,cactusImage3,cactusImage4;
var cactusImage5;
var trexCollided;
var cactus;
var score;
var ground;
var gameOver1;
var restart1;
var cactusGroup;
var cloudsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound;
var dieSound;
var checkPointSound;
var reset;

//precarga las imagenes y animaciones
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided =
  loadAnimation("trexCollided.png");
  groundImage = loadImage("ground2.png")
  CloudImage = loadImage("Cloud.png");
  cactusImage1 = loadImage("obstacle1.png");
  cactusImage2 = loadImage("obstacle2.png");
  cactusImage3 = loadImage("obstacle3.png");
  cactusImage4 = loadImage("obstacle4.png");
  cactusImage5 = loadImage("obstacle5.png");
  gameOver1 = loadImage("GameOver.png");
  restart1 = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}


function setup(){
  //crea el espacio de trabajo
  createCanvas(600,200);
   
  score = 0;
  
  //crea el sprite del piso y hace que parezca infinito
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  
  //crea piso invisible
  invisibleFloor = createSprite(45,199,30,20)
  invisibleFloor.visible = false;
  
  //crea el Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexCollided);
  
  edges = createEdgeSprites();
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  
  cactusGroup = new Group();
  cloudsGroup = new Group();
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOver1);
  gameOver.scale = 0.7
  gameOver.visible = false;
  
  restart = createSprite(300,150,10,10);
  restart.addImage(restart1);
  restart.scale = 0.5
  restart.visible = false;
  }


function draw(){
  console.time();
  
  //establece un color de fondo 
  background("white");
  
  var mensaje = "textChain";
  console.log(mensaje);
  
  if(gameState === PLAY){
    ground.velocityX = -(5 + score/100);
  if(ground.x < 0){
       ground.x = ground.width/2;
      }
  text("score:" + score,500,30);
    score = score + Math.round(frameCount/60);
  if(score > 0 && score % 100 === 0){
       checkPointSound.play();
       }
    if(keyDown("space") && trex.y >= 164){
       trex.velocityY = -13;
       jumpSound.play();
      }
  trex.velocityY = trex.velocityY + 0.7;
    spawnClouds();
  spawnCactus();
    restart.visible = false;
  gameOver.visible = false;
    trex.changeAnimation("running",trex_running);
  if(cactusGroup.isTouching(trex)){
        dieSound.play();
        gameState = END;
        }
    }    
  else if(gameState === END){
      if(mousePressedOver(restart)){
        console.log("a.");  
        reset();
      }
    ground.velocityX = 0;
      trex.velocityY = 0;
    trex.changeAnimation("collided",trexCollided);
      gameOver.visible = true
    restart.visible = true
      cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
      cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
      }  
  
  trex.collide(invisibleFloor);
  
  console.log("this is",gameState);
  
  //ingresa la posición y del Trex
  console.log(trex.y)
  
  //muestra la posicion en x del suelo
  console.log(ground.x);
  
  //mensajes para la consola
  console.warn("cactus incoming");
  console.error("error");
  console.info("hola");
    
  //dibuja los sprites
  drawSprites();
  
  console.log(1+"+"+1);
  
  //finaliza el conteo del codigo de console.time
  console.timeEnd();
  
  //cuenta cuantas veces se ejecuta la function draw
  console.count();
}

function spawnClouds(){
  if(frameCount%60 === 0){
    nube = createSprite(600,100,40,10);
    nube.addImage(CloudImage);
    nube.y = Math.round(random(10,100));
    nube.scale = 0.7;
    nube.velocityX = -4;
    nube.lifetime = 300;
    nube.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloudsGroup.add(nube);
  }
}


function spawnCactus(){
   if(frameCount%60 === 0){
    cactus = createSprite(600,165,10,40);
    cactus.velocityX = -(7 + score/100);
     
    var number = Math.round(random(1,5));
     switch(number){
     case 1: cactus.addImage(cactusImage1);
         break;
         
     case 2: cactus.addImage(cactusImage2);
         break;
         
     case 3: cactus.addImage(cactusImage3);
         break;
         
     case 4: cactus.addImage(cactusImage4);
         break;
         
     case 5: cactus.addImage(cactusImage5);
         break;    
         default: break;    
     }
    cactus.scale = 0.5;
    cactus.lifetime = 200;
    cactus.depth = trex.depth;
    trex.depth = trex.depth+1;
    cactusGroup.add(cactus);
   }
}

function reset(){
   gameState = PLAY;
     trex.changeAnimation("running",trex_running);
   restart.visible = false;
     gameOver.visible = false;
   cactusGroup.destroyEach();
     cloudsGroup.destroyEach();
   score = 0;
   }
