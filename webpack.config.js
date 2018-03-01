const path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    favicon: './favicon.ico',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  };
};

// webpack config
var config = {
   entry: {
     'common': ['./src/page/common/index.js'],
     'index': ['./src/page/index/index.js'],
     'list': ['./src/page/list/index.js'],
     'detail': ['./src/page/detail/index.js'],
     'cart': ['./src/page/cart/index.js'],
     'order-confirm': ['./src/page/order-confirm/index.js'],
     'order-list': ['./src/page/order-list/index.js'],
     'order-detail': ['./src/page/order-detail/index.js'],
     'payment': ['./src/page/payment/index.js'],
     'user-login': ['./src/page/user-login/index.js'],
     'user-register': ['./src/page/user-register/index.js'],
     'user-center': ['./src/page/user-center/index.js'],
     'user-center-update': ['./src/page/user-center-update/index.js'],
     'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
     'user-pass-update': ['./src/page/user-pass-update/index.js'],
     'about': ['./src/page/about/index.js'],
     'result': ['./src/page/result/index.js']
   },
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
     loaders: [
       {
         test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'
     },
     {
        test: /\.string$/, loader: 'html-loader',
        query: {
          minimize: true,
          removeAttributeQuotes: false
        }
     }
     ]
   },
   resolve: {
     alias: {
       util: __dirname + '/src/util',
       page: __dirname + '/src/page',
       service: __dirname + '/src/service',
       image: __dirname + '/src/image',
       node_modules: __dirname + '/node_modules'
     }
   },
   plugins: [
     // 独立通用模块到js/base.js
     new webpack.optimize.CommonsChunkPlugin({
       name: 'common',
       filename: 'js/base.js'
     }),
     // 把css单独打包到文件
     new ExtractTextPlugin("css/[name].css"),
     // html模版的处理
     new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
     new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
     new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
     new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
     new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '确认订单')),
     new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
     new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
     new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
     new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
     new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
     new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
     new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '更改用户信息')),
     new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '更改用户密码')),
     new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
     new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
     new HtmlWebpackPlugin(getHtmlConfig('about', '关于'))
   ]
};
// postcss-loader
module.exports = config;