class player{
  
  constructor(x, y) {
    this.position = createVector(x,y)
    this.r = 30
  }
  draw(color) {
    fill(color);
    circle (this.position.x,this.position.y,this.r)
  }
  update(x,y){
    this.position.x= x;
    this.position.y= y;
  }
}


let socket;

let p1;
let p2;

function setup() {
  createCanvas(400, 400);
  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newUpdate);
  p1 = new player(100,100);
  p2 = new player(300,300);
}

function newUpdate(data){
  //noStroke();
  p2.update(data.x,data.y);
}

function mouseDragged(){
  //console.log(mouseX + ',' + mouseY);

  let data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
  //noStroke();
  //ellipse(mouseX,mouseY, 30);
  p1.update(mouseX,mouseY);
}

function draw() {
  background(220);
  p1.draw(255);
  p2.draw(100);
}