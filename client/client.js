const net = require('net');
const args = require('./command_argument_handler.js');
const { log,logBgGreen } = require('./log_util.js');
const chalk = require('chalk');
const readline = require('readline');
const repl = require('repl');
const _ = require('lodash');

const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let currentDirectory = "";
let prompt = (directory) => chalk.green(":~"+directory+"$ ");

logBgGreen("Connected to: ",args.paramsObject.host.value);

let client = new net.Socket();

client = client.connect(
	args.getConnectionOptions(), 
	() => {
		resetInput();		
	}
);

function resetInput(){
	input.question(prompt(currentDirectory),(data)=>{
		client.write(data);
	});
}

function writeToServer(data){
	if(data === "exit")
		process.exit();
	client.write(data);
}

client.on('data', (data) => {
	const dataString = data.toString();
	if(dataString.includes("$/moveTo:$ ")){
		let givenDirectory = dataString.replace("$/moveTo:$ ","");
		currentDirectory = givenDirectory;
		console.log(currentDirectory);
	}
	if(dataString!=="$xo_reset_input$")
		log(data.toString());
	
	resetInput();
});

client.on('end', () => {
	log('disconnected from server');
});


