var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

app.get('/', function(request, response){
	req = new XMLHttpRequest();

	url = '';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			response.json(data);
		}
	}, false);

	req.send(null); 
});


server.listen(process.env.PORT, function () {
    console.log('wikiverse app listening on port ' + process.env.PORT);
});