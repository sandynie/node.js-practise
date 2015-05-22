var fs = require('fs');

function copy(src,dst){
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv){
	copy(argv[0],argv[1]);
}

main(process.argv.slice(2));


var rs = fs.createReadStream();
var ws = fs.createWriteStream();
rs.on('data',function(chunk){
	if(ws.write(chunk) == false){
		rs.pause();
	}
});

rs.on('end',function(){
	ws.end();
});

ws.on('drain',function(){
	rs.resume();
});