/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var msgServer = require('./message-server');
var messages = [];
var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  console.log(request.url);

  var statusCode, responseMsg;
  var headers = defaultCorsHeaders;

  if (request.url === '/classes/messages') {
    headers['Content-Type'] = 'application/json';
    if (request.method === 'GET') {
      statusCode = 200;
      responseMsg = JSON.stringify({results: messages});
    } else if (request.method === 'POST') {
      statusCode = 201;
      var JSONstring = '';
      
      request.on('data', function(data) {
        JSONstring += data;
      });

      request.on('end', function() {
        var newMessage = JSON.parse(JSONstring);
        newMessage.objectId = messages.length;
        messages.push(newMessage);
        response.end();
      });

      responseMsg = JSON.stringify({status: 'success'});
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      responseMsg = JSON.stringify({status: 'success'});
    } else {
      statusCode = 404;
      responseMsg = 'Request invalid';
    }
  } else {
    statusCode = 404;
    headers['Content-Type'] = 'text/plain';
    responseMsg = 'Request URL invalid';
  }
  response.writeHead(statusCode, headers);
  response.end(responseMsg);
  
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;


