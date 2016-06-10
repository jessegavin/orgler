
function match(hash) {

  console.log('getting route for '+ hash);
  var normalizedHash = window.location.hash.replace(/^#\/?|\/$/g, '');
  var parts = normalizedHash.split('/');

  // Member
  if (parts.length >= 2) {
    return {
      name: 'member',
      org: parts[0],
      member: parts[1]
    }
  }

  // Org
  if (parts.length === 1) {
    return {
      name: 'org',
      org: parts[0]
    }
  }

  return {
    name: 'default'
  };
}

module.exports = {
  match : match
};