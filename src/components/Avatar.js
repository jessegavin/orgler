module.exports = React.createFactory(function(props) {
  
  var classNames = ['avatar'];
  if (props.size < 24) {
    classNames.push('avatar-small');
  }

  return React.createElement('img', { 
    className: classNames.join(' '), 
    src: props.avatarUrl,
    width: props.size,
    height: props.size
   });
});