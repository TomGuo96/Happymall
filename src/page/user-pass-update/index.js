'use strict';

require('./index.css');

require('page/common/navi-simple/index.js');

var naviSide = require('page/common/navi-side/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');

var page = {
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    naviSide.init('pass-update');
  },
  bindEvent: function() {
    var _this = this;
    // 点击提交后的动作
    $(document).on('click', '.btn-submit', function() {
      var userInfo = {
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#password-new').val()),
        passwordConfirm: $.trim($('#password-confirm').val())
      };
      var validateResult = _this.validateForm(userInfo);
      // 更改用户密码
      if (validateResult.status) {
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, function(res, msg) {
          _util.successTips(msg);
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
    if (!_util.validate(formData.password, 'require')) {
      result.msg = '原密码不能为空';
      return result;
    }
    // 验证新密码长度
    if (!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = '密码长度不足';
      return result;
    }
    if (formData.passwordNew !== formData.passwordConfirm) {
      result.msg = '两次密码不一致';
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
