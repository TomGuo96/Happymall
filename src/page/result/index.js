'use strict';

require('./index.css');

var _util = require('util/util.js');

$(function() {
  var type = _util.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
});