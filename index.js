var net = require('net');

var server = net.createServer(function(socket) {
	socket.on('data',function(data){
		console.log("server data what "+data);
	})
	socket.pipe(socket);
});

server.listen({
	port: 555, 
	host: '127.0.0.1',
	exclusive: true
});