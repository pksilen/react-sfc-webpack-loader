const htmlParser = require('node-html-parser');

module.exports = function(source) {
  const rootElement = htmlParser.parse(source, { style: true });
  const styleElement = rootElement.querySelector('style');
  return styleElement.rawText;
};
