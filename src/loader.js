const loaderUtils = require('loader-utils');
const htmlParser = require('node-html-parser');

const styleLoader = process.env.NODE_ENV === 'test' ? './styleLoader.js' : require.resolve('./styleLoader');

module.exports = function(source) {
  const remainingRequest = loaderUtils.getRemainingRequest(this);
  const rootElement = htmlParser.parse(source, { script: true });
  const scriptElements = rootElement.querySelectorAll('script');

  if (scriptElements.length !== 1) {
    this.emitError(`There must exactly one <script>...</script> block in ${this.resource}`);
    return '';
  }

  const scriptSource = scriptElements[0].rawText;
  const styleElements = rootElement.querySelectorAll('style');

  if (styleElements.length > 0) {
    if (styleElements.length > 1) {
      this.emitError(`There cannot be more than one <style>...</style> block in ${this.resource}`);
      return '';
    }

    let styleSuffix = 'css';
    const { rawAttrs } = styleElements[0];
    const styleTypeMatches = rawAttrs.match(/\s*type\s*=\s*"\s*text\s*\/\s*(\w*)\s*"/);

    if (styleTypeMatches) {
      [, styleSuffix] = styleTypeMatches;

      if (styleSuffix === 'stylus') {
        styleSuffix = 'styl';
      }
    }

    const scopedMatches = rawAttrs.match(/\s*scoped\s*/);
    if (scopedMatches) {
      styleSuffix = `module.${styleSuffix}`;
    }

    return `import styles from ${loaderUtils.stringifyRequest(
      this,
      `${this.resource}.${styleSuffix}!=!${styleLoader}!${remainingRequest}`
    )};${scriptSource}`;
  }

  return scriptSource;
};
