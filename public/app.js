fetch("/api/users")
  .then(function(data) {
    return data.json()
  })
  .then(function (response) {
    return {
      users: response.data
    }
  })
  .then(renderApp);
  
  
var userAvatar = React.createFactory(function(props) {
  console.log('props', props);
  return React.createElement('img', { className: 'userButton--avatar', src: props.avatarUrl });
});
  
  
var userButton = React.createFactory(function(props) {
  return React.createElement('button', { className: 'userButton' }, [
    userAvatar({ key: props.login, avatarUrl: props.avatarUrl}),
    props.login
  ]
  );
});

var userList = React.createFactory(function(props) {
  return React.createElement('aside', { className: "userList" },
    props.users.map(function(user) {
      return userButton({ avatarUrl: user.avatar_url, login: user.login, key: user.login});
    })
  )
});

function renderApp(data) {
  ReactDOM.render(
    userList(data),
    document.getElementById('root')
  );
}

