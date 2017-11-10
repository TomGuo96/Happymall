'use strict';
var _util = require('util/util.js');

var _user = {
  // 登出
  logout: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('./user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 检查登录状态
  checkLogin: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('./user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _user;