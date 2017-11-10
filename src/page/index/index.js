'use strict';

require('../common/layout.css');
require('./index.css')

require('page/common/header/index.js');
require('page/common/navi/index.js');
var naviSide = require('page/common/navi-side/index.js');

naviSide.init('pass-update');