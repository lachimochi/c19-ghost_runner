var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addImage("Ghost", ghostImg)
  ghost.scale = 0.4
  doorsGroup = new Group()
  climbersGroup = new Group()
}

function draw() {
  background(200);
if(gameState==="play"){

  if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("space")){
    ghost.velocityY = -3
  }
  ghost.velocityY = ghost.velocityY+0.8

  if(keyDown("left")){
    ghost.x = ghost.x-1
  }

  if(keyDown("right")){
    ghost.x = ghost.x+1
  }

  if(climbersGroup.isTouching(ghost)||ghost.y>600){
    ghost.velocityY = 0
    ghost.destroy()
    gameState = "end"
  }
//spookySound.loop()
  spawn_doors()
  drawSprites()
}
if(gameState==="end"){
  stroke("blue")
  fill("green")
  textSize(30)
  text("Game Over", 200,200)
}
}

function spawn_doors() {
  if(frameCount%240===0){
  door = createSprite(200,100)
  door.addImage(doorImg)
  climber =createSprite(200,140)
  climber.addImage(climberImg)
  door.velocityY = 2
  door.x = Math.round(random(100,450))
  climber.velocityY = 2
  climber.x = door.x
  doorsGroup.add(door)
  climbersGroup.add(climber)
  ghost.depth = door.depth
  ghost.depth+=1

}
}