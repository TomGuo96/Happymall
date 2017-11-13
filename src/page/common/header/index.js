'use strict';
require('./index.css');

var _util = require('util/util.js');

// 通用页面头部
var header = {
  init: function() {
    this.bindEvent();
    this.onLoad();
  },
  onLoad: function() {
    var keyword = _util.getUrlParam('keyword');
    // 若keyword存在，回调输入框
    if (keyword) {
      $('#search-input').val(keyword);
    }
  },
  bindEvent: function() {
    var _this = this;
    // 点击搜索按钮后提交
    $('#search-btn').click(function() {
      _this.searchSubmit();
    });
    // 输入提交后，也会提交
    $('#search-input').keyup(function(e) {
      // 13是回车键
      if (e.keyCode === 13) {
          _this.searchSubmit();
      }
    });
  },
  // 搜索的提交
  searchSubmit: function() {
    var keyword = $.trim($('#search-input').val());
    // 如果有搜索单词，正常跳转，否则跳回主页
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      _util.goHome();
    }
  }
};

header.init();