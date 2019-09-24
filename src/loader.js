const loaderUtils = require('loader-utils');
const htmlParser = require('node-html-parser');

const styleLoaderPathName =
  process.env.NODE_ENV === 'test' ? './styleLoader.js' : require.resolve('./styleLoader');

module.exports = function(htmlSource) {
  const remainingRequest = loaderUtils.getRemainingRequest(this);
  const htmlRootElement = htmlParser.parse(htmlSource, { script: true });
  const scriptElements = htmlRootElement.querySelectorAll('script');

  if (scriptElements.length !== 1) {
    this.emitError(`There must exactly one <script>...</script> block in ${this.resource}`);
    return '';
  }

  const scriptSource = scriptElements[0].rawText;
  const styleElements = htmlRootElement.querySelectorAll('style');

  if (styleElements.length > 0) {
    if (styleElements.length > 1) {
      this.emitError(`There cannot be more than one <style>...</style> block in ${this.resource}`);
      return '';
    }

    let styleType = 'css';
    const { rawAttrs } = styleElements[0];
    const styleTypeAttributeMatches = rawAttrs.match(/\s*type\s*=\s*"\s*text\s*\/\s*(\w*)\s*"/);

    if (styleTypeAttributeMatches) {
      [, styleType] = styleTypeAttributeMatches;

      if (styleType === 'stylus') {
        styleType = 'styl';
      }
    }

    const scopedAttributeMatches = rawAttrs.match(/\s*scoped\s*/);
    if (scopedAttributeMatches) {
      styleType = `module.${styleType}`;
    }

    const styleFileName = `${this.resource}.${styleType}`;
    const styleInlineMatchResource = loaderUtils.stringifyRequest(
      this,
      `${styleFileName}!=!${styleLoaderPathName}!${remainingRequest}`
    );
    const styleRequest = `import styles from ${styleInlineMatchResource}`;

    return `${styleRequest};${scriptSource}`;
  }

  return scriptSource;
};
