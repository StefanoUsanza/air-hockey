let socketClient;
let p1;
let p2;
var disco;
var groundB,groundL,groundR,groundT;
var player1,player2;
var porta1,porta2;
var punteggio1=0, punteggio2=0;

//definizioni variabili matter-js
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
  //evento movimento del mouse, aggiorna posizione player2
  socketClient.on('mouse', newUpdate);
   function newUpdate(data){
    player2.p2(data);
  } 

  //evento movimento disco, aggiorna posizione disco
  //todo ottimizzare movimenti disco
  socketClient.on('disco', discoUpdate);
  function discoUpdate(data){
    disco.d2(data);
  }

  //evento aggiornamento punteggi
  socketClient.on('score',scoreUpdate);
  function scoreUpdate(data){
    punteggio1=data.score2;
    punteggio2=data.score1;
  }

  //! sostituire con evento collisioni
  socketClient.on('goal',goal);
  function goal(){
    console.log("goallll");
  }

  //creazione disco
  disco = new disc(400,200);

  //creazione bordi del campo
  groundB= new Ground(400, 400, 800, 100);
  groundL= new Ground(0, 200, 100, 400);
  groundR= new Ground(800, 200, 100, 400);
  groundT= new Ground(400, 0, 800, 100);

  //creazione porte
  porta1= new Porta(1,200,100,150);
  porta2= new Porta(799,200,100,150);

  //creazione players
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

//TODO modificare con eventi di collisione
function keyPressed(){

  player1.reset(100,100);
  disco.reset(width/2, height/2);

  punteggio1++;
  var data={
    score1:punteggio1,
    score2: punteggio2 
  }
  socketClient.emit('score', data);
  
}

function draw() {
  background(220);

  //disegna i bordi del campo
  groundB.show();
  groundL.show();
  groundR.show();
  groundT.show();  
  
  //disegna i punteggi
  textSize(32);
      fill(0);
      text(punteggio1 + " SCORE " + punteggio2, (width / 2)-80, 35)

  //disegna le porte
  porta1.show();
  porta2.show();

  //disegna il disco
  disco.show();
  disco.aggiorna();

  //disegna i giocatori
  player1.show();
  player2.show();
  player1.move();
  player1.aggiorna();  
  
  
}