var iso8583 = require('../lib/iso8583.js');
var util = require("util");
var conv = require("binstring");

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

var parsed = {
  "0": 200,
  "1": pbmTrial,
  "2": p2_pan,
  "3": p3_procCode.inquiry,
  "4": p4_trxAmt
};



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
