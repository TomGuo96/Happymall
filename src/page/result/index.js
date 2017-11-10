'use strict';

require('./index.css');

require('page/common/navi-simple/index.js');
var _util = require('util/util.js');

$(function() {
  var type = _util.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success').show();
});