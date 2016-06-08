var github = require('./server/services/github');

console.log('fetching');
github.org('code42').then(function(data) {
  console.log(data);
});