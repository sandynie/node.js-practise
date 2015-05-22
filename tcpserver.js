var net = require('net');

var tcpServer = net.createServer();

var clientList = [];

tcpServer.on('connection',function(client){
	client.setTimeout(15*60*1000);
	client.setEncoding('utf8');
	client.name = client.remoteAddress+":"+ client.remotePort;
	client.write('Hi'+client.name+'!\n');
	clientList.push(client);
	client.on('data',function(data){
		broadCast(data,client);
	});
	
	client.on('end',function(){
		clientList.splice(clientList.indexOf(client),1);
	});
	
	client.on('error',function(e){
		console.log(e);
	});
	
	client.on('timeout',function(){
		clientList.splice(clientList.indexOf(client),1);
	});
});


function broadCast(message,client){
	var cleanUp = [];
	clientList.forEach(function(item,index){
		if(item != client){
			if(item.writable){
				item.write(client.name+"says"+message);
			}else{
				item.iIndex = index;
				cleanUp.push(item);
				item.destroy();
			}
		}
	});
	
	cleanUp.forEach(function(item){
		clientList.splice(item.iIndex,1);
	});
}
var buf = new Buffer(256);
var len = buf.write('\u00bd + \u00bc = \u00be', 0);
console.log(len + " bytes: " + buf.toString('utf8', 0, len));

var str = "node.js";
var buf2 = new Buffer(str.length);
for(var i=0;i<str.length;i++){
	buf[i] = str.charCodeAt(i);
}
console.log(buf2);
// 12 bytes: ? + ? = ?
tcpServer.listen(9000);