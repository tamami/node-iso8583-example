var net = require("net");

var server = net.createServer(function(socket) {
  socket.write("Selamat datang");

  socket.on("data", function(data) {
    console.log("Client mengirim: " + data);
  });
});

server.listen(5050, '127.0.0.1');
