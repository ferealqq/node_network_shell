const util = require('util');
const exec = util.promisify(require('child_process').exec);
const _ = require('lodash');
const customCommands = [
	"get",
	"insert"
];
function command(commandString) {
	return new Promise((resolve,error) => {
		exec(commandString).then(res=>{
			let { stdout, stderr } = res;
			if(!stderr){
				resolve(stdout);
			}
		}).catch((res)=>
			error(res)
		);
	})
}

function ifCommandExists(commandString){
	return command("command -v "+commandString).catch(res=>console.log(res,"moi"));
}

async function executeCommand(commandString){
	let isCustomCommand = _.indexOf(commandString) >= 0 ? true : false;
	if(isCustomCommand){
		console.log("is custom command");
	}else{
		return command(commandString);	
	}
}

module.exports = {
	command,
	executeCommand,
}