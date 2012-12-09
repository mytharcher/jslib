/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.client.Features.eventMouseEnter;
///import js.dom.Event.Handlers.withRelated;

/**
 * @ignore
 * 为非IE添加`mouseenter`事件兼容
 */
js.dom.Event.Compatible.mouseenter = !js.client.Features.eventMouseEnter ? {
	type: 'mouseover',
	wrap: js.dom.Event.Handlers.withRelated
} : null;
