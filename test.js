exports.datareader = function() {

    var serialport = require('serialport');
    var legacy = require('legacy-encoding');

    const Readline = require('@serialport/parser-readline')
    var portName = 'COM3';

    var myPort = new serialport(portName, {
        baudRate: 38400,
        parser: new serialport.parsers.Readline('\n')
    });

    myPort.on('open', onOpen);
    myPort.on('data', onData);

    var name = "yes";

    var dataarray = [1];

    function onOpen(){
        console.log('Open connections!');
    }

    function onData(data){
        var x = data;

        dataarray.push(x);

        if(c9 != 1){
            if(c1 == 0){
                myPort.write(buf1);
                c1 = 1;
            } else if(c2 == 0){
                myPort.write(buf2);
                c2 = 1;
            } else if(c3 == 0){
                myPort.write(buf3);
                c3 = 1;
            } else if (c4 == 0){
                myPort.write(buf4);
                c4 = 1;
            } else if (c5 == 0){
                myPort.write(buf5);
                c5 = 1;
            } else if (c6 == 0){
                myPort.write(buf6);
                c6 = 1;
            } else if (c7 == 0){
                myPort.write(buf7);
                c7 = 1;
            } else if(c8 == 0){
                myPort.write(buf8);
                c8 = 1;
            } else {

                //array manipulation for data refferal
                dataarray.shift();
                dataarray.shift();
                for (var i = 0; i < 6; i++) {
                        dataarray.pop();
                }

                //data extraction of specified infomation

                //BLOCK 1 DATA EXTRACTION
                //extract SIID

                var siid = '';
                for (var i = 38; i < 45; i++){
                    siid = siid + String.fromCharCode(dataarray[0][i]);
                }
                console.log(siid);

                //extract club

                var club = ''
                for (var i = 46; i < 58; i++){
                    club = club + String.fromCharCode(dataarray[0][i]);
                }
                console.log(club);

                //find clear time
                if(dataarray[0][15] == 1){
                    var clear_time = 0;
                    for (var i = 16; i < 18; i++){
                        clear_time = clear_time + parseInt(dataarray[0][i]);
                        if(i == 16){
                            clear_time = clear_time * 16 * 16;
                        }
                    }
                    console.log(clear_time);
                }

                //find starting time

                if(dataarray[0][18] != 238 ){
                    var start_time = 0;
                    for (var i = 20; i < 22; i++){
                        start_time = start_time + parseInt(dataarray[0][i]);
                        if(i == 20){
                            start_time = start_time * 16 * 16;
                        }
                    }
                } else {
                    start_time = -1;
                }
                console.log(start_time);

                //find finishing time
                if(dataarray[0][22] != 238 ){
                    var finish_time = 0;
                    for (var i = 24; i < 26; i++){
                        finish_time = finish_time + parseInt(dataarray[0][i]);
                        if(i == 24){
                            finish_time = finish_time * 16 * 16;
                        }
                    }
                } else {
                    finish_time = -1;
                }
                console.log(finish_time);

                //BLOCK 2 DATA EXTRACTION
                //datapoint starts scan on sub-block 14 of data
                //point 15 is the control id
                var point_data = [];

                for(var i = 15; i < 120; i=i+4){
                    if(dataarray[1][i] != 238){
                        var obj = new Object();
                        //control number
                        obj.control_point = dataarray[1][i];
                        //control time

                        var control_time = 0;
                        var count = i + 1;

                        for (count; count < (i+3); count++){
                            control_time = control_time + parseInt(dataarray[1][count]);
                            if(count == i+1){
                                control_time = control_time * 16 * 16;
                            }
                        }


                        obj.control_timer = control_time;

                        point_data.push(obj);
                    }
                }

                console.log(point_data);

                dataarray = [];
                myPort.write(buf9);
                c1 = 0;
                c2 = 0;
                c3 = 0;
                c4 = 0;
                c5 = 0;
                c6 = 0;
                c7 = 0;
                c8 = 0;
                c9 = 1;

            }
        } else {
            c9 = 0;
        }



    }


    //lock setup
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    var c4 = 0;
    var c5 = 0;
    var c6 = 0;
    var c7 = 0;
    var c8 = 0;
    var c9 = 0;


    //receive all the blocks
    first_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x00, 0xe2, 0x09, 0x03]
    second_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x01, 0xe3, 0x09, 0x03]
    third_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x02, 0xe4, 0x09, 0x03]
    fourth_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x03, 0xe5, 0x09, 0x03]
    fifth_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x04, 0xe6, 0x09, 0x03]
    sixth_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x05, 0xe7, 0x09, 0x03]
    seventh_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x06, 0xe8, 0x09, 0x03]
    eighth_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x08, 0x00, 0x00, 0x00, 0xff, 0x02, 0xef, 0x01, 0x07, 0xe9, 0x09, 0x03]
    terminate_block = [0x1b, 0x00, 0x10, 0x30, 0x0c, 0xfc, 0x0d, 0xa8, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x09, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x03, 0x02, 0x00, 0x00, 0x00, 0xff, 0x06]
    var buf1 = new Buffer.from(first_block);
    var buf2 = new Buffer.from(second_block);
    var buf3 = new Buffer.from(third_block);
    var buf4 = new Buffer.from(fourth_block);
    var buf5 = new Buffer.from(fifth_block);
    var buf6 = new Buffer.from(sixth_block);
    var buf7 = new Buffer.from(seventh_block);
    var buf8 = new Buffer.from(eighth_block);
    var buf9 = new Buffer.from(terminate_block);


};
