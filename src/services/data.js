var github = require('./github');
var assign = require('lodash/assign');

function orgAndUser(org, username) {
    return Promise.all([
        github.getOrganization(org),
        github.getUser(username)
    ]).then(function(values) {
        return assign(values[0], {
            detail: values[1]
        });
    });
}


module.exports = {
  loadRouteData: function(oldRoute, route) {
    if (route.name === 'org') {
      return github.getOrganization(route.org)
        .then(function(data) {
          return assign(data, {
            detail: null
          });
        });
    }
    
    if (route.name === 'member') {
      
      if (oldRoute === null || oldRoute.org !== route.org) {
        return orgAndUser(route.org, route.member);
      }

      return github.getUser(route.member)
        .then(function(data) {
          return {
            detail: data
          }
        });
    }

    return Promise.resolve({
      org: null,
      members: null,
      selectedLogin: null
    });

  }
}