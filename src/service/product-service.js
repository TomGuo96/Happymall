'use strict';
var _util = require('util/util.js');

var _product = {
  // 获取商品列表
  getProductList: function(listParam, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/product/list.do'),
      data: listParam,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  getProductDetail: function(productId, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/product/detail.do'),
      data: {
        productId: productId
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _product;