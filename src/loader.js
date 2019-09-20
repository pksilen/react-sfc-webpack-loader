const loaderUtils = require('loader-utils');
const htmlParser = require('node-html-parser');

const getStylesLoader = require.resolve('./getStyle');
const getJavaScriptLoader = require.resolve('./getJavaScript');

module.exports = function(source) {
  const remainingRequest = loaderUtils.getRemainingRequest(this);

  const rootElement = htmlParser.parse(source);
  const styleElement = rootElement.querySelectorAll('style');
  let stylesImport = '';

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

    stylesImport = `import ${loaderUtils.stringifyRequest(
      this,
      `${this.resource}.${styleSuffix}!=!${getStylesLoader}!${remainingRequest}`
    )};`;
  }

  const javascriptImport = `import ${loaderUtils.stringifyRequest(
    this,
    `${this.resource}.js!=!${getJavaScriptLoader}!${remainingRequest}`
  )};`;

  return `${stylesImport}${javascriptImport}`;
};
