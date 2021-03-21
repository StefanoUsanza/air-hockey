const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);
const room="we3";

app.use(express.static('public'));

const io = socket(server);
//todo implementa selezione stanza
console.log('server running');

io.sockets.on('connection', newConnection);

function newConnection(socketClient){
    socketClient.on('join', ({room}, callback)=>{

    });
        socketClient.join(room);
        console.log('new connection: ' + socketClient.id + ' in room: ' + room) 
socketClient.on('mouse', mouseMessage);
function mouseMessage(data){
    socketClient.to(room).emit('mouse', data);
    // io.socketClient.emit('mouse',data);
    //console.log(data);
}
 socketClient.on('disco', (data)=>{
    socketClient.to(room).emit('disco', data); 
}); 
socketClient.on('score', (data)=>{
    socketClient.to(room).emit('score', data);
});
//! sostituire con evento collisioni
socketClient.on('goal', ()=>{
    socketClient.to(room).emit('goal');
});

}