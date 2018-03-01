const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWepbackPlugin = require('clean-webpack-plugin');

// 所有页面与其标题
let htmlConfigs = [
  ['index', '首页'],
  ['list', '商品列表页'],
  ['detail', '商品详情页'],
  ['cart', '购物车'],
  ['order-confirm', '确认订单'],
  ['order-list', '订单列表'],
  ['order-detail', '订单详情'],
  ['payment', '订单支付'],
  ['user-login', '用户登录'],
  ['user-register', '用户注册'],
  ['user-center', '用户中心'],
  ['user-center-update', '更改用户信息'],
  ['user-pass-update', '更改用户密码'],
  ['user-pass-reset', '找回密码'],
  ['result', '操作结果'],
  ['about', '关于']
];

module.exports = {
  entry: generateEntry(htmlConfigs),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/', // dev
    // publicPath: 'static.happymmall.com/', // build
    filename: 'js/[name].js'
  },
  devServer: {
    port: 8080,
    open: true,
    stats: "minimal",
    openPage: 'dist/view/index.html',
    proxy: [{
      context: ['/user', '/order', '/product', '/cart'],
      target: 'http://www.happymmall.com',
      changeOrigin: true
    }]
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100,
          name: 'resource/[name].[ext]'
        }
      }
    }, {
      test: /\.string$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: true,
          removeAttributeQuotes: false
        }
      }
    }]
  },
  resolve: {
    alias: {
      util: resolve(__dirname, 'src/util'),
      page: resolve(__dirname, 'src/page'),
      service: resolve(__dirname, 'src/service'),
      image: resolve(__dirname, 'src/image'),
      node_modules: resolve(__dirname, 'node_modules')
    }
  },
  plugins: [
    // 将通用模提取为js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    new ExtractTextPlugin("css/[name].css"), // 把css单独打包为文件
    new CleanWepbackPlugin(['dist']),
  ].concat(generateHtmlConfigArray(htmlConfigs))
};

// 生成entry对象
function generateEntry(configs) {
  let entry = {}
  for (let config of configs) {
    let chunkname = config[0]
    entry[chunkname] = ['./src/page/' + chunkname + '/index.js']
  }
  entry['common'] = ['./src/page/common/index.js']
  return entry
}

// 生成html-webpack-plugin的参数
function generateHtmlConfig(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    favicon: './favicon.ico',
    title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  };
}

function generateHtmlConfigArray(configs) {
  let result = [];
  for (let config of configs) {
    result.push(new HtmlWebpackPlugin(generateHtmlConfig(config[0], config[1])))
  }
  return result
}

function resolve(directory, filepath) {
  return path.resolve(directory, filepath)
}
