'use strict';

require('./index.css');

require('page/common/navi/index.js');

var naviSide = require('page/common/navi-side/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    naviSide.init('user-center');
    this.loadUserInfo();
  },
  bindEvent: function() {
    var _this = this;
    // 点击提交后的动作
    $(document).on('click', '.btn-submit', function() {
      var userInfo = {
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
      };
      var validateResult = _this.validateForm(userInfo);
      // 更改用户信息
      if (validateResult.status) {
        _user.updateUserInfo(userInfo, function(res, msg) {
          _util.successTips(msg);
          window.location.href = './user-center.html';
        }, function(errMeg) {
          _util.errorTips(errMeg);
        });
      } else {
        _util.errorTips(validateResult.msg);
      }
    });
  },
  // 验证注册信息
  validateForm: function(formData) {
    var result = {
      status: false,
      msg: ''
    };
    if (!_util.validate(formData.phone, 'phone')) {
      result.msg = '手机号格式错误';
      return result;
    }
    if (!_util.validate(formData.email, 'email')) {
      result.msg = '邮箱格式错误';
      return result;
    }
    if (!_util.validate(formData.question, 'require')) {
      result.msg = '密码提示问题不能为空';
      return result;
    }
    if (!_util.validate(formData.answer, 'require')) {
      result.msg = '密码提示问题答案不能为空';
      return result;
    }
    // 通过验证，返回正确提示
    result.status = true;
    result.msg = "验证通过";
    return result;
  },
  // 记载用户信息
  loadUserInfo: function() {
    var userHtml = "";
    _user.getUserInfo(function(res) {
      userHtml = _util.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function(errMsg) {
      _util.errorTips(errMsg);
    });
  }
};

$(function() {
  page.init();
});
