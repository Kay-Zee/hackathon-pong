
$(document).ready(function() {
  var socket = window.io.connect();

  $(document).on('submit', '#best', function(e){
    e.preventDefault();
    var newText = $('.message').val();

    socket.emit('send', { id: socket.id, message: newText });
  })

  socket.on('render', function(data) {
    console.log('data');
    $('.results').append(data);
  });
});

