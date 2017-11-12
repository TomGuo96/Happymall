'use strict';

require('./index.css');

var _util = require('util/util.js');
var templateIndex = require('./index.string');

// 侧边导航
var naviSide = {
  option: {
    name: '',
    navList: [
      {name: 'user-center', desc: '个人中心', href: './user-center.html'},
      {name: 'order-list', desc: '我的订单', href: './order-list.html'},
      {name: 'pass-update', desc: '修改密码', href: './user-pass-update.html'},
      {name: 'about', desc: '关于Mall', href: './about.html'}
    ]
  },
  init: function(option) {
    // 合并选项
    $.extend(this.option, {name: option});
    this.renderNav();
  },
  // 渲染导航菜单
  renderNav: function() {
    // 计算cative数据
    for (var i = 0, len = this.option.navList.length; i < len; i++) {
      if (this.option.navList[i].name == this.option.name) {
        this.option.navList[i].isActive = true;
      }
    }
    // 渲染list数据
    var navHtml = _util.renderHtml(templateIndex, {
      navList: this.option.navList
    });
    // 加载进入容器
    $('.navi-side').html(navHtml);
  }
};

module.exports = naviSide;