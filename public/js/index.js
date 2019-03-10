var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
/*  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);*/
    var formattedTime = moment(message.createdAt).format('h:mm a');
    app.inputs.push({from: message.from, message: message.text, createdAt: formattedTime})
});

socket.on('newLocationMessage', function (message) {
    
    
 /* var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);*/
    var formattedTime = moment(message.createdAt).format('h:mm a');
    app.inputs.push({from: message.from, url: message.url, createdAt: formattedTime})
});

var app = new Vue ({
    el: '#app',
    data: {
       inputs:[]
    }   
})

Vue.component ('new-line', {
 props: ['input'],
 template: '<div class="all"><div class="message__title"><h4>{{ input.from }}</h4><span>{{ input.createdAt }}<span/></div><div v-if="input.message != null" class="message__body"><p>{{ input.message }}</p></div><div v-else class="message__body"><p><a v-bind:href="input.url" target="_blank">My current location</a></p></div></div>'
})


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
