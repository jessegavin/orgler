var express = require('express');

var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
listener = app.listen(process.env.port | 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});