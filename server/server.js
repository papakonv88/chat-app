const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname + './../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
   console.log('New user connected');
    
   socket.on('disconnect', ()=> {
    console.log('User was disconnected');
  }); 
    
   socket.emit('newMessage', {
      from: 'Bill',
      text: 'This is an incoming message from the server',
      createdAt: new Date().toLocaleTimeString()
   });
    
   socket.on('createMessage', (data) => {
      console.log('create message: ', data); 
   });
 
});



server.listen(PORT, ()=> {
   console.log(`App listen to port ${PORT}`); 
});