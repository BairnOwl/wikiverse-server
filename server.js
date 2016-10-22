var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

server.listen(process.env.PORT, function () {
    console.log('wikiverse app listening on port ' + process.env.PORT);
});