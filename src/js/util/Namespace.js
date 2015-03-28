/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-04-09 by mytharcher
 * 
 * update:
 * @2010-11-19 by mytharcher:
 * 		[m] Add using() parameter - target, default window;
 * 		[m] Change inner sjs referrence to this;
 * 		[a] Add using self to js;
 * @2011-05-06 by mytharcher:
 * 		[f] Fix the method name "use" to "using";
 * 		[r] Remove using self to js;
 * @2011-08-13 by mytharcher:
 * 		[m] Rename the method "using" to "use";
 * 		[m] Change window to js.util.Global.getGlobal();
 */

///import js.util;
///import js.util.Global.getGlobal;

/**
 * @class js.util.Namespace
 * 命名空间管理
 * @static
 * @singleton
 */
js.util.Namespace = js.util.Namespace || {
	/**
	 * 获取命名空间
	 * @method js.util.Namespace.get
	 * @static
	 * 
	 * @param {String} nsStr 以“.”分隔的命名空间字符串
	 * @param {Object/String} base 基于查询的空间
	 * @param {Object} object 把object挂到指定的命名空间下，如传入此对象，则在命名空间任意一个层级不存在的时候，会自动以Object创建该层级。默认undefined
	 * 
	 * @return {Object} 返回计算出的命名空间对象，如果没有namespace串传入则返回undefined
	 */
	get: function (nsStr, base, object, undef) {
		var isCreate = typeof object != 'undefined';
		var Namespace = js.util.Namespace;
		
		var ns = js.util.Global.getGlobal();
		
		if (nsStr) {
			switch(typeof(base)) {
				case 'object':
					ns = base;
					break;
				case 'string':
					ns = Namespace.get(base);
					break;
//				case 'undefined':
//					return (new Function('return ' + nsStr + ';'))();
				default:
					break;
			}
			if (ns) {
				nsStr = nsStr.split('.');
				for (var i = 0, l = nsStr.length; i < l; i++) {
					var word = nsStr[i];
					if (typeof ns[word] == 'undefined') {
						if (isCreate) {
							ns[word] = i < l - 1 ? {} : object;
						} else {
							ns = undef;
							break;
						}
					}
					ns = ns[word];
				}
			}
		} else {
			ns = undef;
		}
		
		return ns;
	},
	
	/**
	 * 声明包结构中的类的快捷方式
	 * @method js.util.Namespace.use
	 * @static
	 * 
	 * 已存在去重判断
	 * 别名声明
	 * 通配符匹配*
	 * 
	 * @param {String} ns 命名空间串，指定一个已存在的类或包
	 * @param {Object} target 目标命名空间，默认：window
	 * @param {String} alias 别名，如不传入，则默认为类名
	 * 
	 * @return {void}
	 */
	use: function (ns, target, alias) {
		target = target || js.util.Global.getGlobal();
		var className = ns.match(/(?:^|\.)([\w\$]+|\*)$/)[1];
		var Namespace = js.util.Namespace;
		
		if (className == '*') {
			var baseName = ns.slice(0, -2);
			var baseNs = Namespace.get(baseName);
			for (var i in baseNs) {
				if (i != 'prototype') {
					Namespace.use(baseName + '.' + i, target);
				}
			}
		} else {
			className = alias || className;
			if (!target[className]) {
				target[className] = Namespace.get(ns);
			}
		}
	}
};
