'use strict';
require('./index.css');

var _util = require('util/util.js');

// 通用页面头部
var header = {
  init: function() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartContent();
  },
  bindEvent: function() {
    
  }
};

header.init();