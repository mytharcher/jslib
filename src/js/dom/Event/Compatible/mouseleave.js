/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.client.Features.eventMouseLeave;
///import js.dom.Event.Handlers.withRelated;

/**
 * @ignore
 * 为非IE添加`mouseleave`事件兼容
 */
js.dom.Event.Compatible.mouseleave = !js.client.Features.eventMouseLeave ? {
	type: 'mouseout',
	wrap: js.dom.Event.Handlers.withRelated
} : null;
