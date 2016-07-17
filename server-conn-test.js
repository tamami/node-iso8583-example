var net = require("net");

var server = net.createServer(function(socket) {
  socket.write("Echo server\r\n");
  socket.pipe(socket);

  socket.on("data", function(data) {
    console.log(data.toString());
  });

  socket.on("end", function() {
    console.log("Koneksi terputus.");
  });

  socket.on("error", function(e) {
    console.log(e);
  });
});

server.listen(5050, '127.0.0.1');
