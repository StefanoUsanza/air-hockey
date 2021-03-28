const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);
var Room;
var n_player=0;

app.use(express.static('public'));

const io = socket(server);
//todo implementa selezione stanza
console.log('server running');

io.sockets.on('connection', newConnection);

function newConnection(socketClient){
    socketClient.on('join',join)
    function join(room){
        Room=room;
        socketClient.join(Room);
        console.log('new connection: ' + socketClient.id + ' in room: ' + Room + ' player: ' + n_player)
        if(n_player==0){
            socketClient.emit('newPlayer',socketClient.id,n_player);
            n_player++;    
        }
        else if(n_player==1){
            console.log('ricevuto')
            socketClient.emit('newPlayer',socketClient.id,n_player);
            n_player++;
        }
        
    };

socketClient.on('player1', p1);
function p1(id){        
    socketClient.emit('player2',id);
}
        
socketClient.on('mouse', mouseMessage);
function mouseMessage(data,room){
    socketClient.to(room).emit('mouse', data);
    
    // io.socketClient.emit('mouse',data);
    //console.log(data);
}
 socketClient.on('disco', (data,room)=>{
    socketClient.to(room).emit('disco', data); 
}); 
socketClient.on('score', (data)=>{
    socketClient.to(Room).emit('score', data);
});


}