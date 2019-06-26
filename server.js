var http= require('http');
var fs= require('fs');
var url=require('url');
var path=require('path');

//create a server
http.createServer( function(req, res){
    var pathname= url.parse(req.url,true);
    var filename= "index.html" + pathname.pathname;
    //print file's name
    // console.log("request for "+ pathname +" received");

    fs.readFile(filename, function (err, data) {
        console.log(pathname)
        if (err) {
           //console.log(err);
           res.writeHead(404, {'Content-Type': 'text/html'});
           res.end('<h1>404 not found</h1>');
        } else {	
           res.writeHead(200, {'Content-Type': 'text/html'});
        //    res.writeHead(200, {'Content-Type': 'text/css'});	
           res.write(data);	
           res.end();	
        }
        
    });      
}).listen(8080);

console.log('running at http://127.0.0.1:8080/');