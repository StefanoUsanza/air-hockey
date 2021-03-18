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

        aggiorna(){
          let data = {
            x: this.body.position.x,
            y: this.body.position.y
          }
          socketClient.emit('disco', data);
          //! sostituire con evento collisioni
          if(data.x<150){
            socketClient.emit('goal');
          }
        }

        d2(data){
          Matter.Body.setPosition(this.body, {x: data.x, y: data.y});
        }

        reset(X,Y){
          Matter.Body.setPosition(this.body, {x: X,y: Y});
        }

      
}