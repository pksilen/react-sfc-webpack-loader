const loaderUtils = require('loader-utils');
const htmlParser = require('node-html-parser');

const styleLoader = require.resolve('./styleLoader');

module.exports = function(source) {
  const remainingRequest = loaderUtils.getRemainingRequest(this);
  const rootElement = htmlParser.parse(source, { script: true });
  const scriptElement = rootElement.querySelectorAll('script');

  if (scriptElement.length !== 1) {
    this.emitError(`There must exactly one <script>...</script> block in ${this.resource}`);
    return '';
  }

  const scriptSource = scriptElement[0].rawText;
  const styleElement = rootElement.querySelectorAll('style');

  if (styleElement.length > 0) {
    if (styleElement.length > 1) {
      this.emitError(`There cannot be more than one <style>...</style> block in ${this.resource}`);
      return '';
    }

    let styleSuffix = 'css';
    const { rawAttrs } = styleElement[0];
    const matches = rawAttrs.match(/^\s*type\s*=\s*"\s*text\s*\/\s*(\w*)\s*"$/);

    if (matches) {
      [, styleSuffix] = matches;
    }

    return `import ${loaderUtils.stringifyRequest(
      this,
      `${this.resource}.${styleSuffix}!=!${styleLoader}!${remainingRequest}`
    )};${scriptSource}`;
  }

  return scriptSource;
};
