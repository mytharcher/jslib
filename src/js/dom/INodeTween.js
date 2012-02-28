/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-09-11 by mytharcher
 * 
 * update:
 */

///import js.util.Class;
///import js.dom;
///import js.dom.Node;
///import js.dom.Tween;

/*
 * @class js.dom.INodeStyle
 * Node类实现Tween的接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */

/**
 * 开始动画
 * @method transform
 * @param {Object} options 动画参数
 * 
 * @return {js.dom.Node} 返回自身引用以供链式调用
 */
/**
 * 停止动画
 * @method rest
 * 
 * @return {js.dom.Node} 返回自身引用以供链式调用
 */
js.dom.INodeTween = js.dom.INodeTween || {
	transform: function (options) {
		var transStamp = js.util.Global._STAMP + '_transformer';
		if (!this[transStamp]) {
			this[transStamp] = {};
		}
		
		this.forEach(function (element) {
			var transStamp = js.util.Global._STAMP + '_transformer';
			var transSet = this[transStamp];
			var marker = js.dom.Stage.mark(element);
			if (!transSet[marker]) {
				transSet[marker] = [];
			}
			transSet[marker].push(js.dom.Tween.start(js.util.Class.mix({
				object: element
			}, options)));
		});
		
		return this;
	},
	
	rest: function () {
		this.forEach(function (element) {
			var transStamp = js.util.Global._STAMP + '_transformer';
			var transSet = this[transStamp];
			var marker = js.dom.Stage.mark(element) || [];
			transSet[marker].forEach(js.dom.Tween.stop);
		});
		
		return this;
	},
};

js.util.Class.implement(js.dom.Node, js.dom.INodeTween);