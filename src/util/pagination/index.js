'use strict';

require('./index.css');

var _util = require('util/util.js');
var templatePagination = require('./index.string');

var Pagination =  function() {
  var _this = this;
  this.defaultOption = {
    container: null,
    pageNum: 1,
    pageRange: 3,
    onSelectPage: null,
    pages: 1
  };
  // 事件代理
  $(document).on('click', '.pg-item', function() {
    var $this = $(this);
    // 不作处理
    if ($this.hasClass('active') || $this.hasClass('disabled')) {
      return;
    }
    typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
  });
};

// 渲染封闭组件
Pagination.prototype.render = function(userOption) {
  // 合并选项
  this.option = $.extend({}, this.defaultOption, userOption);
  // 判断容器是否为jQuery对象
  if (!(this.option.container instanceof jQuery)) {
    return;
  }
  // 判断是否只有一页
  if (this.option.pages <= 1) {
    return;
  }
  this.option.container.html(this.getPaginationHtml());
};

// 获取分页的html
Pagination.prototype.getPaginationHtml = function() {
  var option = this.option;
  var html = '';
  var pageArray = [];
  var start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
  var end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
  pageArray.push({
    name: '上一页',
    value: this.option.prePage,
    disabled: !this.option.hasPreviousPage
  });
  // 数字按钮的处理
  for (var i = start; i <= end; i++) {
    pageArray.push({
      name: i,
      value: i,
      active: (i === option.pageNum)
    });
  }
  pageArray.push({
    name: '下一页',
    value: this.option.nextPage,
    disabled: !this.option.hasNextPage
  });
  html = _util.renderHtml(templatePagination, {
    pageArray: pageArray,
    pageNum: option.pageNum,
    pages: option.pages
  });
  return html;
};

module.exports = Pagination;