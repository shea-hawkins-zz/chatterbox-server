/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  console.log(request.url);

  var statusCode, responseMsg;
  var headers = defaultCorsHeaders;
  var someData = {
    results: [{objectId: '1', username: 'not shea', roomname: 'castro', text: 'howdy'}, {objectId: '2', username: 'not trev', roomname: 'texas', text: 'there'}]
  };

  if (request.url === '/classes/messages/') {
    headers['Content-Type'] = 'application/json';
    statusCode = 200;
    if (request.method === 'GET') {
      responseMsg = JSON.stringify(someData);
    } else if (request.method === 'POST') {

      var JSONstring = '';
      
      request.on('data', function(data) {
        JSONstring += data;
      });

      request.on('end', function() {
        someData.results.push(JSON.parse(JSONstring));
        console.log(someData.results);
        response.end();
      });

      responseMsg = JSON.stringify({status: 'success'});
    } else if (request.method === 'OPTIONS') {
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

  response.write(responseMsg);
  response.end();
  
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = requestHandler;


