var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

 socket.on('newMessage',function (message) {
        appSocket.incomings.push(message);
        })
        
        
    new Vue({
        el: '#app',
        data: {
         message: 'Welcome to the chat App!'   
        }
    })
        
    
        
    new Vue ({
        el: '#chatapp',
        data: {
            msg: '',
        },
        methods: {
            submit: function (e) {
                e.preventDefault()
                
               socket.emit('createMessage', {
                   from: 'Bob',
                   text: this.msg
               }, function (data) {
                    console.log('Got it', data);
                   })
                 this.msg=''
                  }
        }
       })
        
  var appSocket = new Vue ({
        el: '#socket_on',
        data: {
            incomings : []
        },
        methods: {
            
      }   
    })
    
    

/*
socket.emit('createMessage', {
    from,
    text
}, function (data) {
    console.log('Got it', data);
});
*/

/*
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
*/
