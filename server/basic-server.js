/* Import node's http module: */
var express = require('express');
var path = require('path');
var messageServer = require('./message-server');
var fs = require('fs');
var app = express();

var port = 3000;
var ip = '127.0.0.1';

app.get('/classes/messages', messageServer.get);
app.post('/classes/messages', messageServer.post);
app.options('/classes/messages', messageServer.options);

app.use('/client', express.static(path.join(__dirname, '../client')));

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(port, function() {
  console.log('Listening on http://' + ip + ':' + port);
});
