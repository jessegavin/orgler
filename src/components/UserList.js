var UserLink = require('./UserLink');

module.exports = React.createFactory(function(props) {

  var menuItems = props.members.map(function(user) {
    return UserLink({ 
      org: props.org.login, 
      avatar_url: user.avatar_url, 
      login: user.login, 
      key: user.login,
      isSelected: user.isSelected
    });
  });

  var menuHeading = React.createElement('span', { className: 'menu-heading' }, [
    'Members',
    React.createElement('span', { className: 'counter' }, [
      props.members.length.toString()
    ])
  ]);

  var children = [menuHeading].concat(menuItems);

  return React.createElement('nav', { className: 'menu' }, children);
});