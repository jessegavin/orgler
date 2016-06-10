module.exports = {
  /*
    This is a super-simplistic date formatting function.
    In a real app, I would use moment.js.
  */
  date: function(dateString) {
    return (new Date(dateString))
      .toDateString()
      .split(' ')
      .slice(1)
      .join(' ');
  }
}