let socketClient;
let p1;
let p2;
var disco;
var groundB,groundL1,groundL2,groundR1,groundR2,groundT;
var player1,player2;
var porta1,porta2;
var punteggio1=0, punteggio2=0;
var state=0;
var room;
var players= Array();
var n_player=0;

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
  input = createInput();
  input.position((width/2), 50);

  button = createButton('submit');
  button.position(input.x + input.width, 50);

  if(state==0){
    button.mousePressed(joinRoom);
    function joinRoom(){
      room = input.value();
      socketClient.emit('join', room);
      input.remove();
      button.remove();
      state=1;
      //players[0] = new Player(300,100,'red');
      
    }
  }

  //collegamento giocatore al socket id
  socketClient.on('newPlayer', newPlayer);
  function newPlayer(id,N_player){
    console.log(id);
    n_player=N_player;

   if(n_player==0){
      players[n_player]= new Player(100,100,'red',id);
      n_player++;
      socketClient.emit('player1', players[n_player-1].id);
    }
    else if(n_player==1){
      socketClient.on('player2',p2);
      function p2(id){
        players[n_player]= new Player(100,100,'red',id);  
      }
      players[n_player]= new Player(700,100,'blue',id);
    } 

  }

  //evento movimento del mouse
  socketClient.on('mouse', newUpdate);
   function newUpdate(data){
    for(let i=0; i<1; i++){
      if(players[i].id==data.id){
        players[i].p2(data);
      }
    }
  } 

  //evento movimento disco, aggiorna posizione disco


  //evento aggiornamento punteggi
  socketClient.on('score',scoreUpdate);
  function scoreUpdate(data){
    punteggio1=data.score1;
    punteggio2=data.score2;
  }


  //creazione disco
  disco = new disc(400,200);

  //creazione bordi del campo
  groundB= new Ground(400, 400, 800, 100);
  groundL1= new Ground(0, 75, 100, 150);
  groundR1= new Ground(800, 75, 100, 150);
  groundL2= new Ground(0, 325, 100, 150);
  groundR2= new Ground(800, 325, 100, 150);
  groundT= new Ground(400, 0, 800, 100);

  //creazione porte
  porta1= new Porta(0,200,50,100);
  porta2= new Porta(800,200,50,100);

  var canvasmouse = Mouse.create(canvas.elt);
  
  //todo ottimizzare movimenti disco
  socketClient.on('disco', discoUpdate);
  function discoUpdate(data){
    disco.d2(data);
  }

  //mouse constraint
  var option={
    mouse: canvasmouse
  }

  mConstraint = MouseConstraint.create(engine,option);
  World.add(engine.world,[mConstraint]);
  engine.world.gravity.y = 0;
  Engine.run(engine);
}


function draw() {
  background(255);

if(state==1){

  //disegna i bordi del campo
  
  groundL1.show();
  groundR1.show();
  groundL2.show();
  groundR2.show();
  groundT.show();
  groundB.show();  
  
  //disegna i punteggi
  textSize(32);
      fill(0);
      text(punteggio1 + " SCORE " + punteggio2, (width / 2)-80, 35)

  //disegna le porte
  porta1.show();
  porta2.show();

  //disegna il disco
  disco.show();
  disco.aggiorna(room);

  //disegna i giocatori
/*   player1.show();
  player2.show();
  player1.move();
  player1.aggiorna(room); */

  for(let i=0; i<1; i++){
    players[i].show();
    players[i].aggiorna(room);
  }
  
  }
}