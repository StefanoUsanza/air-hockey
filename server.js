let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

let io = socket(server);

console.log('server running');

io.sockets.on('connection', newConnection);

function newConnection(socket){
console.log('new connection: ' + socket.id)

socket.on('mouse', mouseMessage);
function mouseMessage(data){
    socket.broadcast.emit('mouse', data);
    // io.sockets.emit('mouse',data);
    //console.log(data);
}

}