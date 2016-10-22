var express = require('express');
var _ = require('underscore');
var app = express();

var max = 4;

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

////w/api.php?action=query&format=json&prop=extracts%7Clinks%7Cpageimages&
	//base url:
	var base = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Clinks%7Cpageimages&titles=';
	url = base + title + '&redirects=1&pllimit=500&exsentences=1&exintro=1&explaintext=1&exsectionformat=plain';

	req.open('GET', url, true);

	req.addEventListener('load', function(e){
		if (req.status == 200) {
			var data = JSON.parse(req.responseText);
			
			// Check if valid page
			try {
			if (Object.keys(data.query.pages).length != 0) {
				var pgID = Object.keys(data.query.pages)[0];
				var imbed = data.query.pages[Object.keys(data.query.pages)[0]];
				var t = imbed.title;

				var allLinks = imbed.links;
				var sampleLinks = _.sample(allLinks, max);
				var shuffledLinks = _.shuffle(allLinks);


				//CATCH THE REDIRECT

				//console.log(shuffledLinks);

				var l = [];

				var count = 0;
				var i = 0;

				while (count < max && count < shuffledLinks.length) {
			
						if (shuffledLinks[i] && shuffledLinks[i].hasOwnProperty('title')) {
							if (!shuffledLinks[i].title.includes("(disambiguation)") && !shuffledLinks[i].title.includes("Help:") && !shuffledLinks[i].title.includes("Category:") && !shuffledLinks[i].title.includes("Template:")) {
								l.push((shuffledLinks[i]).title);
								count++;
								console.log(l);
							}
							i++;
						} else {
							i++;
							//console.log(i);
						}
				}

				var txt = imbed.extract;
				var imgs = "";
				//check if has image
				if (imbed.hasOwnProperty('thumbnail')) {
					imgs = imbed.thumbnail.source;
				}

				console.log("Links: " + l);
				var result = {title: t, links: l, text: txt, images: imgs};
				response.json(result);

			} else {
				console.log("Page Not Found");
			} 
		} catch (err) {
				console.log("Undefined, Dun dun dun...");
		}
		}
	}, false);

	req.send(null); 
});

server.listen(8080, function () {
    console.log('wikiverse app listening on port ' + 8080);
});