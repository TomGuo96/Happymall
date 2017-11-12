'use strict';

require('./index.css');
require('page/common/navi-simple/index.js');

var _util = require('util/util.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show: function(errMsg) {
      $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function() {
      $('.error-item').hide().find('.err-msg').text('');
    }
};

// page逻辑部分
var page = {
  init: function() {
    this.bindEvent();
  },
  bindEvent: function() {
    var _this = this;
    // 注册按钮的点击
    $('#username').blur(function() {
      var username = $.trim($(this).val());
      if (!username) {
        return;
      }
      // 异步验证用户名是否存在
      _user.checkUsername(username, function(res) {
        formError.hide();
      }, function(errMsg) {
        formError.show(errMsg);
      });
    });
    $('#submit').click(function() {
      _this.submit();
    });
    // 如果按下回车，也提交
    $('.user-content').keyup(function(e) {
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },
  // 提交表单
  submit: function() {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordComfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    };
    // 表单验证结果
    var validateResult = this.formValidate(formData);
    if (validateResult.status) {
      _user.register(formData, function(res) {
        window.location.href = './result.html?type=register';
      }, function(errMsg) {
        formError.show(errMsg);
      });
    } else {
      formError.show(validateResult.msg);
    }
  },
  // 表单字段的验证
  formValidate: function(formData) {
    var result = {
      status: false,
      msg: ''
    };
    if (!_util.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      return result;
    }
    if (!_util.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result;
    }
    if (formData.password.length < 6) {
      result.msg = '密码长度不能少于6位';
      return result;
    }
    if (formData.password !== formData.passwordComfirm) {
      result.msg = '两次输入不一致';
      return result;
    }
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
  }
};
$(function() {
  page.init();
});