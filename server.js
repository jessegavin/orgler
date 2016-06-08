
var apicache = require('apicache');
var express = require('express');
var github = require('./services/github');

var app = express();
var cacheOptions = { debug: true  };
var cache = apicache.options(cacheOptions).middleware;

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/orgs/:org", cache(30 * 1000), function (request, response) {
  github.orgs(request.params.org)
    .then(function(data) {
      response.json(data);
    });
});


app.get("/users/:username", cache(30 * 1000), function (request, response) {
  github.users(request.params.username)
    .then(function(data) {
      response.json(data);
    });
});

// listen for requests :)
listener = app.listen(process.env.PORT | 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});