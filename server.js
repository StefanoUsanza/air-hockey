const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);
var Room;
var n_player=0;
var mapRoom= new Map();
var user= new Map();

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
        user.set(socketClient.id,Room);
        if(mapRoom.get(room)==null)
        mapRoom.set(room,0);        
        console.log('new connection: ' + socketClient.id + ' in room: ' + Room + ' player: ' + mapRoom.get(room))
            socketClient.emit('newPlayer',socketClient.id,mapRoom.get(room));
            mapRoom.set(room,mapRoom.get(room)+1);   
            
    };
    //non è possibile usare l'evento disconnect perchè il socket è già uscito dalla stanza
    socketClient.on('disconnecting', disconnessione)
    function disconnessione(){
        //assegna solo il valore della stanza escludendo l'id del socket
        const room = user.get(socketClient.id);
        console.log(mapRoom.get(room));
        mapRoom.set(room,mapRoom.get(room)-1);
        socketClient.to(room).emit("user has left", socketClient.id);
    }

socketClient.on('syncId',syncId);
function syncId(id){
    socketClient.to(Room).emit('reciveId',id)
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