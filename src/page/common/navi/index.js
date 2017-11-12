'use strict';
require('./index.css');

var _util = require('util/util.js');
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')

// 导航
var nav = {
  init: function() {
    // console.log($('js-login'));
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartContent();
    return this;
  },
  bindEvent: function() {
    // 登录点击事件
    $('.js-login').click(function() {
      _util.doLogin();
    });
    // 注册点击事件
    $('.js-login').click(function() {
      window.location.href = './user-regeister.html';
    });
    // 退出点击事件
    $('.js-logout').click(function() {
      _user.logout(function(res) {
        window.lcoation.reload();
      }, function (errMsg) {
        _util.errorTips(errMsg);
      });
    });
  },
  // 加载用户信息
  loadUserInfo: function() {
    _user.checkLogin(function(res) {
      $('.user.not-login').hide().siblings('.user.login').show().find(".username").text('res.username');
    }, function (errMsg) {
      // do nothing
    });
  },
  // 加载购物处数量
  loadCartContent: function() {
    _cart.getCartCount(function(res) {
      $('.navi .cart-count').text(res || 0);
    }, function (errMsg) {
      $('.navi .cart-count').text(0);
    });
  }
};

module.exports = nav.init();