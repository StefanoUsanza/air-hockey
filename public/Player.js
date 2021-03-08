class Player{
    constructor(x, y) {
      this.body= Matter.Bodies.circle(x,y,20)
      this.body.restitution=0.8;
      Matter.World.add(engine.world, this.body);
    }
    show() {
      let pos = this.body.position;
      fill(255, 204, 0);
      ellipse(pos.x,pos.y,40)
    }

  
}