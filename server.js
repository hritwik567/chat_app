var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/',function (req,res) {
	res.sendFile(__dirname +'/index.html');
});
var users = [] , connections = []; 
io.on('connection',function(socket){
	connections.push(socket);
	console.log('connected to %s users',connections.length);


	socket.on('disconnect',function(){
		connections.splice(connections.indexOf(socket),1);
		users.splice(users.indexOf(socket.username),1);
		updateUsers();
		io.emit('chat message',{msg: socket.username +' disconnected', username:socket.username});
		console.log('Disconnected: Now only %s users connnected',connections.length);
	});

	socket.on('chat message',function(data){
		console.log(data);
		io.emit('chat message',{msg:data , username:socket.username});
	});

	socket.on('new user',function(msg){
		socket.emit('userSucess',msg);
		console.log(msg);
		socket.username = msg;
		users.push(socket.username);
		updateUsers();
	});
});

function updateUsers() {
	io.emit('get user',users);
}

server.listen(8888,function(){
	console.log('connected to server...');
});