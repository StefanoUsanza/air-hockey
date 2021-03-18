const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

const io = socket(server);

console.log('server running');

io.sockets.on('connection', newConnection);

function newConnection(socketClient){
console.log('new connection: ' + socketClient.id)

socketClient.on('mouse', mouseMessage);
function mouseMessage(data){
    socketClient.broadcast.emit('mouse', data);
    // io.socketClient.emit('mouse',data);
    //console.log(data);
}
 socketClient.on('disco', (data)=>{
    socketClient.broadcast.emit('disco', data); 
}); 
socketClient.on('score', (data)=>{
    socketClient.broadcast.emit('score', data);
});
//! sostituire con evento collisioni
socketClient.on('goal', ()=>{
    socketClient.broadcast.emit('goal');
});

}