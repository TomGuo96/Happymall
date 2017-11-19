'use strict';

var _util = require('util/util.js');
var _cities= require('util/cities/index.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
  
  show: function(option) {
    // option绑定
    this.option = option;
    this.option.data = option.data || {};
    this.$modalWrap = $('.modal-wrap');
    // 渲染页面
    this.loadModal();
    // 绑定事件
    this.bindEvent();
  },
  
  // 关闭弹窗
  hide: function() {
    this.$modalWrap.empty();
  },
  
  bindEvent: function () {
    
    var _this = this;
    
    // 省份与城市的二级联动
    $('#receiver-province').change(function() {
      
      var selectedProvince = $(this).val();
      _this.loadCities(selectedProvince);
      
    });
    
    // 提交收货地址
    $('.address-btn').click(function() {
      
      var receiverInfo = _this.getReceiverInfo();
      var isUpdate = _this.option.isUpdate;
      
      // 使用新地址且验证通过
      if (!isUpdate && receiverInfo.status) {
        
        _address.save(receiverInfo.data, function(res) {
          _util.successTips('地址添加成功！');
          _this.hide();
          typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
        
      }
      // 更新收件人，且验证通过
      else if (isUpdate && receiverInfo.status) {
        
        _address.update(receiverInfo.data, function(res) {
          _util.successTips('地址修改成功！');
          _this.hide();
          typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
        
      }
      // 验证不通过
      else
        _util.errorTips(receiverInfo.errMsg || '好像哪里不对了～');
        
    });
    
    // 保证点击modal内容区的时候不关弹窗
    $('.modal-container').click(function(e) {
      e.stopPropagation();
    });
    
    
    // 关闭弹窗，点击叉号或者蒙板区域
    $('.close').click(function() {
      _this.hide();
    });
    
  },
  
  loadModal: function() {
    
    var addressModalHtml = _util.renderHtml(templateAddressModal, {
      isUpdate: this.option.isUpdate,
      data: this.option.data
    });
    
    this.$modalWrap.html(addressModalHtml);
    // 加载省份
    this.loadProvince();
    
  },
   
  // 加载省份信息
  loadProvince: function() {
    var provinces = _cities.getProvinces() || [];
    var $provinceSelect = $('#receiver-province');
    $provinceSelect.html(this.getSelectOption(provinces));
    // 如果是更新地址，并且有省份信息
    if (this.option.isUpdate && this.option.data.receiverProvince) {
      $provinceSelect.val(this.option.data.receiverProvince);
      // 加载城市
      this.loadCities(this.option.data.receiverProvince);
    }
  },
  
  // 加载城市信息
  loadCities: function (provinceName) {
    var cities = _cities.getCities(provinceName) || [];
    var $citySelect = $('#receiver-city');
    $citySelect.html(this.getSelectOption(cities));
    // 如果是更新地址，并且有省份信息
    if (this.option.isUpdate && this.option.data.receiverCity)
      $citySelect.val(this.option.data.receiverCity);
  },
  
  // 获取select框的选项
  getSelectOption: function(optionArray) {
    var html = '<option value="">请选择</option>';
    for (var i = 0, len = optionArray.length; i < len; i++) {
      html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
    }
    return html;
  },
  
  // 获取表单收件人信息，并做表单的验证
  getReceiverInfo: function () {
    var receiverInfo = {};
    var result = {
      status: false
    };
    receiverInfo.receiverName = $.trim($('#receiver-name').val());
    receiverInfo.receiverProvince = $.trim($('#receiver-province').val());
    receiverInfo.receiverCity = $.trim($('#receiver-city').val());
    receiverInfo.receiverPhone = $.trim($('#receiver-phone').val());
    receiverInfo.receiverAddress = $.trim($('#receiver-address').val());
    receiverInfo.receiverZip = $.trim($('#receiver-zip').val());
    
    if (this.option.isUpdate)
      receiverInfo.id = $.trim($('#receiver-id').val());
    
    // 表单验证
    if (!receiverInfo.receiverName)
      result.errMsg = '请输入收件人姓名';
    else if (!receiverInfo.receiverProvince)
      result.errMsg = '请选择收件人所在省份';
    else if (!receiverInfo.receiverCity)
      result.errMsg = '请选择所在城市';
    else if (!receiverInfo.receiverPhone)
      result.errMsg = '请输入手机号码';
    else if (!receiverInfo.receiverAddress)
      result.errMsg = '请输入详细地址';
    else if (!receiverInfo.receiverZip)
      result.errMsg = '请输入邮政编码';
    // 所有验证都通过
    else {
      result.status = true;
      result.data = receiverInfo;
    }
    return result;
  }
  
};

module.exports = addressModal;