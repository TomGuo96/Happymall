'use strict';
var _util = require('util/util.js');

var _cart = {
  // 获取购物车数量
  getCartCount: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    });
  },
  addToCart: function(productInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/add.do'),
      data: productInfo,
      success: resolve,
      error: reject
    });
  }
}
module.exports = _cart;