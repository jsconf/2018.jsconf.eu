module.exports = function(url) {
  return url.replace(/https?:\/{2}(www\.)?/g, '').replace(/\/$/g, '');
}
