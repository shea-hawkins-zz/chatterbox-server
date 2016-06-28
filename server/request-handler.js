/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messageServer = require('./message-server');
var headers = require('./headers');

var messages = [];
var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  console.log(request.url);

  var statusCode, responseMsg;

  var error = function () {
    statusCode = 404;
    headers['Content-Type'] = 'text/plain';
    responseMsg = 'Request URL invalid';
    response.writeHead(statusCode, headers);
    response.end(responseMsg);
  };

  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      messageServer.get(request, response);
    } else if (request.method === 'POST') {
      messageServer.post(request, response);
    } else if (request.method === 'OPTIONS') {
      messageServer.options(request, response);
    } else {
      error();
    }
  } else {
    error();
  }
};



module.exports.requestHandler = requestHandler;



