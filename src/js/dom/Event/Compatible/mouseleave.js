/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.client.Browser;
///import js.dom.Event.Handlers.withRelated;

/**
 * @ignore
 * 为非IE添加`mouseleave`事件兼容
 */
js.dom.Event.Compatible.mouseleave = !js.client.Browser.IE ? {
	type: 'mouseout',
	wrap: js.dom.Event.Handlers.withRelated
} : null;
