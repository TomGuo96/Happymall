'use strict';

require('./index.css');

require('page/common/navi/index.js');

var _util = require('util/util.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
  
  data: {
    orderNumber: _util.getUrlParam('orderNumber')
  },
  
  init: function() {
    
    this.onLoad();
    
  },
  
  onLoad: function() {
    
    this.loadPaymentInfo();

  },
  
  loadPaymentInfo: function() {
    
    var _this = this;
    
    var paymentlHtml = '';
    var $pageWrap = $('.page-wrap');
    
    $pageWrap.html('<p class="loading"></p>');
    
    _payment.getPaymentInfo(_this.data.orderNumber, function(res) {
      
      paymentlHtml = _util.renderHtml(templateIndex, res);
      $pageWrap.html(paymentlHtml);
      
      _this.listenOrderStatus();
      
    }, function(errMsg) {
      $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
    });
    
  },
  
  listenOrderStatus: function() {
    
    var _this = this;
    
    this.paymentTimer = window.setInterval(function() {
      
      _payment.getPaymenStatus(_this.data.orderNumber, function(res) {
        if (res)
          window.location.href = './result.html?type=payment&orderNo=' + this.data.orderNumber;
      }, function(errMsg) {
        
      });
      
    }, 5000);
    
  }
  
};

$(function() {
  page.init();
});
