var net = require("net");
var assert = require("assert");
var iso8583 = require("./lib/iso8583.js");

var prosesInquiry = require("util/proses-inquiry.js")
var switchServer = net.createServer();
var packager = new iso8583("spopd");

switchServer.on("connection", function(client) {
  client.on("data", function(data) {
    /*
    if(verifying(data)) {
      console.log("berhasil");
      console.log("data yang dikirimkan: ");
      //var intiData = data.slice(9);
      //console.log(packager.unpack(intiData));
    }*/
    var dataClient = packager.unpack(new Buffer(data).toString());
    var resultVerifying = verifying(dataClient);

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
        prosesInquiry(dataClient);
        break;
    }
  });
});

function verifying(data) {

  if(data["0"] != 200 || data["0"] != 400 || data["0"] != 410 ||
      data["0"] != 800) return 1;
  return 0;
}

switchServer.listen(8085);

console.log("Listening on 8085");
