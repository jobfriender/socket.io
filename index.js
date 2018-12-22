var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  })

  socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room);
  })

  socket.on('send', function(data) {
    console.log('sending message: ' + data.message);
    if(data.message.length > 0) {
      io.sockets.in(data.room).emit('message', data.handle + '$ ' + data.message);
    }
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});


