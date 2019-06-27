var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    Handlebars = require('handlebars'),
    port = process.argv[2] || 8888;
var fs = require('fs');
const handlebars = require('handlebars');

const inFile = './index.hbs';
const outFile = './index1.html';

const data = require('./list_products.json');

const source = fs.readFileSync(inFile, 'utf8');
const template = handlebars.compile(source, { strict: true });
const result = template(data);
fs.writeFileSync(outFile, result);
http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index1.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
