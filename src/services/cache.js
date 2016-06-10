var useSession = sessionStorage 
  && typeof sessionStorage.getItem === 'function'
  && typeof sessionStorage.setItem === 'function';

var cache = {};

function get(key) {
  if (useSession) {
    var jsonString = sessionStorage.getItem(key);
    if (jsonString === null) {
      return null;
    }
    return JSON.parse(jsonString);
  }
  return cache[key];
}

function set(key, value) {
  if (useSession) {
    var jsonString = JSON.stringify(value);
    sessionStorage.setItem(key, jsonString);
    return;
  }
  cache[key] = value;
}

module.exports = {
  get: get,
  set: set
};