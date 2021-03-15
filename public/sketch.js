let socketClient;
let p1;
let p2;
var disco;
var groundB,groundL,groundR,groundT;
var player1,player2;

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

var engine = Engine.create();

var mConstraint;

function setup() {
  var canvas = createCanvas(800, 400);
  socketClient = io.connect('http://localhost:3000');
  socketClient.on('mouse', newUpdate);
  socketClient.on('disco', discoUpdate);
   function newUpdate(data){
    player2.p2(data);
  } 

// socketClient.on('disco', discoUpdate);

  function discoUpdate(data){
    disco.d2(data);
  }

  disco = new disc(400,200);
  groundB= new Ground(400, 400, 800, 100);
  groundL= new Ground(0, 200, 100, 400);
  groundR= new Ground(800, 200, 100, 400);
  groundT= new Ground(400, 0, 800, 100);

  player1= new Player(100,100,'red');
  player2= new Player(700,100,'blue');
  var canvasmouse = Mouse.create(canvas.elt);
  
  var option={
    mouse: canvasmouse
  }
  
  mConstraint = MouseConstraint.create(engine,option);

  
  World.add(engine.world,[mConstraint]);
  engine.world.gravity.y = 0;
  Engine.run(engine);
}



/* function newUpdate(data){
  //noStroke();
  p2.update(data.x,data.y);
} */

/* function mouseMoved(){
  //console.log(mouseX + ',' + mouseY);

  let data = {
    x: mouseX,
    y: mouseY
  }

  //socketClient.emit('mouse', data);
  //noStroke();
  //ellipse(mouseX,mouseY, 30);
  //! DISATTIVATA PER TEST
  //p1.update(mouseX,mouseY);
} */


function draw() {
  background(220);

  groundB.show();
  groundL.show();
  groundR.show();
  groundT.show();

  disco.show();
  disco.aggiorna();

  player1.show();
  player2.show();
  player1.move();
  player1.aggiorna();
  
}