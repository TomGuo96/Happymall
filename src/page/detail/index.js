'use strict';

require('./index.css');

require('page/common/header/index.js');
require('page/common/navi/index.js');

var _util = require('util/util.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    productId: _util.getUrlParam('productId') || '',
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    // 如果没有productId，回到主页
    if (!this.data.productId) {
      _util.goHome();
    }
    this.loadDetail();
  },
  bindEvent: function() {
    var _this = this;
    // 图片预览
    $(document).on('mouseenter', '.p-img-item', function() {
      var imageUrl = $(this).find('.p-img').attr('src');
      $('.main-img').attr('src', imageUrl);
    });
    // count的操作
    $(document).on('click', '.p-count-btn', function() {
      var type = $(this).hasClass('plus') ? 'plus' : 'minus';
      var $pCount = $('.p-count');
      var curCount = parseInt($pCount.val());
      var min = 1;
      var max = _this.data.detailInfo.stock || 1;
      if (type === 'plus') {
        $pCount.val(curCount < max ? curCount + 1 : max);
      } else if (type === 'minus') {
        $pCount.val(curCount > min ? curCount - 1 : min);
      }
    });
    // 加入购物车
    $(document).on('click', '.cart-add', function() {
      _cart.addToCart({
        productId: _this.data.productId,
        count: $('.p-count').val()
      }, function(res) {
        window.location.href = './result.html?type=cart-add';
      }, function(errMsg) {
        _util.errorTips(errMsg);
      });
    });
  },
  // 加载商品详情的数据
  loadDetail: function() {
    var _this = this;
    var $pageWrap = $('.page-wrap');
    $pageWrap.html('<div class="loading></div>"');
    var html = '';
    _product.getProductDetail(this.data.productId, function(res) {
      _this.filter(res);
      // 缓存detai的数据
      _this.data.detailInfo = res;
      // render
      html = _util.renderHtml(templateIndex, res);
      $pageWrap.html(html);
    }, function(errMsg) {
      $pageWrap.html('<p class="err-tip">找不到这个商品</p>');
    });
  },
  // 数据匹配
  filter: function(data) {
    data.subImages = data.subImages.split(',');
  }
};

$(function() {
  page.init();
});