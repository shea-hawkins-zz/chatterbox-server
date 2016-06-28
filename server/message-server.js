
var headers = require('./headers.js');
var path = require('path');
var readline = require('readline');
var fs = require('fs');
var messagePath = path.join(__dirname, 'messages/message.txt');
var messageReadStream = fs.createReadStream(messagePath);
var messageWriteStream = fs.createWriteStream(messagePath, {flags: 'a'}); 

// Truncate messages array after some number of messages have been reached.
var messages = [];

var messageStream = readline.createInterface({
  input: messageReadStream,
  output: messageWriteStream
});

messageStream.on('line', function(line) {
  messages.push(JSON.parse(line));
});


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
    messageWriteStream.write(JSON.stringify(newMessage) + '\n');
    headers['Content-Type'] = 'application/json';
    var responseMsg = JSON.stringify({status: 'success'});
    response.writeHead(statusCode, headers);
    response.end();
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
  var responseMsg = JSON.stringify({options: 'GET POST OPTIONS', GET: 'RETRIEVE MESSAGES', POST: 'POST MESSAGE'});
  response.writeHead(statusCode, headers);
  response.end(responseMsg);
};

module.exports.get = get;
module.exports.post = post;
module.exports.options = options;