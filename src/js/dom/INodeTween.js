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
		if (!this._transformStartIterator) {
			this._transformStartIterator = this._getTransformStartIterator();
		}
		this.forEach(this._transformStartIterator);
		return this;
	},
	/**
	 * @private
	 */
	_getTransformStartIterator: function (options) {
		var me = this;
		return function (element) {
			var transStamp = js.util.Global._STAMP + '_transformer';
			var transSet = me[transStamp];
			transSet[js.dom.Stage.mark(element)] = js.dom.Tween.start(js.util.Class.mix({
				object: element
			}, options));
		};
	},
	
	rest: function () {
		if (!this._transformStopIterator) {
			this._transformStopIterator = this._getTransformStopIterator();
		}
		this.forEach(this._transformStartIterator);
		return this;
	},
	/**
	 * @private
	 */
	_getTransformStopIterator: function () {
		var me = this;
		return function (element) {
			var transStamp = js.util.Global._STAMP + '_transformer';
			var transSet = me[transStamp];
			var marker = js.dom.Stage.mark(element);
			js.dom.Tween.stop(transSet[marker]);
			delete transSet[marker];
		};
	}
};

js.util.Class.implement(js.dom.Node, js.dom.INodeTween);