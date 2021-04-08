let socketClient;
var disco;
var groundB,groundL1,groundL2,groundR1,groundR2,groundT;
var player1,player2;
var porta1,porta2;
var punteggio1=0, punteggio2=0;
var state=0;
var room;
var players= Array();
var n_player=0;
var bg;

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
  alert=null;
  input = createInput();
  input.position((width/2)-100, 50);

  button = createButton('submit');
  button.position(input.x + input.width, 50);
  bg = loadImage('images/bg.png');

  if(state==0){
    button.mousePressed(joinRoom);
    function joinRoom(){
      room = input.value();
      socketClient.emit('join', room);
      input.remove();
      button.remove();
      if(alert!=null)
        alert.remove();
      state=1;
      //players[0] = new Player(300,100,'red');
    }
  }
  player1 = new Player(100,100,'red',0);
  player2 = new Player(600,200,'blue',0);

  socketClient.on('stanza piena',stanzaPiena);
  function stanzaPiena(id,room){
    console.log('gnaaaaaaaaaaa');
    input = createInput();
  input.position((width/2)-100, 50);

  alert = createElement('h2', "la stanza "+ room + " è piena");
  alert.position((width/2)-100,150);
  //textAlign(CENTER);
  textSize(50);

  button = createButton('submit');
  button.position(input.x + input.width, 50);
    state=0;
    button.mousePressed(joinRoom);
  }

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
  //un client si è disconnesso, se è rimasto un client connesso l'avversario viene resettato per poter essere
  //sostituido da una nuova connessione
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
        player1.setPosizione(data);
      else if(player2.id==data.id)
        player2.setPosizione(data);
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
  groundB= new Ground(400, 400, 800, 80);
  groundL1= new Ground(0, 75, 80, 150);
  groundR1= new Ground(800, 75, 80, 150);
  groundL2= new Ground(0, 325, 80, 150);
  groundR2= new Ground(800, 325, 80, 150);
  groundT= new Ground(400, 0, 800, 80);

  //creazione porte
  porta1= new Porta(0,200,50,100);
  porta2= new Porta(800,200,50,100);

  socketClient.on('disco', discoUpdate);
  function discoUpdate(data){
    disco.d2(data);
  }

  //mouse constraint
  var canvasmouse = Mouse.create(canvas.elt);

  var option={
    mouse: canvasmouse
  }

  mConstraint = MouseConstraint.create(engine,option);
  World.add(engine.world,[mConstraint]);
  engine.world.gravity.y = 0;
  Engine.run(engine);
}


function draw() {
  //disegna i bordi del campo
  groundL1.show();
  groundR1.show();
  groundL2.show();
  groundR2.show();
  groundT.show();
  groundB.show(); 

  //disegna le porte
  porta1.show();
  porta2.show();

  background(bg);

//stato 1: login effettuato visualizzazione del campo di gioco
if(state==1){
  //aggiornamento id socket con il client avversario
  if(n_player==1){
    var ID;
    if(player1.id!=0)
      ID=player1.id;
    else if(player2.id!=0)
      ID=player2.id;
    socketClient.emit('syncId', ID)
    n_player++;
  }
   
  //disegna i punteggi
  textSize(32);
  textFont('arial');
  fill(0);
  text(punteggio1 + " SCORE " + punteggio2, (width / 2)-83, 35);

  //disegno player selector
  textSize(32);
  textFont('AwmU Demo');
  if(socketClient.id==player1.id){
    fill('red');
    text("Player One", (width / 2)-80, 390);
  }
  else if(socketClient.id==player2.id){
    fill('blue');
    text("Player Two", (width / 2)-80, 390);
  }
    

  //raggiunto punteggio massimo fine partita
  if(punteggio1==10 || punteggio2==10)
    state=2;

  //disegna il disco
  disco.show();
  if(socketClient.id==player1.id)
    disco.aggiorna(room);

  //disegna i giocatori
  player1.show();
  player2.show();
  if(socketClient.id==player1.id)
    player1.aggiorna(room);
  if(socketClient.id==player2.id)
    player2.aggiorna(room);
  } 
  //state 0 schermata di log in
  //visualizza logo e form log in
  else if(state == 0){
    background(0,200,200);
    textSize(24);
    textFont('AwmU Demo');
    fill(0);      
    text('Air Hockey',(width/2)-80,100 );
    text('Online',(width/2)-80+44,126 );
  }
  else if(state ==2){
    background(0,200,200);
    textSize(50);
    fill(0);
    textFont('AwmU Demo');
    if(punteggio1==10 && socketClient.id==player1.id)
      text('Hai vinto',(width/2)-100,100 );
    else if(punteggio2==10 && socketClient.id==player2.id)
      text('Hai vinto',(width/2)-100,100 );
    else
    text('Hai perso',(width/2)-100,100 );  
  }
}