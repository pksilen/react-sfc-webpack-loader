const htmlParser = require('node-html-parser');

module.exports = function(source) {
  const rootElement = htmlParser.parse(source, { script: true });
  const scriptElement = rootElement.querySelectorAll('script');

  if (scriptElement.length !== 1) {
    this.emitError(`There must exactly one <script>...</script> block in ${this.resource}`);
    return '';
  }

  return scriptElement[0].rawText;
};
