var net = require("net");

var client = new net.Socket();
client.connect(5050, "127.0.0.1", function() {
  console.log("Connected");
  client.write("Hello, server! Love, Client.");
});

client.on("data", function(data) {
  console.log("Received: " + data);
  client.destroy();
});

client.on("close", function() {
  console.log("Connection closed");
});
