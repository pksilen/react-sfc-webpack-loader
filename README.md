# React Single File Components (SFC) Webpack Loader
Webpack loader for React Single File Components (SFC) inspired by [Vue SFCs]

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![MIT License][license-badge]][license]

![React Single File Component Sample](https://raw.githubusercontent.com/pksilen/react-sfc-webpack-loader/master/assets/react-sfc-sample.png)

## Prerequisites
    "webpack": "^4.0.0",

## Installation
    npm install --save-dev react-sfc-webpack-loader
       
## React Single File Component

React Single File Component (SFC) is implemented in a .html file where JavaScript is put inside a single <script>...</script> section
and optional CSS is put inside a single (optional) <style>...</style> section

## Example

See example in [example directory]

### Style types
Define style type as follows:
    
  CSS
  
     <style>
        ...
        ..
    </style>
  
  or
  
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
    
    <style type="text/stylus">
      ...
      ..
    </style>
   
## CSS Modules

CSS Modules support is enabled with scoped attribute:
    
    <style scoped type="text/scss">
        ...
        ..
    </style>

Your CSS rule for CSS modules in Webpack config must test file extension .module.&lt;style-type&gt;, e.g. .module.css or .module.scss, for example:

    {
        test: /\.module.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
    }

Your CSS is available in .html files through object named "styles", for example:

    <div className={styles.demo}>
   
If you use ESLint and get error of undefined 'styles', add following line to .html file:

      /*global styles*/
   
## Webpack configuration

### Create React App
If you have created your React app with Create React App, you need to eject it by running:
    
    npm eject
    
   or
   
    yarn eject

Add following rule to rules array in config/webpack.config.js file:

    module: {
        rules: [
          {
            test: /\.html$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'react-sfc-webpack-loader']
          }
          
### Manual configuration
Have your normal Webpack configuration

Have your normal rules for style loading depending on style type (CSS/SCSS/SASS/LESS/Stylus)

Only change needed is to add this following rule to Webpack configuration:

    module: {
        rules: [
          {
            test: /\.html$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'react-sfc-webpack-loader']
          }
            
## Supported tools
* [Prettier]
* [StyleLint]
    Use for example following npm script in your package.json:
    
        "stylelint": "stylelint src/**/*.html",
    
* [ESLint] (below steps must be done in addition to normal ESLint installation and configuration)
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
            
* [Flow] (Needs ESLint and below steps must be done in addition to normal Flow installation and configuration)
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

## Not supported
* TypeScript
  
## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/react-sfc-webpack-loader/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/react-sfc-webpack-loader.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-sfc-webpack-loader
[build]: https://img.shields.io/circleci/project/github/pksilen/react-sfc-webpack-loader/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/react-sfc-webpack-loader/tree/master
[coverage]: https://img.shields.io/codecov/c/github/pksilen/react-sfc-webpack-loader/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/react-sfc-webpack-loader
[Vue SFCs]: https://vuejs.org/v2/guide/single-file-components.html
[Prettier]: https://prettier.io/
[ESLint]: https://eslint.org/
[Flow]: https://flow.org/
[example directory]: https://github.com/pksilen/react-sfc-webpack-loader/blob/master/example
[StyleLint]: https://stylelint.io/
