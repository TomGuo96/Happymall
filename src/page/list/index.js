'use strict';

require('./index.css');

require('page/common/navi/index.js');
require('page/common/header/index.js');

var _util = require('util/util.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    listParam: {
      keyword: _util.getUrlParam('keyword') || '',
      categoryId: _util.getUrlParam('categoryId') || '',
      orderBy: _util.getUrlParam('categoorderByryId') || 'default',
      pageNum: _util.getUrlParam('pageNum') || 1,
      pageSize: _util.getUrlParam('pageSize') || 20
    }
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadList();
  },
  bindEvent: function() {
    var _this = this;
    // 排序的点击
    $('.sort-item').click(function() {
      var $this = $(this);
      _this.data.listParam.pageNum = 1;
      if ($this.data('type') === 'default') {
        if ($this.hasClass('active'))
          return;
        else {
          $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
          _this.data.listParam.orderBy = 'default';
        }
      } else if ($this.data('type') === 'price') {
        $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');;
        if ($this.hasClass('asc')) {
          $this.addClass('desc').removeClass('asc');
          _this.data.listParam.orderBy = 'price_desc';
        } else {
          $this.addClass('asc').removeClass('desc');
          _this.data.listParam.orderBy = 'price_asc';
        }
      }
      // 重新加载列表
      _this.loadList();
    });
  },
  // 加载list数据
  loadList: function() {
    var _this = this;
    var listHtml = '';
    var listParam = this.data.listParam;
    var $pListCon = $('.p-list-con');
    $pListCon.html('<div class="loading"></div>');
    // 删除不必要的字段
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
    _product.getProductList(listParam, function(res) {
      listHtml = _util.renderHtml(templateIndex, {
        list: res.list
      });
      $('.p-list-con').html(listHtml);
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      });
    }, function(errMsg) {
      _util.errorTips(errMsg);
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
        _this.loadList();
      }
    }));
  }
};

$(function() {
  page.init();
});