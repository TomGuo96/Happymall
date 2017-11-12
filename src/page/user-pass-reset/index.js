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
  data: {
    username: '',
    question: ' 你的生日是?',
    answer: '1996-03-10',
    token: ''
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadStepUesrname();
  },
  bindEvent: function() {
    var _this = this;
    // 第一步输入用户名后的按钮点击
    $('#submit-username').click(function() {
      var username = $.trim($('#username').val());
      // 用户名存在
      if (username) {
        _this.data.username = username;
        // _user.getQuestion(username, function(res) {
        //   _this.data.username = uesrname;
        //   _this.data.question = res;
        //   _this.loadStepQuestion();
        // }, function(errMsg) {
        //   formError.show(errMsg);
        // });
        _this.loadStepQuestion();
      } 
      // 用户名不存在
      else {
        formError.show("请输入用户名");
      }
    });
    // 提示问题的按钮点击
    $('#submit-answer').click(function() {
      var answer = $.trim($('#answer').val());
      // 检查答案
      if (answer) {
        // _user.checkAnswer({
        //   username: _this.data.username,
        //   question: _this.data.question,
        //   answer: answer
        // }, function(res) {
        //   _this.data.answer = answer;
        //   _this.data.token = res;
        //   _this.loadStepPassword();
        // }, function(errMsg) {
        //   formError.show(errMsg);
        // });
        _this.loadStepPassword();
      } 
      // 用户名不存在
      else {
        formError.show("请输入答案");
      }
    });
    // 输入新密码后的按钮点击
    $('#submit-password').click(function() {
      var password = $.trim($('#password').val());
      // 检查密码
      if (password && password.length >= 6) {
        // _user.resetPassword({
        //   username: _this.data.username,
        //   passwordNew: _this.data.password,
        //   forgetToken: _this.token
        // }, function(res) {
        //   window.location.href = './result.html?type=pass-reset';
        // }, function(errMsg) {
        //   formError.show(errMsg);
        // });
        window.location.href = './result.html?type=pass-reset';
      } 
      // 用户名不存在
      else {
        formError.show("请输入不少于6位的新密码");
      }
    });
  },
  // 加载输入用户名
  loadStepUesrname: function() {
    $('.step-username').show();
  },
  // 加载输入密码提示问题
  loadStepQuestion: function() {
    // 清除错误提示
    formError.hide();
    // 容器切换
    $('.step-username').hide().siblings('.step-question').show()
    .find('.question').text(this.data.question);
  },
  // 加载输入password
  loadStepPassword: function() {
    formError.hide();
    $('.step-question').hide()
    .siblings('.step-password').show();
  }
};

$(function() {
  page.init();
});