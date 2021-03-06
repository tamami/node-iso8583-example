var iso8583 = require('../lib/iso8583.js');
var util = require("util");
var conv = require("binstring");

var packager = new iso8583('spopd');
var msg = new Buffer('303231303234058022c082003032303030303030303030313030303838383031313831313231343930303030303131363031313831313231343931373033333130353632303030303337343237363737373737373737353230353d3137303332323637373737373737373737373030303030303030303030313030303030303030303031323334353638313001419f2608fd19d0f54d38dfb99f2701809f10120110a04000220000000000000000000000ff9f370437ed4d4d9f360201ca950500000010009a031504089c01009f02060000000005005f2a020643820239009f1a0206439f030600000000', 'hex');

console.log("Isi buffer: " + msg.toString());
var parsed = packager.unpack(msg);
console.log('Unpacked:');
console.log(parsed);

console.log("Hasil inspect: " + util.inspect(parsed));
var dataHex = new Buffer(parsed["0"], "ansii");
console.log("Komponen ke-0: " + dataHex);
console.log("Hex Komponen ke-0: " + dataHex.toString("hex"));
console.log("Komponen ke-1: " + parsed["1"]);
console.log("Binary: " + parsed["1"].toString("binary"));
console.log("Inspect komponen ke-1: " + util.inspect(parsed["1"], {colors: true}));


console.log('Packed back:');
var msg = packager.pack(parsed);
console.log(msg);
console.log("Hasil Hex: " + msg);
