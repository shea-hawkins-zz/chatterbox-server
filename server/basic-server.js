/* Import node's http module: */
var express = require('express');
var path = require('path');
var messageServer = require('./message-server');
var app = express();

var port = 3000;
var ip = '127.0.0.1';

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//app.get('/index', function());

// app.use('/client', express.static('client'));
//app.use('/index.html', express.send('client/index.html'));


//express.static(__dirname + '/client/client'));


app.get('/classes/messages', messageServer.get);
app.post('/classes/messages', messageServer.post);
app.options('/classes/messages', messageServer.options);
app.use('/client', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.use('/', express.static(path.join(__dirname, '../client')));
app.listen(port, function() {
  console.log('Listening on http://' + ip + ':' + port);
});
