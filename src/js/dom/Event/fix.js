/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-25 by mytharcher
 * 
 * update:
 */

///import js.client.Features.~functionBind;
///import js.dom.Event.Handlers.preventDefault;
///import js.dom.Event.Handlers.stopPropagation;
///import js.dom.Event.Handlers.stopAll;

/**
 * 修正事件对象，以适应标准事件
 * @static
 * 
 * @param {DOMEvent} ev DOM事件对象
 * 
 * @return {Object}
 */
js.dom.Event.fix = function (e) {
	var ev = e || window.event;

	var target = ev.srcElement || ev.target;
	if (!ev.target) {
		ev.target = target;
	} else {
		ev.srcElement = target;
	}
	
	ev.keyCode = ev.which || ev.keyCode;
	ev.rightClick = ev.which == 3 || ev.button == 2;
	
	//可在处理函数内调用e.preventDefault()来阻止浏览器默认事件
	!ev.preventDefault && (ev.preventDefault = js.dom.Event.Handlers.preventDefault.bind(ev));

	//可在处理函数内调用e.stopPropagation()来阻止冒泡事件
	!ev.stopPropagation && (ev.stopPropagation = js.dom.Event.Handlers.stopPropagation.bind(ev));
	
	ev.stopAll = js.dom.Event.Handlers.stopAll;
	
	return ev;
};
