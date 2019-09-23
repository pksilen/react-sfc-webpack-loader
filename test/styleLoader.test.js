const styleLoader = require('../src/styleLoader');

describe('styleLoader', () => {
  it('should return style block content', () => {
    const styleContent = styleLoader('<style>h1 { font-size: 20px }</style>');

    expect(styleContent).toBe('h1 { font-size: 20px }');
  });
});
