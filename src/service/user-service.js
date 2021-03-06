'use strict';
var _util = require('util/util.js');

var _user = {
  // 登录
  login: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 注册
  register: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/register.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 检查登录状态
  checkLogin: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 登出
  logout: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  checkUsername: function(username, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/check_valid.do'),
      data: {
        type: "username",
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 获取密码提示问题
  getQuestion: function(username, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/forget_get_question.do'),
      data: username,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  checkAnswer: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 重置密码
  resetPassword: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  getUserInfo: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/get_information.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 更新用户信息
  updateUserInfo: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/update_information.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 更改密码
  updatePassword: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/user/reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _user;