const net = require('net');
const chalk = require('chalk');
const args = require('./command_argument_handler.js');
const log = require('./log_util.js').log;

const _ = require('lodash');
const input = process.stdin;
input.setEncoding('utf-8');

log("Connected to: ",args.paramsObject.host.value);

const client = net.createConnection(args.getConnectionOptions(), 
	() => {
		client.write('now we rokkin world!\r\n');
	}
);

client.on('data', (data) => {
	log("data",data.toString());
	log(':~$');
	input.on('data',function(data){
		client.write(data);
	});		

});

client.on('end', () => {
	console.log('disconnected from server');
});


