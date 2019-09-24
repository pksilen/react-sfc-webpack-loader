const loader = require('../src/loader');

const loaderContext = {
  loaders: [],
  resource: 'test.html',
  emitError: jest.fn()
};

describe('loader', () => {
  it('should return script source when no style block in source', () => {
    const scriptSource = loader.call(loaderContext, '\n<script>const a = 1;</script>\n');

    expect(scriptSource).toBe('const a = 1;');
  });

  it('should emit error if script block missing in source', () => {
    const scriptSource = loader.call(loaderContext, '<style>a</style>');

    expect(loaderContext.emitError).toHaveBeenCalled();
    expect(scriptSource).toBe('');
  });

  it('should emit error if more than one script block in source', () => {
    const scriptSource = loader.call(
      loaderContext,
      '<script>const a = 1;</script><script>const a = 1;</script>'
    );

    expect(loaderContext.emitError).toHaveBeenCalledWith(
      'There must be exactly one <script>...</script> block in test.html'
    );
    expect(scriptSource).toBe('');
  });

  it('should return style import and script source when no style block is present in source', () => {
    const requireResolveSpy = jest.spyOn(require, 'resolve');
    requireResolveSpy.mockReturnValue('styleLoader.js');
    const scriptSource = loader.call(loaderContext, '\n<script>const a = 1;</script>\n<style>a</style>');

    console.log(scriptSource);
    expect(scriptSource).toBe('import styles from "test.html.css!=!./styleLoader.js!test.html";const a = 1;');
  });

  it('should emit error if more than one style block in source', () => {
    const scriptSource = loader.call(
      loaderContext,
      '<script>const a = 1;</script><style>a</style><style>b</style>'
    );

    expect(loaderContext.emitError).toHaveBeenCalledWith(
      'There cannot be more than one <style>...</style> block in test.html'
    );
    expect(scriptSource).toBe('');
  });

  it('should return style import with specified style file name suffix', () => {
    const scriptSource = loader.call(
      loaderContext,
      '\n<script>const a = 1;</script>\n<style type="text/scss">a</style>'
    );

    expect(scriptSource).toBe('import styles from "test.html.scss!=!./styleLoader.js!test.html";const a = 1;');
  });

  it('should return CSS Module style import if scoped attribute is specified for style tag ', () => {
    const scriptSource = loader.call(
      loaderContext,
      '\n<script>const a = 1;</script>\n<style scoped type="text/scss">a</style>'
    );

    expect(scriptSource).toBe('import styles from "test.html.module.scss!=!./styleLoader.js!test.html";const a = 1;');
  });

  it('should return Stylus type style import with .styl file name suffix', () => {
    const scriptSource = loader.call(
      loaderContext,
      '\n<script>const a = 1;</script>\n<style type="text/stylus">a</style>'
    );

    expect(scriptSource).toBe('import styles from "test.html.styl!=!./styleLoader.js!test.html";const a = 1;');
  });
});
