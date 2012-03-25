/*
 * Elf Javascript Library
 * 
 * create:
 * @2009-12-25 by mytharcher
 * 
 * update:
 * @2010-04-22 by mytharcher
 * @2010-04-27 by mytharcher
 * @2010-07-10 by mytharcher
 * @2010-11-18 by mytharcher
 * @2011-08-24 by mytharcher
 * 		[a] Add "Event.Type" for change hard code to enum expression.
 */

/**
 * @class js.dom.Event
 * DOM对象事件注册和删除类封装，基于jQuery的思想，解决了IE里this指针指不到事件元素的问题
 * @singleton
 */
js.dom.Event = js.dom.Event || {};
