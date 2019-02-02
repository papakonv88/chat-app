const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname + './../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('New user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the group!'));
    
    
   socket.on('disconnect', ()=> {
    console.log('User was disconnected');
  }); 
    

    
   socket.on('createMessage', (data, callback) => {
      console.log('create message: ', data);
       io.emit('newMessage', generateMessage(data.from, data.text));
       callback('This comes from server');
   });
 
});



server.listen(PORT, ()=> {
   console.log(`App listen to port ${PORT}`); 
});
