const io = require('socket.io-client');

console.log(1)
const socket = io("http://localhost:6000")
console.log(socket)
console.log(2)
socket.emit('test', {data: 'test'})
console.log(3)
