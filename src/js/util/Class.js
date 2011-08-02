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
 */

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
		return js.util.Class.extend(target, source, true, true);
	},
	
	/**
	 * 复制源对象上的属性到目标对象
	 * @method js.util.Class.copy
	 * @static
	 * 
	 * @param {Object} source 复制源
	 * @param {Object} target 复制目标
	 * @param {Boolean} deep 是否深度复制
	 * 
	 * @return {Object}
	 */
	copy: function (source, target, deep) {
		return js.util.Class.extend(target, source, true, deep);
	},
	
	/**
	 * 以一个对象上有的属性扩展另一个对象，默认不覆盖已有的同名属性
	 * @method js.util.Class.extend
	 * @static
	 * 
	 * @param {Object} target 被扩展的对象
	 * @param {Object} source 源对象
	 * @param {Boolean/Function} override (optional)是否覆盖已存在的属性。该参数或函数返回的值在如下三种情况下，undefined：如果已存在则不覆盖；true：强制覆盖；false：忽略该属性。默认：undefined。
	 * @param {Boolean} deep 是否深度扩展，默认：false；
	 * 
	 * @return {Object}
	 */
	extend: (function (specialKeys) {
		function ifOverride (target, source, key, override) {
			var over = typeof override == 'function' ? override.call(source, key) : override;
			return (typeof over == 'undefined' ? !target.hasOwnProperty(key) : over) && source.hasOwnProperty(key);
		}
		
		return function (target, source, override, deep) {
			var
				isFunction = Object.prototype.toString.call(source) == '[object Function]',
				isObject = source && typeof source == 'object' && !isFunction,
				isArray = source instanceof Array,
				keys = [], key, i, len, item,
				Class = js.util.Class;
			if (isObject || (isFunction && !deep)) {
				target = target || (isArray ? [] : {});
				for (i in source) {
					if (source.hasOwnProperty(i)) {
						keys.push(i);
					}
				}
				keys = keys.concat(specialKeys);
				for (i = 0, len = keys.length; i < len; i++) {
					key = keys[i];
					if (key && key != 'prototype' && ifOverride(target, source, key, override)) {
						item = source[key];
						target[key] = deep ? Class.extend(target[key], item, true, true) : item;
						if (!isArray && item === null) {
							delete target[key];
						}
					}
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
	 * @param {Function} superClass 超类，非必选。如有超类，则新类会继承于超类
	 * @param {Array} interfaces 接口，非必选。如果有接口，则新类会继承接口列表中的所有原型，但不会被覆盖
	 * 
	 * @return {Function} 创建的新类
	 */
	create: function (proto, superClass, interfaces) {
		var Class = js.util.Class,
			newClass;
		
		if (proto.hasOwnProperty('constructor')) {
			newClass = proto.constructor;
		} else {
			var tplStr = '';
			//解决了派生类不指定constructor是默认继承超类构造函数不能超过两级的问题
			if (superClass) {
				var defConRe = /^function anonymous\(\)\s*\{\s*this\.superClass(\.prototype\.superClass)*\.apply\(this,\s*arguments\);\s*\}$/;
				tplStr += 'this.superClass';
				for (var s = superClass; s; s = s.prototype.superClass) {
					if (defConRe.test(s.toString())) {
						tplStr += '.prototype.superClass';
					} else {
						break;
					}
				}
				tplStr += '.apply(this, arguments);';
			}
			newClass = new Function(tplStr);
		}
		Class.copy(proto, newClass.prototype);
		
		return superClass ? Class.inherit(newClass, superClass, interfaces) : newClass;
	},
	
	/**
	 * 继承一个类
	 * @method js.util.Class.inherit
	 * @static
	 * 
	 * 该继承会使用SubClass.prototype = new SuperClass()的机制继承超类，
	 * 同时会修正constructor属性，
	 * 还会添加一个superClass的属性指向超类。
	 * 另外，还会继承超类上所有的静态对象。
	 * 
	 * @param {Function} someClass 派生类
	 * @param {Function} superClass 超类
	 * 
	 * @return {Function} 派生类
	 */
	inherit: function (someClass, superClass, interfaces) {
		var Class = js.util.Class,
		
			//暂存派生类原有的prototype
			proto = someClass.prototype,
		
			//超类prototype复制临时辅助类
			superHelper = new Function();
		
		//复制超类的prototype到临时辅助类
		superHelper.prototype = superClass.prototype;
		
		//设置派生类的prototype为临时辅助类生成的实例
		//这里相当于给派生类一套超类干净的prototype赋值
		someClass.prototype = new superHelper();
		
		//覆盖自定义原型
		Class.copy(proto, someClass.prototype);
		
		//实现接口
		Class.implement(someClass, interfaces);
		
		//复制超类的静态对象到派生类
		Class.extend(someClass, superClass);
		
		//设置派生类的超类属性为超类
		someClass.prototype.superClass = superClass;
		someClass.prototype._super = superClass.prototype;
		
		//修复派生类的构造函数属性
		someClass.prototype.constructor = someClass;
		
		return someClass;
	},
	
	/**
	 * 实现接口
	 * @method js.util.Class.implement
	 * @static
	 * 该方法会将inter对象上的所有函数扩展到someClass的原型上，前提是someClass的原型上没有同名的方法。通过此方法以达到在创建类时可以实现其他类提供的接口。
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
					var protoItem = interProto[p];
					if (p != 'constructor'
						&& p != 'prototype'
						&& obj2str.call(protoItem) == '[object Function]'
						&& !someClass.prototype[p]
					) {
						someClass.prototype[p] = protoItem;
					}
				}
			}
		}
		return someClass;
	}
};