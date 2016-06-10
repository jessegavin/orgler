var cache = require('./cache');
var baseUrl = 'https://api.github.com';
var options = {
    headers: {
        'Accept': 'application/vnd.github.v3+json'
    }
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function get(url) {

    var cachedResponse = cache.get(url);

    if (cachedResponse) {
        return cachedResponse;
    }

    return fetch(url, options)
        .then(checkStatus)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cache.set(url, data);
            return data;
        });
}

function orgs(org) {
    var orgEncoded = encodeURIComponent(org);
    var orgUrl = baseUrl + '/orgs/' + orgEncoded;
    var membersUrl = baseUrl + '/orgs/' + orgEncoded + '/members';

    return Promise.all([
        get(orgUrl),
        get(membersUrl)
    ]).then(function (values) {
        return {
            org: values[0],
            members: values[1]
        }
    });
}

function users(username) {
    var usernameEncoded = encodeURIComponent(username);
    var userUrl = baseUrl + '/users/' + usernameEncoded;
    var reposUrl = baseUrl + '/users/' + usernameEncoded +'/repos?sort=updated';

    // Github returns paged results 30 per request.
    // In order to handle orgs with more than 30 users we would need to 
    // interrogate the 'Link' response header to see if the result is
    // truncated. 
    
    // If there are more pages, we could either push paging logic to the UI
    // or create a 'while loop' to load subsequent pages before resolving 
    // this promise.

    // Since it's late, and since this project is only required to load
    // members from code42 org (which has 6 members), I'll punt for now.

    return Promise.all([
        get(userUrl),
        get(reposUrl),
    ]).then(function (values) {
        return {
            user: values[0],
            repos: values[1]
        }
    });
}

module.exports = {
    getOrganization: orgs,
    getUser: users
};