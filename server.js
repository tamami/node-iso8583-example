var net = require("net");
var assert = require("assert");
var iso8583 = require("./lib/iso8583.js");
var util = require('util');

var isoResponses = require("./util/iso-responses.js")
var switchServer = net.createServer();
var packager = new iso8583("spopd");

switchServer.on("connection", function(client) {
  client.on("data", function(data) {
    console.log("Koneksi dari : " + client.remoteAddress + " family: " + client.remoteFamily);
    var dataClient = packager.unpack(new Buffer(data).toString());
    var resultVerifying = verifying(dataClient);
    console.log("resultVerifying: " + resultVerifying);

    switch(resultVerifying) {
      case 1:
        console.log("MTI Not Valid");
        break;
      case 2:
        console.log("PAN not valid");
        break;
    }

    switch(dataClient["0"]) {
      case 200:
        console.log("Inquiry data");
        isoResponses(dataClient);
        break;
    }
  });
});

function verifying(data) {
  var result;
  if(data["0"] == 200 || data["0"] == 400 || data["0"] == 410 ||
      data["0"] == 800) result = 0;
  else return 1;
  return result;
}

switchServer.listen(8085);

console.log("Listening on 8085");
