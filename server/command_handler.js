const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const _ = require('lodash');

const customCommands = [
	"get",
	"insert"
];

const cd = "cd";

let currentDirectory = process.cwd();

function moveBackwards(){
	currentDirectory = currentDirectory.slice(0,
		currentDirectory.lastIndexOf("/"))
	return currentDirectory;
}

function move(commandString){
	return new Promise((resolve,error) => {
		let inParts = commandString.split(' ');
		let indexOfCd = _.indexOf(inParts,"cd");
		let directoryToMoveTo = inParts[indexOfCd+1];
		if(directoryToMoveTo === ".."){
			resolve("$/moveTo:$ "+moveBackwards());
		}
		let fullpath = currentDirectory+"/"+directoryToMoveTo;
		if(fs.existsSync(fullpath)){
			currentDirectory = fullpath;
			resolve("$/moveTo:$ "+fullpath);
		}else{
			error("Directory does not exists");
		}
	})
}

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

async function executeCommand(commandString){
	let isCustomCommand = _.indexOf(commandString) >= 0 ? true : false;
	if(commandString.includes(cd)){
		return move(commandString);
	}else if(isCustomCommand){
		console.log("is custom command");
	}else{
		return command(commandString);	
	}
}

module.exports = {
	command,
	executeCommand,
}

executeCommand("touch taa.txt")
.then(res=>console.log(res))
.catch(res=>console.log("error",res));