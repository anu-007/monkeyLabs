const EventEmmiter = require('events');

class server extends EventEmmiter{
  constructor(client) {
      super();
      this.tasks = {};
      this.taskId = 1;
      process.nextTick(()=> {
        this.emit('response', 'enter any command');
      });
      client.on('command', (command, args) => {
        switch(command) {
          case 'help':
          case 'ls':
          case 'add':
          case 'delete':
          this[command](args);
          break;
          default:
          this.emit('response', 'unknown command');
        }
      });
  }

  taskStrings() {
    return Object.keys(this.tasks).map(key => {
      return `${key}: ${this.tasks[key]}`
    }).join('\n');
  }

  help() {
    this.emit('response', 'supported command are ls, add, delete');
  }

  ls() {
    this.emit('response', this.taskStrings());
  }

  add(args) {
    this.tasks[this.taskId] = args.join('');
    this.emit('response', `added ${this.taskId}`);
    this.taskId++;
  }

  delete(args) {
    delete(this.tasks[args[0]]);
    this.emit('response', `deleted task ${args[0]}`);
  }
}

module.exports = (client) => new server(client);