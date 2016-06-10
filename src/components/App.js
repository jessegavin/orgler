var assign = require('lodash/assign');
var get = require('lodash/get');
var router = require('../services/router');
var data = require('../services/data');

var Alert = require('./Alert');
var OrgSummary = require('./OrgSummary');
var UserList = require('./UserList');
var UserDetail = require('./UserDetail');

var App = React.createClass({
  getInitialState: function () {
    return {
      org: null,
      members: [],
      selectedLogin: null,
      detail: null,
      loading: true,
      route: null,
      rateLimitExceeded: false
    }
  },

  componentWillMount: function () {
    window.addEventListener('hashchange', this.getStateByLocation, false);

    // Set default org
    if (window.location.hash.length < 3) {
      window.location.hash = "/code42";
    }
  },

  componentDidMount: function () {
    this.getStateByLocation();
  },

  componentWillUnmount: function () {
    window.removeEventListener('hashchange', this.getStateByLocation, false);
  },

  getStateByLocation: function () {
    var self = this;

    var oldRoute = self.state.route;
    var newRoute = router.match(window.location.hash);

    self.setState({
      loading: true,
      selectedLogin: get(newRoute, 'member', null)
    });

    data.loadRouteData(oldRoute, newRoute)
      .then(function (data) {

        var newState = assign({}, data, {
          loading: false,
          route: newRoute
        });

        self.setState(newState);
      })
      .catch(function(err) {
        var code = get(err, 'response.status');
        if (code === 403) {
          self.setState({
            rateLimitExceeded: true
          });
        }
        console.error("error", err.response);
      });
  },

  render: function () {

    if (this.state.rateLimitExceeded) {
      return React.createElement('div', { className: 'container mt-3' }, [
        Alert({ text: 'The Github API has a rate limit of 60 requests per hour per IP address. We have exceeded that limit.'})
      ]);
    }


    var loader = null;
    if (this.state.loading) {
      loader = React.createElement('div', { key: 'loader', className: 'loading-overlay' }, [
        React.createElement('div', { key: 'loadertest', className: 'loading-text' }, ['Loading...'])
      ]);
    }

    var selectedLogin = this.state.selectedLogin;

    var userListProps = {
      org: this.state.org,
      members: this.state.members.map(function (m) {
        return assign(m, {
          isSelected: selectedLogin === m.login
        })
      })
    };

    return React.createElement('div', { key: 'container', className: 'container' }, [
      loader,
      OrgSummary(this.state.org),
      React.createElement('div', { key: 'container-columns', className: 'columns' }, [
        React.createElement('div', { key: 'user-column', className: 'one-fifth column' }, [
          UserList(userListProps)
        ]),
        React.createElement('div', { key: 'detail-column', className: 'four-fifths column' }, [
          UserDetail(this.state.detail)
        ])
      ])
    ]);
  }
});

module.exports = App;