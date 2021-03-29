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
  player1 = new Player(100,100,'red',0);
  player2 = new Player(600,200,'blue',0);


  //collegamento giocatore al socket id
  socketClient.on('newPlayer', newPlayer);
  function newPlayer(id,N_player){
    console.log(id);
    n_player=N_player;
    if(n_player==0){
      player1.setId(id);
      console.log('1:' + player1.id);
      console.log('2:' + player2.id);
    }
    else if(n_player==1){
      player2.setId(id);
      console.log('1:' + player1.id);
      console.log('2:' + player2.id);
    }
  }
//assegna gli id del client avversario
  socketClient.on('reciveId',reciveId);
  function reciveId(id){
    var ID=0;
    if(player1.id==0){
      player1.setId(id);
      ID=player2.id;
    }
      
    else if(player2.id==0){
      player2.setId(id);
      ID=player1.id;
    }
      

    console.log(player1.id);
    console.log(player2.id);
    if(ID!=0)
      socketClient.emit('syncId', ID)

  }

  socketClient.on('user has left', disconnect);
  function disconnect(id){
    if(player1.id==id)
      player1.id=0;
    else if(player2.id==id)
      player2.id=0;
  }

  //evento movimento del mouse
  socketClient.on('mouse', newUpdate);
   function newUpdate(data){
      if(player1.id==data.id)
        player1.p2(data);
      else if(player2.id==data.id)
        player2.p2(data);
  } 

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

  if(n_player==1){
    console.log('gnaaaaa');
    var ID;
    if(player1.id!=0)
      ID=player1.id;
    else if(player2.id!=0)
      ID=player2.id;
    socketClient.emit('syncId', ID)
    n_player++;
  }

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
  //! deve essere aggiornato da entrabe i client
  if(socketClient.id==player1.id)
    disco.aggiorna(room);
/*   if(socketClient.id==player2.id)
    disco.aggiorna(room); */

  //disegna i giocatori
  player1.show();
  player2.show();
  player1.move();
  if(socketClient.id==player1.id)
    player1.aggiorna(room);
  if(socketClient.id==player2.id)
    player2.aggiorna(room);
  } 
}