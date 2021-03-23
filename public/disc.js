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
          if(data.x<=45 && data.y>150 && data.y<325){
            console.log('goal');
            punteggio2++;
            this.reset();
            socketClient.emit('goal');
          }
          else if(data.x>=755 && data.y>150 && data.y<325){
            console.log('punto');
            punteggio1++;
            this.reset();
          }
        }

        d2(data){
          Matter.Body.setPosition(this.body, {x: data.x, y: data.y});
        }

        reset(){
          Matter.Body.setPosition(this.body, {x: 400,y: 200});
          Matter.Body.setVelocity(this.body,{x: 0,y: 0});
        }

      
}