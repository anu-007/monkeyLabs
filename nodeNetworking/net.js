process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();

// variable to set client id
let counter = 0;

// object to track open sockets
let sockets = {};

// calculates time stamp
function timeStamp() {
    const now = new Date();
    return `(${now.getHours()}:${now.getMinutes()})`
}

server.on('connection', (socket) => {
    socket.id = counter++;
 
    console.log('a client is connected');
    socket.write('please enter your name');

    // on data event from client
    socket.on('data', data => {
        // for first time when client connects (asks hi/her name)
        if(!sockets[socket.id]) {
            socket.name = data.toString().trim();
            socket.write(`welcome to the chat app ${socket.name} \n`);
            sockets[socket.id] = socket;
            return;
        }

        // broadcast msg from client to all the open sockets
        Object.entries(sockets).forEach(([key, cs]) => {
            if(socket.id == key) return;
            cs.write(`${socket.name} : ${timeStamp()} : ${data}`); 
        });
    });

    // handler for client disconnect event
    socket.on('end', () => {
        // delete disconnected client from the open sockets object
        delete sockets[socket.id];
        console.log('bye');
    });
});

server.listen(8000, () => { console.log('server bound') });