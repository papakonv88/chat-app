const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname + './../public');
const PORT = process.env.PORT || 3000;

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('New user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    
 /*   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the group!'));*/
    
   socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }
       
       socket.join(params.room);
       users.removeUser(socket.id);
       users.addUser(socket.id, params.name, params.room);
       
       io.to(params.room).emit('updateUserList', users.getUserList(params.room));
       
       socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the room!`));
       
        callback();
    });
        
    
   socket.on('createMessage', (data, callback) => {
      console.log('create message: ', data);
       io.emit('newMessage', generateMessage(data.from, data.text));
       callback('This comes from server');
   });
    
  socket.on('createLocationMessage', (coords) => {
      console.log('coords:', coords.lat, coords.lon);
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lon))
  })
    
    socket.on('disconnect', ()=> {
    var user = users.removeUser(socket.id);
       
    if (user) {
       io.to(user.room).emit('updateUserList', users.getUserList(user.room)); 
       io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room!`));
    }  
  }); 
    
});



server.listen(PORT, ()=> {
   console.log(`App listen to port ${PORT}`); 
});
