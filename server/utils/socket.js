const socketio = require('socket.io'); //.listen(server);

module.exports.listen = function(app) {

    let io = socketio.listen(app);

    io.on('connection', function (socket) {
        console.log('User connected');
        socket.on('disconnect', function() {
          console.log('User disconnected');
        });
    
        socket.on('SEND_MESSAGE', function(data) {
            console.log("BaoTHD")
            console.log(data);
            io.emit('MESSAGE', {message: data})
        });
      });
}


