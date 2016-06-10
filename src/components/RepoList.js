var format = require('../services/format');

module.exports = React.createFactory(function(props) {

  var repos = props.repos.map(function(repo) {
    return React.createElement('div', { className: 'border-top py-3' }, [
      React.createElement('div', { }, [
        React.createElement('a', { href: repo.html_url, className: 'text-medium' }, [ repo[props.display] ]),
        React.createElement('div', { className: 'text-gray' }, [
          'Last updated on '+ format.date(repo.updated_at)
        ])
      ])
    ]);
  });

  var heading = React.createElement('p', { className: 'text-medium' }, props.heading);

  var children = [heading].concat(repos);

  return React.createElement('div', { className: 'p-3' }, children);
});