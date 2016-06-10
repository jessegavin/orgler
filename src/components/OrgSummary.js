var Avatar = require('./Avatar');

module.exports = React.createFactory(function (props) {

  if (!props.login) {
    return null;
  }

  var name = React.createElement('a', { href: props.html_url, className: 'd-block link-gray-dark text-large' }, props.name || props.login);
  var location = React.createElement('div', { className: 'd-inline-block mr-3'}, props.location);
  var blog = props.blog
    ? React.createElement('a', { href: props.blog, className: 'd-inline-block link-gray' }, props.blog)
    : null;

  return React.createElement('div', { className: 'panel' }, [
    React.createElement('div', { className: 'flex-table' }, [
      React.createElement('div', { className: 'flex-table-item p-3' }, [ 
        Avatar({ avatarUrl: props.avatar_url, size: 48 })
      ]),
      React.createElement('div', { className: 'flex-table-item p-3 flex-table-item-primary' }, [ 
        name,
        location,
        blog
      ])
    ])
  ]);
});