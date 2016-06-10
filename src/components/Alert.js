module.exports = React.createFactory(function(props) {
  var icon = React.createElement('span', { className: 'octicon octicon-alert' });
  var children = [icon].concat(props.text || []);
  return React.createElement('div', { className: 'flash flash-error flash-with-icon'}, children);
});