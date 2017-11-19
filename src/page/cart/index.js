'use strict';

require('./index.css');

require('page/common/header/index.js');

var navi = require('page/common/navi/index.js');
var _util = require('util/util.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadCart();
  },
  bindEvent: function() {
    var _this = this;
    // 商品的选择或者取消
    $(document).on('click', '.cart-select', function() {
      var $this = $(this);
      var productId = $this.parents('.cart-table').data('product-id');
      // 切换选中状态
      if ($this.is(':checked')) {
        _cart.selectProduct(productId, function(res) {
          _this.renderCart(res);
        }, function(errMsg) {
          _this.showCartError();
        });
      } else {
        _cart.unselectProduct(productId, function(res) {
          _this.renderCart(res);
        }, function(errMsg) {
          _this.showCartError();
        });
      }
    });
    // 商品的全选与否
    $(document).on('click', '.cart-select-all', function() {
      var $this = $(this);
      // 切换选中状态
      if ($this.is(':checked')) {
        _cart.selectAllProduct(function(res) {
          _this.renderCart(res);
        }, function(errMsg) {
          _this.showCartError();
        });
      } else {
        _cart.unselectAllProduct(function(res) {
          _this.renderCart(res);
        }, function(errMsg) {
          _this.showCartError();
        });
      }
    });
    // 商品数量的变化
    $(document).on('click', '.count-btn', function() {
      var $this = $(this);
      var $pCount = $this.siblings('.count-input');
      var type = $this.hasClass('plus') ? 'plus' : 'minus';
      var productId = $this.parents('.cart-table').data('product-id');
      var min = 1;
      var max = parseInt($pCount.data('max'));
      var newCount = 0;
      var curCount = parseInt($pCount.val());
      if (type === 'plus') {
        if (curCount >= max) {
          _util.errorTips('该商品数量已经高于上限');
          return;
        }
        newCount = curCount + 1;
      } else if (type === 'minus') {
        if (curCount <= min) {
          return;
        }
        newCount = curCount - 1;
      }
      _cart.updateProduct({
        productId: productId,
        count: newCount
      }, function(res) {
          _this.renderCart(res);
      }, function(errMsg) {
        _this.showCartError();
      });
    });
    // 删除单个商品
    $(document).on('click', '.cart-delete', function() {
      if (window.confirm('确认要删除该商品？')) {
        var productId = $(this).parents('.cart-table').data('product-id');
        _this.deleteCartProduct(productId);
      }
    });
    // 删除选中商品
    $(document).on('click', '.delete-selected', function() {
      if (window.confirm('确认要删除选中的商品？')) {
        var arrProductIds = [];
        var $selectedItem = $('.cart-select:checked');
        for (var i = 0, len = $selectedItem.length; i < len; i++) {
          arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
        }
        if (arrProductIds.length) {
          _this.deleteCartProduct(arrProductIds.join(','));
        } else {
          _util.errorTips('您还没有选择要删除的商品');
        }
      }
    });
    // 提交购物车
    $(document).on('click', '.btn-submit', function() {
      // 判断总价是否为零
      if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
        window.location.href = './order-confirm.html';
      } else {
        _util.errorTips('请选择商品后提交');
      }
    });
  },
  // 加载购物车信息
  loadCart: function() {
    var _this = this;
    _cart.getCartList(function(res) {
      _this.renderCart(res);
    }, function(errMsg) {
      _this.showCartError();
    });
  },
  renderCart: function(data) {
    this.filter(data);
    // 缓冲数据
    this.data.cartInfo = data;
    // 生成html
    var cartHtml = _util.renderHtml(templateIndex, data);
    $('.page-wrap').html(cartHtml);
    // 通知导航购物车更新数量
    navi.loadCartContent();
  },
  // 删除指定商品
  deleteCartProduct: function(productIds) {
    var _this = this;
    _cart.deleteProduct(productIds, function(res) {
        _this.renderCart(res);
    }, function(errMsg) {
      _this.showCartError();
    });
  },
  // 数据匹配
  filter: function(data) {
    data.notEmpty = !!data.cartProductVoList.length;
  },
  showCartError: function() {
    $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新一下试试</p>');
  }
};

$(function() {
  page.init();
});