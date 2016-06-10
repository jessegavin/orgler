var Avatar = require('./Avatar');

module.exports = React.createFactory(function(props) {

  var href = ['#', props.org, props.login].join('/');

  var classNames = ['menu-item'].concat(props.isSelected ? ['selected'] : []).join(' ');

  return React.createElement('a', { key: 'boo', className: classNames, href: href }, [
    Avatar({ key: props.login, avatarUrl: props.avatar_url, size: 18 }),
    props.login
  ]
  );
});