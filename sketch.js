var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
 
var particle;
var turn = 0;
var gamestate = "play";
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;

function setup() {
  createCanvas(400, 800);
  engine = Engine.create();
  world = engine.world;
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  for (var j = 50; j <=width-50; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }
  for (var j = 25; j <=width-10; j=j+50) {  
    plinkos.push(new Plinko(j,175));
  }
  for (var j = 50; j <=width-50; j=j+50) {
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 25; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }
}

function draw() {
  background("black");
  textSize(20)
  text("Score : " + score, 20, 30);
  text("200", 20, 700);
  text("100", 100, 700);
  text("50", 190, 700);
  text("100", 260, 700);
  text("200", 340, 700);
  Engine.update(engine);
  if (turn >= 5){
    gamestate = "end"
  }
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();   
  }
  for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
  }
  if (particle != null){
    particle.display();
    if (particle.body.position.y > 790){
      if (particle.body.position.x < 80){
        score = score + 500;
        particle = null
        if (turn >= 5){
          gamestate = "end"
        }
      }
      else if (particle.body.position.x > 81 && particle.body.position.x < 160){
        score = score + 100;
        particle = null
        if (turn >= 5){
          gamestate = "end"
        }
      }
      else if (particle.body.position.x > 161 && particle.body.position.x < 240){
        score = score + 50;
        particle = null
        if (turn >= 5){
          gamestate = "end"
        }
      }
      else if (particle.body.position.x > 241 && particle.body.position.x < 320){
        score = score + 100;
        particle = null
        if (turn >= 5){
          gamestate = "end"
        }
      }
      else if (particle.body.position.x > 321){
        score = score + 200;
        particle = null
        if (turn >= 5){
          gamestate = "end"
        }
      }
    }
  }
  if (gamestate === "end"){
    textSize(50)
    text("Game Over", 75, 350)
  }
}

function mousePressed(){
  if (gamestate !== "end"){
    turn = turn + 1;
    particle != null;
    particle = new Particle(mouseX, 10, 10);
  }
}