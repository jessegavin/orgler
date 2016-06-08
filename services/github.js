var fetch = require("node-fetch");
var Promise = require("bluebird");
var pick = require('lodash/pick');
var assign = require('lodash/assign');

var baseUrl = 'https://api.github.com';
var options = {
  headers: {
    'Accept' : 'application/vnd.github.v3+json'
  }
};

function get(url) {
    console.log('fetching '+ url);
    return fetch(url, options)
        .then(function(response) {
            return response.json();
        });
}

function orgs(org) {
    var orgEncoded = encodeURIComponent(org);
    var orgUrl = baseUrl + '/orgs/'+ orgEncoded;
    var membersUrl = baseUrl + '/orgs/'+ orgEncoded + '/members';

    return Promise.all([
        get(orgUrl),
        get(membersUrl)
    ]).then(function(values) {
        return {
            org: values[0],
            members: values[1]
        }
    });
}

function users(username) {
    var usernameEncoded = encodeURIComponent(username);
    var userUrl = baseUrl + '/users/'+ usernameEncoded;
    var eventsUrl = baseUrl + '/users/'+ usernameEncoded +'/events/public';

    return Promise.all([
        get(userUrl),
        get(eventsUrl)
    ]).then(function(values) {
        return {
            user: values[0],
            events: values[1]
        }
    });
}

module.exports = {
    orgs: orgs,
    users: users
};