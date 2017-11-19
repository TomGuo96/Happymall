'use strict';

require('./index.css');

require('page/common/header/index.js');
require('page/common/navi/index.js');

var _util = require('util/util.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var _addressModal = require('./address-modal.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

var page = {
  data: {
    selectedAddressId: null
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadAddressList();
    this.loadProductList();
  },
  bindEvent: function() {
    
    var _this = this;
    
    // 地址的选择
    $(document).on('click', '.address-item', function() {
      $(this).addClass('active').siblings('.address-item').removeClass('active');
      _this.data.selectedAddressId = $(this).data('id');
    });
    
    // 提交订单
    $(document).on('click', '.order-submit', function() {
      var shippingId = _this.data.selectedAddressId;
      if (shippingId) {
        _order.createOrder({
          shippingId: shippingId
        }, function(res) {
          window.location.href = './payment.html?orderNumber=' + res.orderNo;
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
      } else {
        _util.errorTips("请选择地址后提交");
      }
    });
    
    // 地址的添加
    $(document).on('click', '.address-add', function() {
      _addressModal.show({
        isUpdate: false,
        onSuccess: function() {
          _this.loadAddressList();
        }
      });
    });
    
    // 地址的编辑
    $(document).on('click', '.address-update', function(e) {
      
      e.stopPropagation();
      
      var shippingId = $(this).parents('.address-item').data('id');
      
      _address.getAddress(shippingId, function(res) {
        
        _addressModal.show({
          isUpdate: true,
          data: res,
          onSuccess: function() {
            _this.loadAddressList();
          }
        });
        
      }, function(errMsg) {
        _util.errorTips(errMsg);
      });
      _addressModal.show({
        isUpdate: true,
        onSuccess: function() {
          _this.loadAddressList();
        }
      });
    });
    
    // 删除收货地址
    $(document).on('click', '.address-delete', function(e) {
      
      e.stopPropagation();
      
      var id = $(this).parents('.address-item').data('id');
      if (window.confirm('确认要删除该地址吗？')) {
        _address.deleteAddress(id, function(res) {
          _this.loadAddressList();
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
      }
      
    });
  
  },
  
  // 加载地址列表
  loadAddressList: function() {
    
    var _this = this;
    
    $('.product-con').html('<div class="loading"></div>');
    
    // 获取地址列表
    _address.getAddressList(function(res) {
      _this.addressFilter(res);
      var addressListHtml = _util.renderHtml(templateAddress, res);
      $('.address-con').html(addressListHtml);
    }, function(errMsg) {
      $('.address-con').html('<p>地址加载失败，请刷新后重试</p>');
    });
    
  },
  
  // 处理地址列表的选中状态
  addressFilter: function(data) {
    
    if (this.data.selectedAddressId) {
        var selectedAddressIdFlag = false;
        for (var i = 0, len = data.list.length; i < len; i++) {
          if (data.list[i].id === this.data.selectedAddressId) {
            data.list[i].isActive = true;
            selectedAddressIdFlag = true;
          }
        }
        // 如果以前选中的地址不在列表中，将其删除
        if (!selectedAddressIdFlag) {
          this.data.selectedAddressId = null;
        }
    }
    
  },
  
  loadProductList: function() {
    
    var _this = this;
    $('.product-con').html('<div class="loading"></div>');
    // 获取商品列表
    _order.getProductList(function(res) {
      var productListHtml = _util.renderHtml(templateProduct, res);
      $('.product-con').html(productListHtml);
    }, function(errMsg) {
      $('.product-con').html('<p>商品加载失败，请刷新后重试</p>');
    });
  }
  
};

$(function() {
  page.init();
});