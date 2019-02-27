// client
const EventEmmiter = require('events');
const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmmiter();
const server = require('./server')(client);

server.on('response', (data) => {
  // process.stdout.write("\u001b[2J\u001b[0;0H");
  process.stdout.write(data);
  process.stdout.write('\n\> ');
});

let command, args;

rl.on('line', (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});