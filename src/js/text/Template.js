/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-02 by mytharcher
 * 
 * update:
 * @2010-11-21 by mytharcher
 * @2010-02-13 by mytharcher
 * 
 */

///import js.text;
///import js.text.Escaper.escapeReg;

/**
 * @class js.text.Template 文本拼串模板类
 * @static
 * @singleton
 */
js.text.Template = js.text.Template || {
	/**
	 * @final
	 * @property LEFT_DELIMITER 变量左边界
	 * @type {String}
	 */
	LEFT_DELIMITER: '#{',
	
	/**
	 * @final
	 * @property RIGHT_DELIMITER 变量右边界
	 * @type {String}
	 */
	RIGHT_DELIMITER: '}',
	
	/**
	 * @ignore
	 * @private
	 * 缓存已编译的模板，未考虑缓存上限及管理机制
	 */
	compiled: {},
	
	/**
	 * 模板缓存管理
	 * @method js.text.Template.cache
	 * @static
	 * 
	 * <p>查找缓存看是否已经被缓存，如果是则返回缓存的模板方法，否则生成该模板的模板方法并缓存</p>
	 * 
	 * @param {String} tpl 模板字符串
	 * 
	 * @return {Function} 返回模板方法
	 */
	cache: function (tpl) {
		var Template = js.text.Template,
			compiled = Template.compiled[tpl];
		if (!compiled) {
			compiled = Template.compiled[tpl] = Template.compile(tpl);
		}
		return compiled;
	},
	
	/**
	 * 预编译模板
	 * @method js.text.Template.compile
	 * @static
	 * 
	 * @param {String} tpl
	 * 
	 * @return {Function}
	 */
	compile: function (tpl) {
		var Template = js.text.Template;
		if (!Template._re) {
			Template.delimiter();
		}
		var fnBody = [
			'var args = args && typeof args == "object" ? args : [].slice.call(arguments, 0);',
			'return ["',
			tpl.replace(/(["'])/g, '\\\x241').replace(Template._re, '", args["\x241"], "'),
			'"].join("");'
		].join('');
		
		return new Function('args', fnBody);
	},
	
	/**
	 * 格式化模板
	 * @method js.text.Template.format
	 * @static
	 * 
	 * @param {String/Function} tpl 使用的模板，可以是一个函数，使用函数可以做更高级的扩展
	 * @param {Any...} vars 模板变量群，可以是Object，也可以是更多的类String型的参数
	 * 
	 * @return {String}
	 */
	format: function(tpl, vars){
		var args = [].slice.call(arguments, 1);
		//支持函数扩展处理
		if (typeof tpl == 'function') {
			return tpl.apply(null, args);
		}
		return js.text.Template.cache(tpl).apply(null, args);
		
		// return (typeof tpl == 'function' ? tpl : js.text.Template.cache(tpl)).apply(null, args);
	},
	
	/**
	 * 修改定界符
	 * @method js.text.Template.delimiter
	 * @static
	 * 
	 * @param {String} left
	 * @param {String} right
	 * 
	 * @return {void}
	 */
	delimiter: function (left, right) {
		var Template = js.text.Template,
			escapeReg = js.text.Escaper.escapeRegExp;
		Template._re = new RegExp(escapeRegExp(left || Template.LEFT_DELIMITER) + '(\\w+)' + escapeRegExp(right || Template.RIGHT_DELIMITER), 'ig');
	}
};