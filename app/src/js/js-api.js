/**
 * @description [jsapi部分 对象]
 * @data 2016-10-11
 * @author gaotonglin
 */

var JsApi = window.JsApi || {};

/**
 * [header js-api 头部部分]
 * @param  {number} num [想要设置选中的项]
 * @return {null}     [null]
 */
JsApi.header = function (num) {
	var oNav = jQuery(".header_r ul");
	var aLi = oNav.find("li a");
	aLi.eq(num - 1).addClass("on");
}

/**
 * [nav js-api 左侧导航部分]
 * @param  {[object]} opt [配置参数]
 * @return {[null]}     [null]
 */
JsApi.nav = function (opt) {
	var defaults = {  //定义默认参数
		navEle: "nav_jsapi",  //导航元素
		navBox: "nav_box",  //元素盒子
		navTit: "h1",  //导航标题
		navList: "ul",  //导航列表
		navListEle: "a",  //导航列表元素
		navTitMark: "mark",  //头部元素
		header: "header_jsapi",  //头部元素
	};
	var config = jQuery.extend({}, defaults, opt);  //获取真实的配置参数
	var oNavEle = jQuery("#" + config.navEle);  //获取导航元素
	var aNavTit = oNavEle.find("." + config.navBox + " " + config.navTit);  //获取导航标题
	var aNavList = oNavEle.find("." + config.navBox + " " + config.navList);  //获取导航元素列表
	var oHeader = jQuery("." + config.header);  //获取头部元素
	var iWinHei = getViewPortSize().height;  //获取浏览器的高度
	var iSclTop = document.documentElement.scrollTop || document.body.scrollTop;
	
	// ==设置导航元素高度
	function setEleHei () {
		if(iSclTop > oHeader.outerHeight()){
			oNavEle.height(iWinHei);
		}else{
			oNavEle.height(iWinHei - oHeader.outerHeight());
		}
	}

	// ==初始化导航元素
	function init () {
		// 设置高度
		setEleHei();
		// 初始化滚动条
		oNavEle.mCustomScrollbar({
			advanced:{
				updateOnBrowserResize:true
			}
		});
	}

	// ==监听浏览器尺寸事件
	function winResize () {
		jQuery(window).resize(function(){
			iWinHei = getViewPortSize().height;
			setEleHei();
			// oNavEle.mCustomScrollbar("update");
		});
	}

	// ==监听浏览器滚动事件
	function winScroll () {
		jQuery(window).scroll(function(){
			iSclTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(iSclTop > oHeader.outerHeight()){
				oNavEle.css({
					position: "fixed",
					top: 0
				});
				oNavEle.height(iWinHei);
			}else{
				oNavEle.css({
					position: "static",
				});
				oNavEle.height(iWinHei - oHeader.outerHeight());
			}
			oNavEle.mCustomScrollbar("update");
		});
	}

	// 点击标题展开列表
	function bindClick () {
		// 点击标题绑定事件
		aNavTit.click(function() {
			var oSibling = jQuery(this).siblings(config.navList);
			var oMark = jQuery(this).find("." + config.navTitMark);
			if(jQuery(this).hasClass("show")){
				jQuery(this).removeClass("show");
				oSibling.hide();
				oMark.html("+");
				oNavEle.mCustomScrollbar("update");
			}else{
				jQuery(this).addClass("show");
				oSibling.show();
				oMark.html("-");
				oNavEle.mCustomScrollbar("update");
			}
		});
		// 点击列表元素绑定事件
		var aEle = aNavList.find(config.navListEle);
		aEle.click(function() {
			aEle.removeClass("on");
			jQuery(this).addClass("on");
		});
	}

	// 执行相关方法
	init();
	winResize();
	winScroll();
	bindClick();

}

/**
 * [layerTestBox layer组件在线调试]
 * @param  {[object]} opt [配置参数]
 * @return {[null]}     [null]
 */
JsApi.layerTestBox = function(opt){
	var defaults = {
		box: "layer_test_box", //外面大容器的id
		btn: "show_hide_btn", //展开收起按钮
		areaSmall: [50, 22], //收起尺寸
		title: "online_test", //窗体标题的id
		testBtn: "go_test", //立即运行按钮id
		textArea: "layer_test_area", //文本域id
		speed: 300 //动画过渡时间
	}
	var config = $.extend({}, defaults, opt);
	var oBox = $("#" + config.box);
	var oBtn = $("#" + config.btn);
	var sBtn = oBtn.html();

	var oTitle = $("#" + config.title);
	var oTestBtn = $("#" + config.testBtn);
	var oTestArea = $("#" + config.textArea);

	var iWid = getSize(oBox).width;
	var iHei = getSize(oBox).height;

	oBtn.click(function() {
		if(sBtn == "收起"){
			sBtn = "展开";
			oBtn.html(sBtn);
			moveSize(config.areaSmall[0], config.areaSmall[1], function(){
				hideEle();
			});
		}else{
			sBtn = "收起";
			oBtn.html(sBtn);
			moveSize(iWid, iHei, function(){
				showEle();
			});
		}
	});

	/**
	 * [moveSize 窗体盒子尺寸改变]
	 * @param  {[number]} wid  [目标宽度]
	 * @param  {[number]} hei  [目标高度]
	 * @param  {[function]} call [运动完成后的回调函数]
	 * @return {[null]}      [null]
	 */
	function moveSize(wid, hei, call){
		oBox.stop(true, true).animate({
			width: wid,
			height: hei},
			config.speed, function() {
				call && call();
			});
	}

	/**
	 * [showEle 显示元素]
	 * @return {[type]} [description]
	 */
	function showEle(){
		oTitle.show();
		oTestBtn.show();
		oTestArea.show();
	}

	/**
	 * [hideEle 隐藏元素]
	 * @return {[null]} [null]
	 */
	function hideEle(){
		oTitle.hide();
		oTestBtn.hide();
		oTestArea.hide();
	}

	/**
	 * [getSize 获取一个对象的宽高值]
	 * @param  {[object]} obj [一个jQuery对象]
	 * @return {[object]}     [宽值和高值]
	 */
	function getSize(obj){
		var iWid = obj.width();
		var iHei = obj.height();

		return {width: iWid, height: iHei};
	}
}