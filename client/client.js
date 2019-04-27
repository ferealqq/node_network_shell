const net = require('net');
const args = require('./command_argument_handler.js');
const log = require('./log_util.js').log;
const readline = require('readline');
const _ = require('lodash');

const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

log("Connected to: ",args.paramsObject.host.value);

let client = new net.Socket();

client = client.connect(
	args.getConnectionOptions(), 
	() => {
		resetInput();		
	}
);

function resetInput(){
	input.question(':~$ ',writeToServer);	
}

function writeToServer(data){
	client.write(data);
}

client.on('data', (data) => {
	log(data.toString());
	resetInput();
});

client.on('end', () => {
	log('disconnected from server');
});


