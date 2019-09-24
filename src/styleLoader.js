const htmlParser = require('node-html-parser');

module.exports = function(htmlSource) {
  const htmlRootElement = htmlParser.parse(htmlSource, { style: true });
  const styleElement = htmlRootElement.querySelector('style');
  return styleElement.rawText;
};
