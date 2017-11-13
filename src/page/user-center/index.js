'use strict';

require('./index.css');

var naviSide = require('page/common/navi-side/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
  init: function() {
    this.onLoad();
  },
  onLoad: function() {
    naviSide.init('user-center');
    this.loadUserInfo();
  },
  // 记载用户信息
  loadUserInfo: function() {
    var userHtml = "";
    // _user.getUserInfo(function(res) {
    //   userHtml = _util.renderHtml(templateIndex, res);
    //   $('.panel-body').html(userHtml);
    // }, function(errMsg) {
    //   _util.errorTips(errMsg);
    // });
    setTimeout(function() {
      userHtml = _util.renderHtml(templateIndex, {
        username: "Tom Guo",
        phone: '12387466890',
        email: 'guo@632.com',
        question: '你是谁？',
        answer: 'Nobody'
      });
      $('.panel-body').html(userHtml);
    }, 500);
  }
};

$(function() {
  page.init();
});
