
var headers = require('./headers.js');
//headers.headers;

var messages = [{objectId: 0, text: 'Believe in the you that believes in you.', username: 'Kyle Cho', roomname: 'ChoPros'}];

var post = function(request, response) {
  var statusCode = 201;
  var JSONstring = '';
  
  request.on('data', function(data) {
    JSONstring += data;
  });

  request.on('end', function() {
    var newMessage = JSON.parse(JSONstring);
    newMessage.objectId = messages.length;
    messages.push(newMessage);
    headers['Content-Type'] = 'application/json';
    var responseMsg = JSON.stringify({status: 'success'});
    response.writeHead(statusCode, headers);
    response.end(responseMsg);
  });
  
};

var get = function(request, response) {
  var statusCode = 200;
  headers['Content-Type'] = 'application/json';
  var responseMsg = JSON.stringify({results: messages});
  response.writeHead(statusCode, headers);
  response.end(responseMsg);
};

var options = function(request, response) {
  var statusCode = 200;
  headers['Content-Type'] = 'application/json';
  var responseMsg = JSON.stringify({status: 'success'});
  response.writeHead(statusCode, headers);
  response.end(responseMsg);
};

module.exports.get = get;
module.exports.post = post;
module.exports.options = options;