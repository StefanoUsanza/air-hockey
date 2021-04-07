class Ground{
    constructor(x,y,w,h) {
      this.ground= Matter.Bodies.rectangle(x,y,w,h, {isStatic: true});  
      this.ground.restitution = 0.9;
      this.w = w;
      this.h=h;
      Matter.World.add(engine.world, this.ground);

    }
    show() {
    
      let pos = this.ground.position;
      rectMode(CENTER);
      noStroke();
      fill(183,119,41);
      rect(pos.x,pos.y,this.w, this.h);
    }

  
}