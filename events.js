var EventEmitter = require('events').EventEmitter;

var handsome = new EventEmitter();

handsome.on('yes',function(ray,ray2){
	console.log(ray,ray2);
});

setInterval(function(){
	handsome.emit('yes',1,'yoyo');
},1000);