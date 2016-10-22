var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.get('/wiki', function(request, response){
	req = new XMLHttpRequest();

	url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cimages%7Cextracts&titles=Albert+Einstein&pllimit=500&exintro=1&explaintext=1&exsectionformat=plain';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		console.log('loaded');
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			console.log(data);
			response.json(data);
		}
	}, false);

	req.send(null); 
});

app.get('/query', function(request,response) {
	req = new XMLHttpRequest();

	//base url:
	var base = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cimages%7Cextracts&titles=Albert+Einstein&pllimit=500&exintro=1&explaintext=1&exsectionformat=plain';

	req.send(null); 
});

server.listen(8080, function () {
    console.log('wikiverse app listening on port ' + 8080);
});