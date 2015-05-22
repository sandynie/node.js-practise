process.on('message',function(m,server){
	console.log('child get message :',m);
	if(m === 'server'){
		server.on('connection',function(client){
			client.end('handled by child');
		});
	}
});

process.send({foo:'bar'});