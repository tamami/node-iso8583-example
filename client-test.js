var net = require("net");
var iso8583 = require("./lib/iso8583.js");
var packager = new iso8583("spopd");
var dateformat = require("dateformat");
var now = new Date();

var startOfMessage = "ISO";
var header = "005000017";
var mTI = 200;
var p1_pBMFin = new Buffer("01110010001110000100000000000001" +
    "00001000100000011000000000000010", "binary");
p1_pBMFin = "7238400108810200";
var p2_pan = "2028000001"; // LLVAR -> N16
var p3_procCode = { // n6
  inquiry: 360000,
  byr: 560000
};
var p4_trxAmt = 5000; // n12
var p7_transmissionDateTime = dateformat(now, "mmddhhMMss"); // n10
var p11_stan = dateformat(now, "hhMM") + "01"; // n6
var p12_localTrxTime = dateformat(now, "hhMMss"); // n6
var p13_localTrxDate = dateformat(now, "mmdd"); // n4
var p18_merchantType = 7019; // n4
var p32_acqIIC = "0028"; // n4
var p37_retrvRefNo = "000000000001"; // an12
//var p39_responseCode = // n2 - client ga perlu ini
var p41_cardAcceptTermId = "0000000000000001"; // an16
var p48_p1_lengthData = "022"; // n3
var p48_p2_nop = "332901000100100010"; // n18
var p48_p3_thn = "2016"; // n4
var p48_additionalData = p48_p1_lengthData + p48_p2_nop + p48_p3_thn; // ans210
var p49_trxCurrencyCode = "360"; // n3

var p63_private = "1130348"; // n2
var data;

data = {
  '0': mTI,
  '1': p1_pBMFin,
  '2': p2_pan,
  '3': p3_procCode.inquiry,
  '4': p4_trxAmt,
  '7': p7_transmissionDateTime,
  '11': p11_stan,
  '12': p12_localTrxTime,
  '13': p13_localTrxDate,
  '18': p18_merchantType,
  '32': p32_acqIIC,
  '37': p37_retrvRefNo,
  '41': p41_cardAcceptTermId,
  '48': p48_additionalData,
  '49': p49_trxCurrencyCode,
  '63': p63_private
};

var msg = packager.pack(data);
console.log("Isi msg: " + msg);

var client = new net.Socket();
client.connect(8085, "localhost", function() {
  console.log("Terkoneksi");

  console.log("Data yang dikirim: " + msg);
  // kirim ke server
  client.write(msg);
});

client.on("data", function(data) {
  console.log("Client menerima data: " + data.toString());
});
