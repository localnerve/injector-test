// substitute this condition to always skip
function falseCondition(req, res) {
  return false;
}

// the objective condition
function condition(req, res) {
  var contentType = res.getHeader('Content-type');
  return contentType && contentType.indexOf('text/html') !== -1;
}

// a sample injection
function responder(callback, data, req, res) {
  callback(null, data.toString().replace('</body>', '<div><span>__injected__</span></div></body>'));
}

module.exports = {
  falseCondition: falseCondition,
  condition : condition,
  responder : responder
};