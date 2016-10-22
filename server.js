var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

app.get('/wiki', function(request, response){
	req = new XMLHttpRequest();

	url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cimages%7Cextracts&titles=Albert+Einstein&pllimit=500&exintro=1&explaintext=1&exsectionformat=plain';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			response.json(data);
		}
	}, false);

	req.send(null); 
});

app.get('/query', function(request,response) {
	req = new XMLHttpRequest();

	//base url:
	var base = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cimages%7Cextracts&titles=';
	var title = 'Albert Einstein';
	url = base + title + '&pllimit=500&exintro=1&explaintext=1&exsectionformat=plain';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			var title = data.title;
			var links = data.links;
			var text = data.extract;
			var images = data.images;
			response.json(title, links, text, images);
		}
	}, false);

	req.send(null); 
});

server.listen(process.env.PORT, function () {
    console.log('wikiverse app listening on port ' + process.env.PORT);
});