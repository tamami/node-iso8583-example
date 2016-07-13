var net = require("net");
var iso = require("./lib/iso8583.js");
var packager = new iso("spopd");

var mti = 1800;
var pbm = "00000000000000";
var data = {
  '0': mti,
  '1': pbm};
var msg = packager.pack(data);


var client = new net.Socket();
client.connect(5050, '127.0.0.1', function() {
  console.log("Terhubung dengan server");
  client.write(msg);
  console.log(msg + " telah terkirim.");
});

client.on("data", function(data) {
  console.log("Ada pesan dari server");
  console.log(data.toString());
});

client.on("timeout", function() {
  console.log("Server; timeout");
});

client.on("error", function(error) {
  console.log("Server-error: " + error);
});

client.on("end", function() {
  console.log("Server: client disconnect");
});
