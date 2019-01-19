var socket = io();
        
socket.on('connect', function () {
       console.log('Connected the server'); 
    
    socket.emit('createMessage', {
       from: 'Eui',
       text: 'Incoming message from client'
    });
    
    });
        
socket.on('disconnect', function () {
       console.log('Disconnected from server'); 
    }); 

socket.on('newMessage', function (data) {
   console.log('new message: ', data); 
});