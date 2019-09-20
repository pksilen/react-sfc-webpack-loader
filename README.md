# React Single File Components (SFC) Webpack Loader
Webpack loader for React Single File Components (SFC) inspired by [Vue SFCs]

[![version][version-badge]][package]
[![MIT License][license-badge]][license]

![React Single File Component Sample](https://raw.githubusercontent.com/pksilen/react-sfc-webpack-loader/master/assets/react-sfc-sample.png)

## Prerequisites
    "webpack": "^4.0.0",

## Installation
    npm install --save-dev react-sfc-webpack-loader
       
## React Single File Component

React Single File Component (SFC) is implemented in a .html file where JavaScript is put inside a single <script>...</script> section
and optional CSS is put inside a single (optional) <style>...</style> section

### Style types
Define style type as follows:
    
  CSS
  
    <style type="text/css">
        ...
        ..
    </style>
  
  SCSS
    
    <style type="text/scss">
        ...
        ..
    </style>
  
  SASS
    
    <style type="text/sass">
        ...
        ..
    </style>
  
  LESS
    
    <style type="text/less">
      ...
      ..
    </style>
  
  Stylus
    
    <style type="text/styl">
      ...
      ..
    </style>
   
## Webpack configuration

Have your normal rules for style loading depending on style type (CSS/SCSS/SASS/LESS/Stylus)

Add this following rule:

    module: {
        rules: [
          {
            test: /\.html$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'react-sfc-webpack-loader']
          },
          .
          .
          .
            
## Supported tools
* Prettier
* ESLint (below steps must be done in addition to normal ESLint installation and configuration)
   * Install eslint-plugin-html
   
            npm install --save-dev eslint-plugin-html
            
   * Add to your ESLint configuration

            {
                "plugins": [
                    "html"
                ],
                rules: [
                    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".html"] }]
                ]
            }
            
* Flow (Needs ESLint and below steps must be done in addition to normal Flow installation and configuration)
    * Install eslint-plugin-flowtype-errors
    
            npm install --save-dev eslint-plugin-flowtype-errors
            
    * Configure ESLint
    
            {
                "plugins": [            
                    "flowtype-errors"
                ],
                rules: [
                   "flowtype-errors/show-errors": 2
                ]
            }                             
        
    * Enable flow usage in .html file
    
            // @flow
            <script>
            // @flow
            .
            .
            .
            </script>
    
## Tested IDEs/Editors
* WebStorm

## Under construction
* Scoped CSS / CSS Modules support

## Not supported
* TypeScript
  
## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/react-sfc-webpack-loader/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/react-sfc-webpack-loader.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-sfc-loader
[Vue SFCs]: https://vuejs.org/v2/guide/single-file-components.html
