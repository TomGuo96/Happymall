'use strict';

require('./index.css')
require('node_modules/owl.carousel/dist/assets/owl.carousel.min.css');
require('node_modules/owl.carousel/dist/assets/owl.theme.default.min.css');

require('node_modules/owl.carousel/dist/owl.carousel.min.js');
require('page/common/header/index.js');
require('page/common/navi/index.js');

var templateBanner = require('./banner.string');
var _util = require('util/util.js');

$(function() {
  var bannerHtml = _util.renderHtml(templateBanner);
  $('.banner-con').html(bannerHtml);
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    nav: true,
    navText: '',
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false
  });
  $('.owl-prev').addClass('fa fa-angle-left');
  $('.owl-next').addClass('fa fa-angle-right');
});