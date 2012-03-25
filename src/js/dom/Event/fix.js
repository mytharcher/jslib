/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-25 by mytharcher
 * 
 * update:
 */

///import js.dom.Event.Handlers.preventDefault;
///import js.dom.Event.Handlers.stopPropagation;
///import js.dom.Event.Handlers.stopAll;

/**
 * 转化事件对象，以适应标准事件
 * @static
 * 
 * @param {DOMEvent} ev DOM事件对象
 * 
 * @return {Object}
 */
js.dom.Event.fix = function (ev) {
	var evt = ev || window.event;
	var e = {};

	for (var i in evt) {e[i] = evt[i];}
	
	e.target = e.srcElement = e.target || e.srcElement;
	e.keyCode = e.which || e.keyCode;
	e.rightClick = e.which == 3 || e.button == 2;

	//可在处理函数内调用e.preventDefault()来阻止浏览器默认事件
	e.preventDefault = evt.preventDefault || js.dom.Event.Handlers.preventDefault.bind(evt);

	//可在处理函数内调用e.stopPropagation()来阻止冒泡事件
	e.stopPropagation = evt.stopPropagation || js.dom.Event.Handlers.stopPropagation.bind(evt);
	
	e.stopAll = js.dom.Event.Handlers.stopAll;
	
	return e;
};
