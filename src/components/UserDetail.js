var Avatar = require('./Avatar');
var RepoList = require('./RepoList');
var format = require('../services/format');


module.exports = React.createFactory(function(props) {

  if (!props.user) {
    return React.createElement('div', { className: 'panel' }, [
      React.createElement('div', { className: 'blankslate blankslate-spacious' }, [
        React.createElement('h3', { }, [
          'Select a member' 
        ])
      ])
    ]);
  }


  var avatar = Avatar({ avatarUrl: props.user.avatar_url, size: 48 });
  var name = React.createElement('a', { href: props.user.html_url, className: 'link-gray-dark text-large' }, props.user.name || props.user.login);

  var location = props.user.location 
    ? React.createElement('div', {  className: 'text-gray d-inline-block pr-3' }, props.user.location)
    : null;

  var email = props.user.email 
    ? React.createElement('a', { href: 'mailto:'+ props.user.email, className: 'link-gray d-inline-block pr-3' }, props.user.email)
    : null;

  var dateJoined = 'Joined on '+ format.date(props.user.created_at);
  var joined = React.createElement('div', { className: 'text-gray d-inline-block pr-3' }, [ dateJoined ]);

  return React.createElement('div', { className: 'panel' }, [
      React.createElement('div', { className: 'flex-table border-bottom bg-gray' }, [
        React.createElement('div', { className: 'flex-table-item p-3' }, [ avatar ]),
        React.createElement('div', { className: 'flex-table-item flex-table-item-primary pt-3 pb-3' }, [ 
          name,
          React.createElement('div', {}, [ 
            location,
            email,
            joined
          ])
        ])
      ]),
      RepoList({ heading: 'Repositories', display: 'name', repos: props.repos })
  ]);
});