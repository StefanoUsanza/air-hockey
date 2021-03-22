const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);
var Room;

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
        console.log('new connection: ' + socketClient.id + ' in room: ' + Room) 
    };
        
        
socketClient.on('mouse', mouseMessage);
function mouseMessage(data){
    socketClient.to(Room).emit('mouse', data);
    // io.socketClient.emit('mouse',data);
    //console.log(data);
}
 socketClient.on('disco', (data)=>{
    socketClient.to(Room).emit('disco', data); 
}); 
socketClient.on('score', (data)=>{
    socketClient.to(Room).emit('score', data);
});
//! sostituire con evento collisioni
socketClient.on('goal', ()=>{
    socketClient.to(Room).emit('goal');
});

}