var net = require("net");
var assert = require("assert");
var iso8583 = require("./lib/iso8583.js");

var switchServer = net.createServer();
var packager = new iso8583("spopd");

switchServer.on("connection", function(client) {
  client.on("data", function(data) {
    if(verifying(data)) {
      console.log("berhasil");
      console.log("data yang dikirimkan: ");
      var intiData = data.slice(9);
      console.log(packager.unpack(intiData));
    }
  });
});

function verifying(data) {
  var som = data.toString().substr(0,3);
  var header = data.toString().substr(3,9);

  console.log(som);
  console.log(header);

  // cek isi Start of Message
  // ga perlu
  /*
  if(som !== "ISO") {
    console.log("Kesalahan kode Start of Message");
    return false;
  }

  // cek Header
  if(header !== "005000017") {
    throw "Kesalahan Header";
    return false;
  }
  */
  return true;
}

switchServer.listen(8085);

console.log("Listening on 8085");
