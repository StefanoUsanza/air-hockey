class Porta{
    constructor(x,y,w,h) {
      this.porta= Matter.Bodies.rectangle(x,y,w,h, {isStatic: true});
      this.w = w;
      this.h=h;
      Matter.World.add(engine.world, this.porta);

    }
    show() {
    
      let pos = this.porta.position;
      rectMode(CENTER);
      fill(255,0,0);
      rect(pos.x,pos.y,this.w, this.h);
    }
}