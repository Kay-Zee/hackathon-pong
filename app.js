var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.use(express.static('js'));

var server = require('http').createServer(app);
var io = require('socket.io')(server, { pingTimeout: 60000 });

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('send', function(data) {
    console.log('emitting: ', data.id === socket.id);
    io.sockets.emit('render', data.message);
  });

  socket.on('disconnect', function(reason) {
    console.log('closing connection. reason:', reason);
  });
});

app.get('/', function(req, res) {
  res.render('test');
});

server.listen(3000);