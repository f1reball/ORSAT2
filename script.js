console.log("yes");
let button = document.getElementById('button');
//navigator.usb.requestDevice({ filters: [{
//    vendorId: 0x10c4,
//    productId: 0x800A,
//    protocolCode: 0x01
//}]});
function plz() {
    document.write("hello")
    console.log(navigator.usb.getDevices());
    console.log("x");

};
