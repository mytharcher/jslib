/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 * 		[a] Add globalEval
 * @2011-01-20 by mytharcher
 * 		[a] Add isVisible
 * @2011-02-13 by mytharcher
 * 		[m] Move 3 methods "isVisible", "getNextHighestDepth", "evalScript" to optional package of the class.
 * @2011-04-12 by mytharcher
 * 		[m] Move all methods to optional package of the class.
 */

///import js.dom;

/**
 * @class js.dom.Stage
 * 舞台类对象，包含一些与环境相关的全局方法
 * @singleton
 */
js.dom.Stage = js.dom.Stage || {};