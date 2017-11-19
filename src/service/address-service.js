'use strict';
var _util = require('util/util.js');

var _address = {
  
  // 获取地址列表
  getAddressList: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/shipping/list.do'),
      data: {
        pageSize: 50
      },
      success: resolve,
      error: reject
    });
  },
  
  // 新建收件人
  save: function(addressInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/shipping/add.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    });
  },
  
  // 更新收件人信息
  update: function(addressInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/shipping/update.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    });
  },
  
  // 删除收件人信息
  deleteAddress: function(shippingId, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/shipping/del.do?shippingId=' + shippingId),
      success: resolve,
      error: reject
    });
  },
  
  // 获取单条订单的地址
  getAddress: function(shippingId, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/shipping/select.do?shippingId=' + shippingId),
      success: resolve,
      error: reject
    });
  }
};

module.exports = _address;