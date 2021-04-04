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

        aggiorna(room){
          let data = {
            x: this.body.position.x,
            y: this.body.position.y
          }
          socketClient.emit('disco', data,room);
          if(data.x<=45 && data.y>150 && data.y<325){
            console.log('goal');
            punteggio2++;
            this.reset(200,80);
            let score = {
              score1: punteggio1,
              score2: punteggio2
            }
            socketClient.emit('score',score);
          }
          else if(data.x>=755 && data.y>150 && data.y<325){
            console.log('punto');
            punteggio1++;
            this.reset(600,80);
            let score = {
              score1: punteggio1,
              score2: punteggio2
            }
            socketClient.emit('score',score);
          }
        }

        d2(data){
          console.log('serio');
          Matter.Body.setPosition(this.body, {x: data.x, y: data.y});
        }

        reset(X,Y){
          Matter.Body.setPosition(this.body, {x: X,y: Y});
          Matter.Body.setVelocity(this.body,{x: 0,y: 0});
          Matter.Body.applyForce(this.body, {x : X, y: Y}, {x: 0, y: 0.0015});
        }

      
}