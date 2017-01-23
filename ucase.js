module.exports = function(context, callback) {
  var content = JSON.stringify(context.request.query.q || 'no content');
  callback(200, content.toUpperCase());
};
