/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-04-09 by mytharcher
 * @2010-07-12 by mytharcher
 * @2010-11-20 by mytharcher
 * @2010-11-25 by mytharcher
 * @2010-12-09 by mytharcher
 * @2011-02-24 by mytharcher
 */

///import js.util;
///import js.util.Class;

/**
 * @class js.util.Type
 * 类型判断类
 * 
 * <p>只提供JS原生对象的判断，额外对象的类型判断可在Type包中扩展。</p>
 * @singleton
 */



/**
 * 判断一个对象是否是数组
 * @method js.util.Type.isArray
 * @static
 * 
 * @param {Any} 要判断的对象
 * 
 * @return {Boolean}
 */

/**
 * 判断一个对象是否是布尔对象/值
 * @method js.util.Type.isBoolean
 * @static
 * 
 * @param {Any} 要判断的对象
 * 
 * @return {Boolean}
 */

/**
 * 判断一个对象是否是日期对象
 * @method js.util.Type.isDate
 * @static
 * 
 * @param {Any} 要判断的对象
 * 
 * @return {Boolean}
 */

/**
 * 判断一个对象是否是函数
 * @method js.util.Type.isFunction
 * @static
 * 
 * @param {Any} 要判断的对象
 * 
 * @return {Boolean}
 */

/**
 * 判断一个对象是否是正则表达式对象
 * @method js.util.Type.isRegExp
 * @static
 * 
 * @param {Any} 要判断的对象
 * 
 * @return {Boolean}
 */

/**
 * 判断一个对象是否是字符串
 * @method js.util.Type.isString
 * @static
 * 
 * @param {Any} 要判断的对象
 * 
 * @return {Boolean}
 */
js.util.Type = js.util.Type || js.util.Class.mix((function (types) {
	function create(t, o2s) {
		return function (value) {
			return o2s.call(value) == '[object ' + t + ']';
		};
	}
	var ret = {},
		obj2Str = Object.prototype.toString;
	for (var i = types.length - 1; i >= 0; i--) {
		var type = types[i];
		ret['is' + type] = create(type, obj2Str);
		ret[type.toUpperCase()] = type.toLowerCase();
	}
	return ret;
})('Array Boolean Date Function RegExp String'.split(' ')), {
	/**
	 * 判断一个变量是否被定义了
	 * @method js.util.Type.isDefined
	 * @static
	 * 
	 * @param {Any} value 要判断的元素
	 * 
	 * @return {Boolean}
	 */
	isDefined: function (value) {
		return typeof value != 'undefined';
	},
	
	/**
	 * 判断一个变量是否是undefined类型
	 * @method js.util.Type.isUndefined
	 * @static
	 * 
	 * @param {Object} obj 要判断的变量
	 * 
	 * @return {Boolean}
	 */
	isUndefined: function (obj) {
		return typeof obj == 'undefined';
	},
	
	/**
	 * 判断一个变量是否是null类型
	 * @method js.util.Type.isNull
	 * @static
	 * 
	 * @param {Object} obj 要判断的变量
	 * 
	 * @return {Boolean}
	 */
	isNull: function (obj) {
		return obj === null;
	},
	
	/**
	 * 判断一个对象是否是数字(包括Infinity，但不包括NaN)
	 * @method js.util.Type.isNumber
	 * @static
	 * 
	 * @param {Any} value 要判断的对象
	 * 
	 * @return {Boolean}
	 */
	isNumber: function (value) {
		return Object.prototype.toString.call(value) == '[object Number]' && !isNaN(value);
	},
	
	/**
	 * 判断一个对象或值是否不是数字类型
	 * @method js.util.Type.isNaN
	 * @static
	 * 
	 * @param {Object} value
	 * 
	 * @return {Boolean}
	 */
	isNaN: isNaN,
	
	/**
	 * 判断一个变量是否是对象(不包括函数，也不包括null)
	 * @method js.util.Type.isObject
	 * @static
	 * 
	 * @param {Object} obj
	 * 
	 * @return {Boolean}
	 */
	isObject: function (obj) {
		return !!obj && typeof obj == 'object' && Object.prototype.toString.call(obj) == '[object Object]';
	},
	
	/**
	 * 给出对象类型基于js定义的字符串标识
	 * @method js.util.Type.of
	 * @static
	 * 
	 * @param {Any} obj 要计算的变量
	 * 
	 * @return {String} 返回类型的标识
	 */
	of: function (obj) {
		var Type = js.util.Type,
			type = '';
		
		if (Type.isUndefined(obj)) {
			return Type.UNDEFINED;
		}
		if (Type.isNull(obj)) {
			return Type.NULL;
		}
		//计算对象的原生JS类型
		type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
		//如果该类型未被Type库记录
		if (!Type[type.toUpperCase()] || type == Type.OBJECT) {
			//先设置为'object'
			type = Type.OBJECT;
			
			//在extension数组中查找可能的类型依次进行判断，当任意一个类型匹配时认为obj即是该类型，并返回。
			for (var i = 0, len = Type.extension.length; i < len; i++) {
				var special = Type.extension[i];
				var t = '';
				var fn = Type['is' + special];
				if (fn && fn(obj) && (t = Type[special.toUpperCase()])) {
					type = t;
					break;
				}
			}
		} else if (type == Type.NUMBER) {
			type = isNaN(obj) ? Type.NAN : type;
		}
		
		return type;
	},
	
	/**
	 * @ignore
	 * @private
	 * @property extension
	 * @type {Array}
	 */
	extension: [],
	
	/**
	 * 增加特殊类型，用于of函数输出。
	 * @method js.util.Type.extend
	 * @static
	 * 
	 * @param {Object} typeSet 类型判断方法包，由类型关键字和判断方法键值对组成。i.e.<pre><code>
	 * {
	 * 		'Window': function (obj) {return true;},
	 * 		'Document': function (obj) {return false;}
	 * 		//, ...
	 * }
	 * </code></pre>
	 */
	extend: function (typeSet) {
		var Type = js.util.Type;
		for (var i in typeSet) {
			var method = 'is' + i;
			if (!Type[method]) {
				Type[i.toUpperCase()] = i.toLowerCase();
				Type[method] = typeSet[i];
				Type.extension.push(i);
			}
		}
	},
	
	/**
	 * 布尔类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.BOOLEAN
	 * @type {String}
	 */
	
	/**
	 * 空类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.NULL
	 * @type {String}
	 */
	NULL: 'null',
	
	/**
	 * 未定义类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.UNDEFINED
	 * @type {String}
	 */
	UNDEFINED: 'undefined',
	
	/**
	 * 数字类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.NUMBER
	 * @type {String}
	 */
	NUMBER: 'number',
	
	/**
	 * 非数字类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.NAN
	 * @type {String}
	 */
	NAN: 'nan',
	
	/**
	 * 字符串类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.STRING
	 * @type {String}
	 */
	
	/**
	 * 函数类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.FUNCTION
	 * @type {String}
	 */
	
	/**
	 * 数组类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.ARRAY
	 * @type {String}
	 */
	
	/**
	 * 日期类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.DATE
	 * @type {String}
	 */
	
	/**
	 * 正则表达式类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.REGEXP
	 * @type {String}
	 */
	
	/**
	 * 普通对象类型标识
	 * @static
	 * @contant
	 * @property js.util.Type.OBJECT
	 * @type {String}
	 */
	OBJECT: 'object'
});