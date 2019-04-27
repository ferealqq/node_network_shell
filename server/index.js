const net = require('net');
const { executeCommand } = require('./command_handler.js');

var server = net.createServer(function(socket) {
	socket.on('data',(data)=>{
		console.log("data to string: ",data.toString());
		executeCommand(data.toString())
		.then(response=>{
			console.log("response: ",response);
			if(response === "")
				socket.write("$xo_reset_input$");
			else
				socket.write(response);
		}).catch(err => socket.write("Command not found"));
	});	
});

server.listen({
	port: 555, 
	host: '127.0.0.1',
	exclusive: true
});