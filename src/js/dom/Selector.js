/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-04-26 by mytharcher
 * 
 * update:
 * @2010-11-20 by mytharcher
 * @2010-11-27 by mytharcher
 * 
 */

///import js.dom;

/**
 * @class js.dom.Selector
 * css规则dom元素查询器
 * @singleton
 */
js.dom.Selector = js.dom.Selector || {
	/**
	 * 查询一个满足规则的对象
	 * @method js.dom.Selector.query
	 * @static
	 * 
	 * @param {String} a 要查询的选择器串
	 * @param {Object/Array} c 基于查询的空间
	 * 
	 * @return {Element/Null}
	 */
	query: function (a, c) {
		var result = js.dom.Selector.queryAll(a, c);
		return result.length ? result[0] : null;
	},
	
	/**
	 * 查询全部满足规则的对象
	 * @method js.dom.Selector.queryAll
	 * @static
	 * 
	 * @param {String} a 要查询的选择器串
	 * @param {Element/Array} c 基于查询的空间
	 * 
	 * @return {Array}
	 */
	queryAll: function(a, c){
		var _ = js.dom.Selector._;
		
		c = c instanceof Array ? c.length ? c : [document] : [c || document];
		
		var ret = [], temp;
		
		var pos = (a.substr(1).search(/[ >]/) + 1) || a.length;
		
		var cur = a.substr(0, pos);
		var remain = a.substr(pos);
		
		var atom = cur.match(_.T);
		var tag = atom[3] || '*';
		// 优先检测是否有#
		cur = atom[4] && tag == '*' ? cur.replace('*', '') : cur.replace(_.T, (atom[1] || ' ') + tag + (atom[4] || ''));
		
		atom = _.W.exec(cur);
		_.W.lastIndex = 0;
		
		for (var i = 0, len = c.length; i < len; i++) {
			temp = _.G[atom[1]].call(c[i], atom[2]);
			
			ret.push.apply(ret, js.dom.Selector.filter(temp, cur, c[i]));
		}
		
		return _.U(remain && ret.length && js.dom.Selector.queryAll(remain, ret) || ret);
	},
	
	/**
	 * 根据选择器过滤集合元素
	 * @method js.dom.Selector.filter
	 * @static
	 * 
	 * @param {Array} group 要过滤的元素数组
	 * @param {String} selector 选择器
	 * @param {Element} context 上下文对象
	 * 
	 * @return {Array} 返回过滤后的元素数组
	 */
	filter: function (group, selector, context) {
		var _ = js.dom.Selector._;
		var ret = [];
		for (var j = 0, l = group.length; j < l; j++) {
			if (group[j] && js.dom.Selector.match(group[j], selector, context)) {
				ret.push(group[j]);
			}
			
			_.A = '';
		}
		return ret;
	},
	
	/**
	 * 判断一个元素是否匹配一个选择器
	 * @js.dom.Selector.match
	 * @static
	 * 
	 * @param {Element} item 要判断的元素
	 * @param {String} selector 选择器
	 * @param {Element} context 上下文对象
	 * 
	 * @return {Boolean}
	 */
	match: function (item, selector, context) {
		var _ = js.dom.Selector._,
			flag = true,
			atom;
			context = context || document;
		if (item.nodeType == 3) {
			flag = false;
		} else {
			while ((atom = _.W.exec(selector))) {
				if (!atom[0] && _.W.lastIndex >= selector.length) {
					break;
				}
				var fn = _.E[atom[1] || ''];
				if (fn && !fn.call(item, atom[2], context)) {
					flag = false;
					break;
				}
			}
			_.W.lastIndex = 0;
		}
		return flag;
	},
	
	/**
	 * @ignore
	 */
	_: {
		//匹配一个单词的正则
		W: /([ >#\.\[\]]|[~\|\^\$\*]?=)?(?:"?([\w\-]*|\*)"?)?/g,
		//匹配开头第一个单词，无标签容错，id快捷
		T: /^([ >]?)((\w*|\*)?(#\w+)?)/,
		//获取阶段的匹配符操作
		G: {
			' ': function (word) {return (this || document).getElementsByTagName(word || '*');},
			'>': function (word) {return this.childNodes;},
			'#': function (word) {return [document.getElementById(word)];}
	//		'@': function (word) {return (document).getElementsByName(word);}
		},
		//所有过滤判断条件
		E:{
			'': function (word) {return this.nodeName == word.toUpperCase();},
	//		'\x20': function (word, pn) {for (var node = this; node && node != pn; ) if ((node = node.parentNode) == pn) return true; return false;},
			'>': function (word, pn) {return this.parentNode == pn && (word == '*' || this.nodeName == word.toUpperCase());},
			'#': function (word) {return this.getAttribute('id') == word;},
			//以name获取的优化，考虑到使用很少，忽略
	//		'@': function (word) {return this.name == word;},
			'.': function (word) {return (' ' + this.className + ' ').indexOf(' ' + word + ' ') >= 0;},
			'[': function (word) {return this.getAttribute(js.dom.Selector._.A = word) !== null;},
			'=': function (word) {return this.getAttribute(js.dom.Selector._.A) == word;},
			'~=': function(word){
				return (' ' + this.getAttribute(js.dom.Selector._.A) + ' ').indexOf(' ' + word + ' ') > -1;
			},
			'^=': function (word) {
				return !this.getAttribute(js.dom.Selector._.A).indexOf(word);
			},
			'$=': function (word) {
				var attr = this.getAttribute(js.dom.Selector._.A);
				return attr.indexOf(word) == attr.length - word.length;
			},
			'*=': function(word){
				return this.getAttribute(js.dom.Selector._.A).indexOf(word) > -1;
			},
			'|=': function(word){
				return !this.getAttribute(js.dom.Selector._.A).indexOf(word + '-');
			}
		},
		//判断条件中元素属性名暂存
		A: '',
		//去重
		U: function (arr) {
			var stamp = '_S' + + new Date + '_' + Math.random(),
				count = 1,
				map = {},
				ret = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				var item = arr[i];
				var tag = item.getAttribute(stamp);
				if (!tag) {
					tag = '' + count++;
					item.setAttribute(stamp, tag);
				}
				if (!map[tag]) {
					ret.push(item);
					map[tag] = 1;
				}
			}
			//IE 不支持删除标记
			for (var i = arr.length - 1; i >= 0; i--) {
				arr[i].removeAttribute(stamp);
			}
			return ret;
		}
	}
};