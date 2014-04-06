/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-04-12 by mytharcher
 * 
 * update:
 * @2010-11-17 by mytharcher
 * @2010-11-18 by mytharcher
 * @2011-01-11 by mytharcher
 * @2011-02-18 by mytharcher
 * 		[m] Add "Object" result type for method "get" when "key" is not passed in.
 * @2011-10-31 by mytharcher
 * 		[a] Add own constructor.
 */

///import js.client.Browser;
///import js.util.Class;
///import js.util.Hash;
///import js.text.JSONParserFactory;
///import js.dom;
///import js.client.Features.~arrayMap;

/**
 * @class js.dom.Style
 * 样式管理类
 * @extends js.util.Hash
 */
js.dom.Style = js.dom.Style || js.util.Class.create({
	constructor: function () {
		js.util.Hash.apply(this, arguments);
	},
	/**
	 * 生成以分号分隔的样式属性字符串
	 * @return {String}
	 */
	toString: (function() {
		var toString = js.text.JSONParserFactory.createStringifier(';', ':', null, true);
		return function () {
			return toString(this._data);
		}
	})()
}, js.util.Hash);

js.util.Class.copy({
	/**
	 * 将css字符串转化为JSON键值对
	 * @method js.dom.Style.parseJSON
	 * @override
	 * @static
	 * 
	 * @param {String} source
	 * 
	 * @return {Object}
	 */
	parseJSON: js.text.JSONParserFactory.createParser(';', ':', null, true),
	
	/**
	 * 将以“-”连字符链接的属性名转化为驼峰命名的字符串
	 * @method js.dom.Style.toCamelCase
	 * @static
	 * 
	 * @param {String} source
	 * 
	 * @return {String}
	 */
	toCamelCase: function (source) {
		return String(source).replace(/[-_][a-z]/g, function (match) {
			return match.charAt(1).toUpperCase();
		});
	},
	
	/**
	 * 获取元素当前样式
	 * @method js.dom.Style.get
	 * @static
	 * 
	 * @param {Element} element 要获取的元素
	 * @param {String} key 要获取的样式名，为空则返回整个样式对象
	 * 
	 * @return {String/Object}
	 */
	get: function (element, key) {
		var Style = js.dom.Style,
			elem = js.dom.Stage.get(element),
			key = key ? Style.toCamelCase(key) : '',
			value,
			// 在IE下，Element没有在文档树上时，没有currentStyle属性
//			style = elem.currentStyle || (js.client.Browser.IE ? elem.style : document.defaultView.getComputedStyle(elem, null)),
			style = js.client.Browser.IE ? elem.currentStyle || elem.style : document.defaultView.getComputedStyle(elem, null);
		
		if (key) {
			value = style[key];
			
			// 在取不到值的时候，用fixer进行修正
			if (!value) {
				var fixer = Style.fixer[key];
				
				if ('string' == typeof fixer) {
					value = style[fixer];
				} else if (fixer && fixer.get) {
					value = fixer.get(style, key);
				} else {
					value = style[key];
				}
			}
			
			// 检查结果过滤器
			var filter = Style.filter[key];
			if (filter) {
				value = filter.call(Style.filter, value);
			}
		} else {
			value = style;
		}
	
		return value;
	},
	
	/**
	 * 设置一个DOM元素的样式
	 * @method js.dom.Style.set
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String/Object} key
	 * @param {String} value
	 * 
	 * @return {void}
	 */
	set: function (element, key, value) {
		var Style = js.dom.Style,
			elem = js.dom.Stage.get(element);
		if (typeof key == 'object' && typeof value == 'undefined') {
			Style.setCSSText(elem, key);
		} else {
			var key = Style.toCamelCase(key);
			var fixer = Style.fixer[key];
			//	element.style[key] = value;
			(fixer && fixer.set) ? fixer.set(elem, value) : (elem.style[fixer || key] = value);
		}
	},
	
	/**
	 * 通过cssText设置元素的样式
	 * @method js.dom.Style.setCSSText
	 * @static
	 * 
	 * @param {Element} element 要操作的对象
	 * @param {Object/Style/String} style 要设置的样式
	 * @param {Boolean} clean (optional)是否清除原有cssText后再添加，默认：false
	 * 
	 * @return {void}
	 */
	setCSSText: function (element, style, clean) {
		var elem = js.dom.Stage.get(element);
		elem.style.cssText = (new js.dom.Style(clean ? {} : elem.style.cssText))
			.set(style)
			.toString();
	},
	
	/**
	 * @ignore
	 */
	fixer: {
		/**
		 * @ignore
		 */
		'opacity': js.client.Browser.IE ? {
			/**
			 * @ignore
			 */
			get: function (style) {
				var filter = style.filter;
				return filter && filter.indexOf("opacity=") >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1";
			},
			
			/**
			 * @ignore
			 */
			set: function (element, value) {
				var style = element.style;
				// 只能Quirks Mode下面生效??
				style.filter = (style.filter || "").replace(/alpha\([^\)]*\)/gi, "") + ("alpha(opacity=" + value * 100 + ")");
				// IE filters only apply to elements with "layout."
				style.zoom = 1;
			}
		} : null,
		
		/**
		 * @ignore
		 */
		'float': js.client.Browser.IE ? 'styleFloat' : 'cssFloat'
	},
	
	/**
	 * @ignore
	 */
	filter: {
		/**
		 * @ignore
		 */
		background: function (value) {
			return this.color(value);
		},
		
		/**
		 * @ignore
		 */
		backgroundColor: function (value) {
			return this.color(value);
		},
		
		/**
		 * @ignore
		 */
		color: function (value) {
			return value.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i, this._rgbColorReplacer)
				.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])\b/ig, this._shortColorReplacer);
		},
		
		/**
		 * @ignore
		 */
		_rgbColorReplacer: function (rgb, r, g, b) {
			return '#' + [r, g, b].map(function(color){
				return ('0' + parseInt(color).toString(16)).substr(-2);
			}).join('');
		},
		
		/**
		 * @ignore
		 */
		_shortColorReplacer: function (color, r, g, b) {
			return ['#', r, r, g, g, b, b].join('');
		}
	}
}, js.dom.Style);