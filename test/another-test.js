var iso8583 = require('../lib/iso8583.js');
var util = require("util");
var conv = require("binstring");
var dateformat = require("dateformat");
var now = new Date();

var packager = new iso8583('spopd');
var msg = new Buffer('303231303234058022c082003032303030303030303030313030303838383031313831313231343930303030303131363031313831313231343931373033333130353632303030303337343237363737373737373737353230353d3137303332323637373737373737373737373030303030303030303030313030303030303030303031323334353638313001419f2608fd19d0f54d38dfb99f2701809f10120110a04000220000000000000000000000ff9f370437ed4d4d9f360201ca950500000010009a031504089c01009f02060000000005005f2a020643820239009f1a0206439f030600000000', 'hex');

var pbm = new Buffer("7238400108810200", "hex");
var pbm2 = new Buffer("3234058022c08200", "hex");

var pbmTrial = "0000000000000000";
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

var parsed = {
  "0": 200,
  "1": pbmTrial,
  "2": p2_pan,
  "3": p3_procCode.inquiry,
  "4": p4_trxAmt,
  "7": p7_transmissionDateTime,
  "11": p11_stan,
  "12": p12_localTrxTime,
  "13": p13_localTrxDate,
  "18": p18_merchantType,
  "32": p32_acqIIC,
  "37": p37_retrvRefNo,
  "41": p41_cardAcceptTermId,
  "48": p48_additionalData,
  "49": p49_trxCurrencyCode,
  "63": p63_private
};

var cobaHex = 254;
console.log("Octal: " + cobaHex);
console.log("Hex: " + parseInt(cobaHex).toString(16));
console.log("Bin: " + parseInt(cobaHex).toString(2));




console.log('Packed back:');
var msg = packager.pack(parsed);
console.log(msg);

var result = packager.unpack(msg);
console.log('Unpacked:');
console.log(result);


//var data = new Buffer("saya", "ascii");
//console.log("Isinya : " + data.toString());
//console.log("Dalam hex: " + data.toString("hex"));
//console.log("Dalam biner: " + data.toString("latin-1"));
