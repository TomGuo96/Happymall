'use strict';

require('./index.css');

require('page/common/navi/index.js');

var naviSide = require('page/common/navi-side/index.js');
var _util = require('util/util.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
  
  data: {
    orderNumber: _util.getUrlParam('orderNumber')
  },
  
  init: function() {
    
    this.onLoad();
    this.bindEvent();
  },
  
  onLoad: function() {
    
    naviSide.init('order-list');
    this.loadDetail();

  },
  
  bindEvent: function() {
    
    var _this = this;
    
    $(document).on('click', '.order-cancel', function() {
      
      if (window.confirm('确实要取消该订单吗？')) {
        
        _order.cancelOrder(_this.data.orderNumber, function(res) {
          _util.successTips('该订单取消成功');
          _this.loadDetail();
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
        
      }
      
    });
    
  },
  
  loadDetail: function() {
    
    var _this = this;
    
    var orderDetailHtml = '';
    var $content = $('.content');
    
    _order.getOrderDetail(_this.data.orderNumber, function(res) {
      
      _this.dataFilter(res);
      
      orderDetailHtml = _util.renderHtml(templateIndex, res);
      $content.html(orderDetailHtml);
      
    }, function(errMsg) {
      $content.html('<p class="err-tip">' + errMsg + '</p>');
    });
    
  },
  
  // 数据的适配
  dataFilter: function(data) {
    data.needPay      = (data.status == 10);
    data.isCancelable  = (data.status == 10);
  }
  
};

$(function() {
  page.init();
});
