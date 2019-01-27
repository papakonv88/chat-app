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
    

    
   socket.on('createMessage', (data) => {
      console.log('create message: ', data);
       io.emit('newMessage', {
           from: data.from,
           text: data.text,
           createdAt: new Date().toLocaleTimeString()
       });
   });
 
});



server.listen(PORT, ()=> {
   console.log(`App listen to port ${PORT}`); 
});