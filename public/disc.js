class disc{
        constructor(x, y) {
          this.body= Matter.Bodies.circle(x,y,10)
          Matter.World.add(engine.world, this.body);
        }
        show() {
          let pos = this.body.position;
          fill(0);
          ellipse(pos.x,pos.y,20)
        }

      
}