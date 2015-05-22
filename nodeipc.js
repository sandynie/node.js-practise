var childprocess = require('child_process');
var tcp = require('net').createServer();

var n = childprocess.fork(__dirname+'/sub.js');

n.on('message',function(m){
	console.log('Parent get message :',m);
})

n.send({helo:'world'});

tcp.on('connection',function(client){
	client.end('handled by parent');
});

tcp.listen(1337,function(){
	n.send('server',tcp);
});