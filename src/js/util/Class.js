/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-04-09 by mytharcher
 * @2010-07-23 by mytharcher
 * @2010-11-17 by mytharcher
 * @2010-12-23 by mytharcher [m] Modify method "extend", "clone" and "copy" will all implement by "extend".
 * @2011-01-10 by mytharcher [m] Fix bug in method "extend", especially for extend an object contains a constructor key.
 * @2011-06-29 by mytharcher [m] Fix bug in method "create" and "inherit", for supporting the syntax of "subClassInstance instanceof SuperClass == true".
 * @2011-08-13 by mytharcher
 *      [m] Change the method "extend" to "mix" to avoid confusion about extend actions.
 * @2011-08-18 by mytharcher
 *      [m] Move the implement process from method "inherit" to "create" for clean.
 * @2011-08-24 by mytharcher
 *      [m] Change class inheritship property "superClass" in newly created classes to "Super".
 *      [d] Remove prototype property "_super" from newly created classes.
 *      [m] Modify "implement" API to support more arguments.
 * @2011-09-02 by mytharcher
 *      [m] Add array support for method "mix" to specify the argument "override".
 * @2011-09-25 by mytharcher
 *      [m] Change method "mix" to allow copy empty properties.
 * @2011-10-30 by mytharcher
 *      [m] Abandon the auto-created constructor in newly created class without specifying a own constructor, for being more common as other languages.
 *      [m] Remove "Super" in newly created sub-class to avoid confusion.
 * @2012-01-10 by mytharcher
 *      [m] Change the type judgement from by the class js.util.Type to native implement by typeof expression, to cut off the dependency circle.
 */

///import js.client.Features.~arrayIndexOf;
///import js.util;

/**
 * @class js.util.Class
 * 类管理
 * @static
 * @singleton
 */
js.util.Class = js.util.Class || {
	/**
	 * 通过克隆一个对象的所有层级的属性产生一个新的对象
	 * @method js.util.Class.clone
	 * @static
	 * 
	 * @param {Object} source 克隆源
	 * @param {Object} target (optional)克隆目标，不输入则自动创建。
	 * 
	 * @return {Object}
	 */
	clone: function (source, target) {
		return js.util.Class.mix(target, source, true, true);
	},
	
	/**
	 * 复制源对象上的属性到目标对象
	 * @method js.util.Class.copy
	 * @static
	 * 
	 * @param {Object...} source 复制源
	 * @param {Object} target (optional)复制目标
	 * @param {Boolean} deep (optional)是否深度复制
	 * 
	 * @return {Object}
	 */
	copy: function (source) {
		var len = arguments.length,
			lastIndex = len - 1,
			deep = arguments[lastIndex],
			hasDeep = typeof deep == 'boolean',
			target;
		
		if (lastIndex > 0) {
			if (hasDeep) {
				if (lastIndex > 1) {
					target = arguments[--lastIndex];
				}
			} else {
				target = deep;
				deep = false;
				lastIndex--;
			}
		} else {
			deep = false;
		}
		for (var i = 0; i <= lastIndex; i++) {
			target = js.util.Class.mix(target, arguments[i], true, deep);
		}
		return target;
		// return js.util.Class.mix(target, source, true, deep);
	},
	
	/**
	 * 以一个对象上有的属性扩展另一个对象，默认不覆盖已有的同名属性
	 * @method js.util.Class.mix
	 * @static
	 * 
	 * @param {Object} target 被扩展的对象
	 * @param {Object} source 源对象
	 * @param {Boolean/Function/Array} override (optional)是否覆盖已存在的属性。该参数或函数返回的值在如下三种情况下，undefined：如果已存在则不覆盖；true：强制覆盖；false：忽略该属性。默认：undefined。
	 * @param {Boolean} deep 是否深度扩展，默认：false；
	 * 
	 * @return {Object}
	 */
	mix: (function (specialKeys) {
		function doMix (target, source, key, override, deep, deleteNull) {
			var over,
				overDef = typeof override != 'undefined',
				Class = js.util.Class;
			if (overDef) {
				over = typeof override == 'function' ?
					override.call(source, key)
					: (override instanceof Array ?
						override.indexOf(key) >= 0
						: override);
			}
			
			if (source.hasOwnProperty(key) &&
				(overDef && typeof over != 'undefined' ?
					over : !target.hasOwnProperty(key))
			) {
				item = source[key];
				target[key] = deep ? Class.mix(target[key], item, true, true) : item;
				if (deleteNull && item === null) {
					delete target[key];
				}
			}
		}
		
		return function (target, source, override, deep) {
			var
				isFunction = Object.prototype.toString.call(source) == '[object Function]',
				isObject = source && typeof source == 'object' && !isFunction,
				isArray = source instanceof Array,
				keys = [], i, len, item;
			if (isObject || (isFunction && !deep)) {
				target = target || (isArray ? [] : {});
				
				if (isArray) {
					for (i = 0, len = source.length; i < len; ) {
						doMix(target, source, i++, override, deep);
					}
				} else {
					keys = Object.keys(source);
				}
				
				keys = keys.concat(specialKeys);
				for (i = 0, len = keys.length; i < len; ) {
					doMix(target, source, keys[i++], override, deep, true);
				}
			} else {
				target = source;
			}
			return target;
		};
	})(['constructor', 'toString']),
	
	/**
	 * 创建一个类
	 * @method js.util.Class.create
	 * @static
	 * 
	 * @param {Object} proto 新类的原型
	 * @param {Function} Super 超类，非必选。如有超类，则新类会继承于超类
	 * @param {Array} interfaces 接口，非必选。如果有接口，则新类会继承接口列表中的所有原型，但不会被覆盖
	 * 
	 * @return {Function} 创建的新类
	 */
	create: function (proto, Super, interfaces) {
		var Class = js.util.Class,
			newClass = proto.hasOwnProperty('constructor') ? proto.constructor : new Function();
		
		Class.copy(proto, newClass.prototype);
		
		//如果声明了父类，则从父类继承
		Super && Class.inherit(newClass, Super);
		
		//实现接口
		interfaces && Class.implement(newClass, [].slice.call(arguments, 2));
		
		return newClass;
	},
	
	/**
	 * 继承一个类
	 * @method js.util.Class.inherit
	 * @static
	 * 
	 * 该继承会使用SubClass.prototype = new SuperClass()的机制继承超类，
	 * 同时会修正constructor属性，
	 * 另外，还会继承超类上所有的静态对象。
	 * 
	 * @param {Function} someClass 派生类
	 * @param {Function} Super 超类
	 * 
	 * @return {Function} 派生类
	 */
	inherit: function (someClass, Super) {
		var Class = js.util.Class,
		
			//暂存派生类原有的prototype
			proto = someClass.prototype,
		
			//超类prototype复制临时辅助类
			superHelper = new Function();
		
		//复制超类的prototype到临时辅助类
		superHelper.prototype = Super.prototype;
		
		//设置派生类的prototype为临时辅助类生成的实例
		//这里相当于给派生类一套超类干净的prototype赋值
		someClass.prototype = new superHelper();
		
		//覆盖自定义原型
		Class.copy(proto, someClass.prototype);
		
		//复制超类的静态对象到派生类
		Class.mix(someClass, Super);
		
		//设置派生类的超类属性为超类的原型
		someClass.__super__ = Super.prototype;
		
		//修复派生类的构造函数属性
		someClass.prototype.constructor = someClass;
		
		return someClass;
	},
	
	/**
	 * 实现接口
	 * @method js.util.Class.implement
	 * @static
	 * 该方法会将inter对象上的所有函数扩展到someClass的原型上，前提是someClass的原型上没有同名的方法。
	 * 通过此方法以达到在创建类时可以实现其他类提供的接口。
	 * 
	 * @param {Function} someClass
	 * @param {Array|Object...} inter
	 * 
	 * @return {Function} 返回实现了接口的对象someClass
	 */
	implement: function (someClass, inter) {
		if (inter) {
			var obj2str = Object.prototype.toString;
			var interfaces = inter instanceof Array ? inter : [].slice.call(arguments, 1);
			for (var i = 0, l = interfaces.length; i < l; i++) {
				var interProto = interfaces[i];
				for (var p in interProto) {
					if (interProto.hasOwnProperty(p)) {
						var protoItem = interProto[p];
						if (p != 'constructor' &&
							p != 'prototype' &&
							obj2str.call(protoItem) == '[object Function]' &&
							!someClass.prototype[p]
						) {
							someClass.prototype[p] = protoItem;
						}
					}
				}
			}
		}
		return someClass;
	}
};