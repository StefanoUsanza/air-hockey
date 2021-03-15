class Player{
    constructor(x, y,color) {
      this.body= Matter.Bodies.circle(x,y,20)
      this.c = color;
      Matter.World.add(engine.world, this.body);
    }
    show() {
      let pos = this.body.position;
      fill(this.c);
      ellipse(pos.x,pos.y,40)
    }

    move(){
      let pos = this.body.position;
      if(keyIsDown(LEFT_ARROW)){
        Matter.Body.applyForce(this.body, {x : pos.x, y: pos.y}, {x: -0.005, y: 0});
        if(this.body.velocity.x<-7){
          Matter.Body.setVelocity(this.body, {x: -7, y: this.body.velocity.y})
        }
       }
       if(keyIsDown(RIGHT_ARROW)){
        Matter.Body.applyForce(this.body, {x : pos.x, y: pos.y}, {x: 0.005, y: 0});
        if(this.body.velocity.x>7){
          Matter.Body.setVelocity(this.body, {x: 7, y: this.body.velocity.y})
        }
       }
       if(keyIsDown(UP_ARROW)){
        Matter.Body.applyForce(this.body, {x : pos.x, y: pos.y}, {x: 0, y: -0.005});
        if(this.body.velocity.y<-7){
          Matter.Body.setVelocity(this.body, {x: this.body.velocity.x, y: -7})
        }
       }
       if(keyIsDown(DOWN_ARROW)){
        Matter.Body.applyForce(this.body, {x : pos.x, y: pos.y}, {x: 0, y: 0.005});
        if(this.body.velocity.y>7){
          Matter.Body.setVelocity(this.body, {x: this.body.velocity.x, y: 7})
        }
       } 
    }

    aggiorna(){
      let data = {
        x: this.body.position.x,
        y: this.body.position.y
      }
      socketClient.emit('mouse', data);
    }

    p2(data){
      Matter.Body.setPosition(this.body, {x: data.x, y: data.y});
    }
  
}