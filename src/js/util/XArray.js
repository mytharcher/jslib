/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-08-19 by mytharcher
 * 
 * update:
 * @2010-11-20 by mytharcher
 * @2010-12-25 by mytharcher
 * 		[m] Move all seperated method files in the namespace js.util.XArray here.
 * @2011-08-29 by mytharcher
 * 		[m] Fix bug in method "distinct" for some duplicate stamp use.
 */

///import js.util;
///import js.util.Class;
///import js.util.Global.stamp;

if (!js.util.XArray) {

/**
 * @class js.util.XArray
 * 扩展数组类
 * @extends Array
 */
/**
 * @method constructor
 * @param {Any...} arguments
 */
js.util.XArray = function(){
	if (this.constructor != js.util.XArray) {
		return js.util.XArray.toXArray(arguments);
	}
	return [].push.apply(this, arguments);
};

js.util.XArray.prototype = [];

js.util.Class.copy({
	constructor: js.util.XArray,
	
	/**
	 * @ignore
	 */
	Super: Array,
	
	/**
	 * 去重的实例方法
	 * @method distinct
	 * @return {XArray}
	 * 
	 * @see js.util.XArray.distinct
	 */
	distinct: function () {
		var myClass = this.constructor;
		return myClass.toXArray(myClass.distinct.call(myClass, this));
	},
	
	/**
	 * 在数组中查找一个对象
	 * @override
	 * 
	 * @param {Any} target 要查找的对象或值。
	 * @param {Number} fromIndex (optional)预置起始查询的索引
	 * @param {Function} equal (optional)判断相等的函数，可选，默认相等条件是===。
	 * @param {Boolean} all (optional)是否查找全部匹配对象，默认：false
	 * 
	 * @return {Number/Array} 找不到返回-1，找到一个返回索引值，找到多个返回index所在位置组成的数组。
	 */
	indexOf: function (target, fromIndex, equal, all) {
		var len = this.length;
		if (!len) {
			return -1;
		}
		var isNativeEqual = typeof equal != 'function';
		var i = fromIndex || 0;
		i = i >= len ? len - 1 : i < 0 ? i % len + len : i;
		var index = [];
		for (; i < len; i++) {
			if (isNativeEqual ? (this[i] === target) : equal(target, this[i])) {
				index.push(i);
				if (!all) {
					break;
				}
			}
		}
		return index.length ? index.length == 1 ? index[0] : index : -1;
	},
	
	/**
	 * 转化为普通数组
	 * 
	 * @return {Array}
	 */
	toArray: function(){
		return this.slice();
	}
}, js.util.XArray.prototype);

js.util.Class.copy({
	/**
	 * 数组去重
	 * @method js.util.XArray.distinct
	 * @static
	 * 
	 * @description 数字和字符串：1 !== '1'；对象：objectA === objectB；算法复杂度o(n)。
	 *
	 * @param {Array} arrayLike 可以接受类数组对象，会先创建一个数组副本。
	 *
	 * @return {Array} 返回去重后的数组副本
	 */
	distinct: function(arrayLike){
		var copy = arrayLike.slice(),
			typeMap = {},
			guid = js.util.Global.guid('xarray'),
			ret = [],
			i = 0,
			len = copy.length,
			item,
			type,
			map;
		
		for ( ; i < len; i++) {
			item = copy[i];
			type = typeof item;
			map = typeMap[type] || (typeMap[type] = {});
			
			switch (type) {
				case 'function':
				case 'object':
					if (item) {
						var tag = js.util.Global.stamp(item, guid);
						if (!map[tag]) {
							map[tag] = true;
							ret.push(item);
						}
						break;
					}
					
				//这里不认为数字和字符串是同型的，即：1 !== '1'
				//Here consider number type's value is not equal to string which just contains a number, like: 1 !== '1'
				default:
					if (!map[item]) {
						map[item] = true;
						ret.push(item);
					}
					break;
			}
		}
		
		//删除用于去重对象上的标记
		for (var i = copy.length - 1; i >= 0; i--) {
			var item = copy[i],
				type = item && typeof item;
			if (type == 'object' || type == 'function') {
				delete item[guid];
			}
		}
		
		return ret;
	},
	
	/**
	 * <p>将一个array-like的对象转化为原生的Array对象</p>
	 * <p>如传入字符串，数字等非ArrayLike的值，则直接包装成一个数组返回</p>
	 * @method js.util.XArray.toXrray
	 * @static
	 * 
	 * @param {Object} arrayLike
	 * 
	 * @return {Array}
	 */
	toArray: function (arrayLike) {
		var ret = [];
		var type = typeof arrayLike;
		var length = arrayLike.length;
		//非数组直接包装
		if (typeof length == 'undefined' || type == 'string' || type == 'function' || arrayLike.setTimeout || arrayLike.nodeType) {
			ret.push(arrayLike);
		} else if (arrayLike instanceof Array || arrayLike.callee) {//数组或参数对象直接调用数组方法生成副本
			ret = [].slice.call(arrayLike);
		} else {//其他如HTMLCollection或childNodes遍历复制
			for (var i = 0; i < length && typeof arrayLike[i] != 'undefined'; ) {
				ret.push(arrayLike[i++]);
			}
		}
		return ret;
	},
	
	/**
	 * 将一个array-like的对象转化为XArray对象
	 * @method js.util.XArray.toXArray
	 * @static
	 * 
	 * @param {Object} arrayLike
	 * 
	 * @return {XArray}
	 */
	toXArray: function(arrayLike){
		var ret = new js.util.XArray();
		[].push.apply(ret, js.util.XArray.toArray(arrayLike));
		return ret;
	}
}, js.util.XArray);

}