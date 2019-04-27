const _ = require('lodash');
const args = process.argv.slice(2); 

const paramsObject = {
	port:{
		value: 555,
		command: "--port=",
	},
	host:{
		value: "127.0.0.1",
		command: "--host=",
	}
};

const commands = _.map(paramsObject,param=>param.command);

function getConnectionOptions(){
	_.forEach(args,(arg)=>{
		_.forEach(paramsObject,(paramObject,paramKey)=>{
			if(arg.includes(paramObject.command)){
				paramObject.value = arg.replace(paramObject.command,"");
			}
		});

	});		

	return { 
		host: paramsObject.host.value,
		port: paramsObject.port.value
	};
}


module.exports = {
	getConnectionOptions,
	paramsObject
};