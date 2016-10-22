var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

var bodyParser = require('body-parser');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/wiki', function(request, response){
	req = new XMLHttpRequest();

	url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cimages%7Cextracts&titles=Albert+Einstein&pllimit=500&exintro=1&explaintext=1&exsectionformat=plain';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			console.log(Object.keys(data.query.pages)[0]);
			response.json(data);
		}
	}, false);

	req.send(null); 
});

app.get('/wiki/:title', function(request,response) {
	req = new XMLHttpRequest();

	var title = request.params.title;

	//base url:
	var base = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cimages%7Cextracts&titles=';
	url = base + title + '&pllimit=500&exintro=1&explaintext=1&exsectionformat=plain';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		console.log('loaded');
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			var pgID = Object.keys(data.query.pages)[0];
			var imbed = data.query.pages[Object.keys(data.query.pages)[0]];
			//console.log(data.query.pages[Object.keys(data.query.pages)[0]]);
			var t = imbed.title;
			var l = imbed.links;
			var txt = imbed.extract;
			var imgs = imbed.images;
			//console.log("TITLE:" + t);
			//console.log("links: " + l);
			//console.log("Text: " + txt);
			//console.log("Images: " + imgs);
			var result = {title: t, links: l, text: txt, images: imgs};
			console.log(result);
			response.json(JSON.stringify(result));
		}
	}, false);

	req.send(null); 
});

server.listen(8080, function () {
    console.log('wikiverse app listening on port ' + 8080);
});