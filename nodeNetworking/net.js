process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();
let counter = 0;
let sockets = {};

function timeStamp() {
    const now = new Date();
    return `(${now.getHours()}:${now.getMinutes()})`
}

server.on('connection', (socket) => {
    socket.id = counter++;
 
    console.log('a client is connected');
    socket.write('please enter your name');

    socket.on('data', data => {
        if(!sockets[socket.id]) {
            socket.name = data.toString().trim();
            socket.write(`welcome to the chat app ${socket.name} \n`);
            sockets[socket.id] = socket;
            return;
        }

        Object.entries(sockets).forEach(([key, cs]) => {
            if(socket.id == key) return;
            cs.write(`${socket.name} : ${timeStamp()} : ${data}`); 
        });
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('bye');
    });
});

server.listen(8000, () => { console.log('server bound') });