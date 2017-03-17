var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/',function (req,res) {
	res.sendFile(__dirname +'/index.html');
});

io.on('connection',function(socket){
	console.log('connected to a user');
	socket.on('disconnect',function(){
		console.log('a user got disconnected');
	});

	socket.on('chat message',function(msg){
		console.log(msg);
		io.emit('chat message',msg);
	});
});

server.listen(8888,function(){
	console.log('connected to server...');
});