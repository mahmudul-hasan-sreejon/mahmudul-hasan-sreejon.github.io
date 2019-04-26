var StaticServer = require('static-server');


var server = new StaticServer({
  rootPath: './',
  port: 3000
});

server.start(function() {
  console.log('App running at: http://localhost:' + server.port + '/');
  console.log('Press Ctrl+C to stop.\n');
});