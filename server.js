var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;
var fs = require('fs');

const handlebars = require('handlebars');

const input = './index.hbs';
const output = './index.html';

const data = require('./data.json');

const source = fs.readFileSync(input, 'utf8');
const header = fs.readFileSync("./hbs/header.hbs", 'utf8');
const body = fs.readFileSync("./hbs/body.hbs", 'utf8');
const footer = fs.readFileSync("./hbs/footer.hbs", 'utf8');

handlebars.registerPartial("head-block", header);
handlebars.registerPartial("hero-block", body);
handlebars.registerPartial("footer-block", footer);

const template = handlebars.compile(source, { strict: true });
const result = template(data);
fs.writeFileSync(output, result);

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

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

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
