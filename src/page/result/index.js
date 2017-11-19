'use strict';

require('./index.css');

var _util = require('util/util.js');

$(function() {
  var type = _util.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success');
    
    if (type === 'payment') {
      var orderNumber = _util.getUrlParam('orderNumber');
      var $orderNo = $element.find('.order-number');
      $orderNo.attr('href', $orderNo.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
});