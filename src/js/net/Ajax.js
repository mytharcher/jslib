/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-13 by mytharcher
 */

///import js.util.Class;
///import js.util.Global;
///import js.util.Type;
///import js.net;
///import js.net.URL;
///import js.net.URLParameter;

/**
 * @class js.net.Ajax 异步加载类
 */
js.net.Ajax = js.net.Ajax || js.util.Class.create({
	/**
	 * @cfg {String} url 发送地址，默认空
	 */
	/**
	 * @cfg {String} method 请求方式，默认：'GET'
	 */
	/**
	 * @cfg {Boolean} async 是否异步，默认：true
	 */
	/**
	 * @cfg {Boolean} noCache 是否无缓存，默认：false
	 */
	/**
	 * @cfg {String} contentType 发送内容类型，默认：'application/x-www-form-urlencoded'
	 */
	/**
	 * @cfg {String} encoding 发送编码，默认：'utf-8'
	 */
	/**
	 * @cfg {String} responseType 返回数据类型，默认：'text'(纯文本)
	 */
	/**
	 * @cfg {Function} encoder 发送数据的编码函数，默认无
	 */
	/**
	 * @cfg {Function} onSuccess 当使用默认onreadystatechange事件(readyState==4&&200<=status<300)加载成功时的处理，下同
	 */
	/**
	 * @cfg {Function} onFail 当使用默认事件加载失败时的处理
	 */
	/**
	 * @cfg {Function} onComplete 当使用默认事件加载结束时的处理
	 */
	/**
	 * @cfg {Function} onreadystatechange 处理请求onreadystatechange事件的函数，默认配置(readyState==4&&200<=status<300)
	 */
	/**
	 * 构造函数
	 * @param {Object} args 参数集，默认使用js.net.Ajax.option中的内容
	 */
	constructor: function (args) {
		var me = this;
		
		var option = this.constructor.option;
		
		js.util.Class.extend(this, option);
		
		var Type = js.util.Type;
		for (var i in option) {
			var argsItem = args[i];
			if (Type.isDefined(argsItem)) {
				if (Type.isNull(argsItem)) {
					this[i] = null;
					delete this[i];
				} else {
					this[i] = args[i];
				}
			}
		}
		
		this.method = this.method.toUpperCase();
		
		this.httpRequest = this.constructor.createRequest();
//		this.data = new js.net.URLParameter(this.data);
		
		this.httpRequest.onreadystatechange = function () {
			me.onreadystatechange();
		};
	},
	
	/**
	 * 获取异步请求的XMLHttpRequest对象
	 * @return {XMLHttpRequest}
	 */
	getHttpRequest: function () {
		return this.httpRequest;
	},
	
	/**
	 * 发送请求
	 * @param {Object/URLParameter} 加载时的参数
	 */
	load: function (data) {
		var request = this.httpRequest;
		var url = new js.net.URL(this.url);
		
		var data = new js.net.URLParameter(data);
		
		if (this.noCache) {
			url.setParameter('@', (new Date()).valueOf());
		}
		
		if (this.method == this.constructor.HTTP_GET) {
			url.setParameter(data.get());
			data = null;
		} else {
			data = data.toString(this.encoder);
		}
		
		request.open(this.method, url.toString(), this.async);
		
		data && request.setRequestHeader("Content-type", this.contentType);
			
		request.send(data);
	},
	
	/**
	 * 取消请求
	 * @method abort
	 */
	abort: function () {
		var request = this.httpRequest
		if (request.readyState != this.constructor.STATE_COMPLETE) {
			request.abort();
		}
	}
});

/**
 * @ignore
 */
js.util.Class.copy({
	/**
	 * @property js.net.Ajax.HTTP_GET HTTP的GET方式
	 * @type {String}
	 */
	HTTP_GET: 'GET',
	/**
	 * @property HTTP_POST HTTP的POST方式
	 * @type {String}
	 */
	HTTP_POST: 'POST',
	
	/**
	 * @property STATE_UNINITIALIZE 请求状态：未初始化
	 * @type {Number}
	 */
	STATE_UNINITIALIZE: 0,
	/**
	 * 请求状态：加载中
	 * @property STATE_LOADING
	 * @type {Number}
	 */
	STATE_LOADING: 1,
	/**
	 * 请求状态：加载完毕
	 * @constant
	 * @property STATE_LOADED
	 * @type {Number}
	 */
	STATE_LOADED: 2,
	/**
	 * 请求状态：加载交互中
	 * @constant
	 * @property STATE_INTERACTIVE
	 * @type {Number}
	 */
	STATE_INTERACTIVE: 3,
	/**
	 * 请求状态：请求结束
	 * @constant
	 * @property STATE_COMPLETE
	 * @type {Number}
	 */
	STATE_COMPLETE: 4,
	
	/**
	 * 数据类型：JSON
	 * @constant
	 * @property DATA_TYPE_JSON
	 * @type {String}
	 */
	DATA_TYPE_JSON: 'json',
	/**
	 * 数据类型：文本
	 * @constant
	 * @property DATA_TYPE_TEXT
	 * @type {String}
	 */
	DATA_TYPE_TEXT: 'text',
	/**
	 * 数据类型：XML
	 * @constant
	 * @property DATA_TYPE_XML
	 * @type {String}
	 */
	DATA_TYPE_XML: 'xml',
	
	/**
	 * 创建异步请求对象
	 * @method js.net.Ajax.createRequest
	 * @static
	 * 
	 * @return {XMLHttpRequest}
	 */
	createRequest: function () {
		return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	},
	
	/**
	 * @method js.net.Ajax.load
	 * @param {Object} option
	 */
	load: function (option) {
		var ajax = new this(option);
		ajax.load(option.data);
		return ajax.httpRequest;
	},
	
	/**
	 * 以get方式请求
	 * @static
	 * @param {Object} option
	 * @return {XMLHttpRequest}
	 */
	get: function (option) {
		option.method = this.HTTP_GET;
		return this.load(option);
	},
	
	/**
	 * 以post方式请求
	 * @static
	 * @param {Object} option
	 * @return {XMLHttpRequest}
	 */
	post: function (option) {
		option.method = this.HTTP_POST;
		return this.load(option);
	}
}, js.net.Ajax);

/**
 * 默认配置参数
 * @constant
 * @property option
 * @type {Object}
 */
js.net.Ajax.option = {
	url: '',
	method: js.net.Ajax.HTTP_GET,
	async: true,
	noCache: false,
	contentType: 'application/x-www-form-urlencoded',
	encoding: 'utf-8',
	responseType: js.net.Ajax.DATA_TYPE_TEXT,
	encoder: encodeURIComponent,
	
	onSuccess: js.util.Global.noop,
	onFail: js.util.Global.noop,
	onComplete: js.util.Global.noop,
	
	onreadystatechange: function(){
		var me = this.constructor;
		var request = this.httpRequest;
		if (request.readyState == me.STATE_COMPLETE) {
		
			if (request.status >= 200 && request.status < 300) {
				if (this.onSuccess) {
					var response = request.responseText;
					switch (this.responseType) {
						case me.DATA_TYPE_XML:
							response = request.responseXML;
							break;
							
						case me.DATA_TYPE_JSON:
							var json = response;
							try {
								json = (new Function('return (' + response + ')'))();
							} catch (ex) {
								alert(ex);
							} finally {
								response = json;
							}
							break;
							
						default:
							break;
					}
					this.onSuccess(response);
				}
			} else if (this.onFail) {
				this.onFail(request);
			}
			
			if (this.onComplete) {
				this.onComplete();
			}
		}
	}
};