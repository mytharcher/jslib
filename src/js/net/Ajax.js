/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-13 by mytharcher
 * @2011-08-21 by mytharcher
 * 		[m] Change the event handler "onFail" to "onfailure".
 * @2011-09-10 by mytharcher
 * 		[m] Change JSON parser from anonymouse function to native JSON.parse().
 * 		[m] Change JSON parse exception caught by alert to a interface function onjsonerror.
 * @2011-12-23 by mytharcher
 * 		[m] Change all events handler name to lower case.
 */

///import js.util.Class;
///import js.util.Global.noop;
///import js.client.Features.~json;
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
	 * @cfg {Boolean} blockDuplicate 是否阻止同一个实例上重复的请求，默认：false
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
	 * @cfg {Function} onsuccess 当使用默认onreadystatechange事件(readyState==4&&200<=status<300)加载成功时的处理，下同
	 */
	/**
	 * @cfg {Function} onfailure 当使用默认事件加载失败时的处理
	 */
	/**
	 * @cfg {Function} oncomplete 当使用默认事件加载结束时的处理
	 */
	/**
	 * @cfg {Function} onduplicate 当同一个实例上的请求重复时的处理
	 */
	/**
	 * @cfg {Function} onjsonerror 当解析JSON失败时的处理
	 */
	/**
	 * @cfg {Function} onreadystatechange 处理请求onreadystatechange事件的函数，默认配置(readyState==4&&200<=status<300)
	 */
	
	/**
	 * 构造函数
	 * @param {Object} args 参数集，默认使用js.net.Ajax.option中的内容
	 */
	constructor: function (args) {
		var option = this.constructor.option;
		
		js.util.Class.mix(this, option);
		js.util.Class.mix(this, args, Object.keys(option));
		
		this.method = this.method.toUpperCase();
		
		this.httpRequest = this.constructor.createRequest();
		
		this._readyStateChangeHander = this.onreadystatechange.bind(this);
		this.httpRequest.onreadystatechange = this._readyStateChangeHander;
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
		var myClass = this.constructor;
		
		var request = this.httpRequest;
		
		if (request.readyState && request.readyState != myClass.STATE_COMPLETE) {
			if (!this.blockDuplicate && this.onduplicate(request) !== false) {
				this.abort();
			} else {
				return;
			}
		}
		
		var url = new js.net.URL(this.url);
		
		var data = new js.net.URLParameter(data);
		
		if (this.noCache) {
			url.setParameter('@', (new Date()).valueOf());
		}
		
		if (this.method == myClass.HTTP_GET) {
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
			request.onreadystatechange = this._readyStateChangeHander;
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
	 * 加载一个Ajax请求
	 * @method js.net.Ajax.load
	 * @static
	 * 
	 * @param {Object} option
	 * 
	 * @return {XMLHttpRequest}
	 */
	load: function (option) {
		var ajax = new this(option);
		ajax.load(option.data);
		return ajax.httpRequest;
	},
	
	/**
	 * 以get方式请求
	 * @method js.net.Ajax.get
	 * @static
	 * 
	 * @param {Object} option
	 * 
	 * @return {XMLHttpRequest}
	 */
	get: function (option) {
		option.method = this.HTTP_GET;
		return this.load(option);
	},
	
	/**
	 * 以post方式请求
	 * @method js.net.Ajax.post
	 * @static
	 * 
	 * @param {Object} option
	 * 
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
	blockDuplicate: false,
	contentType: 'application/x-www-form-urlencoded',
	encoding: 'utf-8',
	responseType: js.net.Ajax.DATA_TYPE_TEXT,
	encoder: encodeURIComponent,
	
	onsuccess: js.util.Global.noop,
	onfailure: js.util.Global.noop,
	onjsonerror: js.util.Global.noop,
	oncomplete: js.util.Global.noop,
	onduplicate: js.util.Global.noop,
	
	onreadystatechange: function(){
		var me = this.constructor;
		var request = this.httpRequest;
		if (request.readyState == me.STATE_COMPLETE) {
		
			if (request.status >= 200 && request.status < 300) {
				if (this.onsuccess) {
					var response = request.responseText;
					switch (this.responseType) {
						case me.DATA_TYPE_XML:
							response = request.responseXML;
							break;
							
						case me.DATA_TYPE_JSON:
							var json = response;
							try {
								json = JSON.parse(response);
							} catch (ex) {
								this.onjsonerror(ex, response);
							} finally {
								if (typeof json == 'object') {
									response = json;
								}
							}
							break;
							
						default:
							break;
					}
					this.onsuccess(response, request);
				}
			} else if (this.onfailure) {
				this.onfailure(request);
			}
			
			if (this.oncomplete) {
				this.oncomplete(request);
			}
		}
	}
};