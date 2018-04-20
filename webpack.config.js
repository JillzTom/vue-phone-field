const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  externals: {
    moment: 'cleave.js',
    vselect: 'vue-select'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ]
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-phone-field.min.js',
      libraryTarget: 'window',
      library: 'VuePhoneField',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/component/phone-field.vue'),
    output: {
      filename: 'vue-phone-field.js',
      libraryTarget: 'umd',
      library: 'vue-phone-field',
      umdNamedDefine: true
    }
  })
];