class Player{
    constructor(x, y,color,id) {
      this.id=id;
      this.body= Matter.Bodies.circle(x,y,20)
      this.c = color;
      Matter.World.add(engine.world, this.body);
    }
    //imposta l'id del socket per poter essere identificato tra i client connessi
    setId(id){
      this.id=id;
    }
    //disegna sul canvas l'oggetto
    show() {
      let pos = this.body.position;
      fill(this.c);
      ellipse(pos.x,pos.y,40)
    }
    //non è pensato per poter essere utilizzato nella build attuale
    /* move(){
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
    } */

    //manda al server le informazioni aggiornate della sua posizione
    aggiorna(room){
      let data = {
        x: this.body.position.x,
        y: this.body.position.y,
        id: this.id
      }
      socketClient.emit('mouse', data,room);
    }
    //imposta la posizione in base alle informazioni ricevute dal server
    setPosizione(data){
      Matter.Body.setPosition(this.body, {x: data.x, y: data.y});
    }
    //riporta l'oggetto nelle coordinate impostate
    //todo impopstare un reset di emergenza in caso gli oggetti si trovino al di fuori del campo di gioco
    reset(X,Y){
      Matter.Body.setPosition(this.body, {x: X,y: Y});
    }
}