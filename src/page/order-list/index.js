'use strict';

require('./index.css');

require('page/common/navi/index.js');

var naviSide = require('page/common/navi-side/index.js');
var _util = require('util/util.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
  
  data: {
    listParam: {
      pageNum: 1,
      pageSize: 10
    }
  },
  
  init: function() {
    this.onLoad();
  },
  
  onLoad: function() {
    
    naviSide.init('order-list');
    this.loadOrderList();

  },
  
  loadOrderList: function() {
    
    var _this = this;
    
    var orderListHtml = '';
    var $listCon = $('.order-list-con');
    
    _order.getOrderList(_this.data.listParam, function(res) {
      
      orderListHtml = _util.renderHtml(templateIndex, res);
      $listCon.html(orderListHtml);
      
      // 加载分页信息
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      });
      
    }, function(errMsg) {
      $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试！</p>')
    });
    
  },
  
  // 加载分页信息
  loadPagination: function(pageInfo) {
    var _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function(pageNum) {
        _this.data.listParam.pageNum = pageNum;
        _this.loadOrderList();
      }
    }));
  }
  
};

$(function() {
  page.init();
});
