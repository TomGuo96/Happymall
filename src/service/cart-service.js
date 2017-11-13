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
  },
  getCartList: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/list.do'),
      success: resolve,
      error: reject
    });
  },
  selectProduct: function(productId, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    });
  },
  unselectProduct: function(productId, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/un_select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    });
  },
  unselectAllProduct: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/un_select_all.do'),
      success: resolve,
      error: reject
    });
  },
  selectAllProduct: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/select_all.do'),
      success: resolve,
      error: reject
    });
  },
  updateProduct: function(productInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/cart/update.do'),
      data: productInfo,
      success: resolve,
      error: reject
    });
  },
  // 删除指定商品
  deleteProduct: function(productIds, resolve, reject) {
    _util.request({
      method: 'GET',
      url: _util.getServerUrl('/cart/delete_product.do?productIds=' + productIds),
      success: resolve,
      error: reject
    });
  }
}

module.exports = _cart;