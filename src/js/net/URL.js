///import js.util.Class;
///import js.text.Template;
///import js.util.Type;
///import js.net;
///import js.net.URLParameter;



/**
 * @class js.net.URL URL处理类
 */

/**
 * @property protocol 协议
 * @type {String}
 */
/**
 * @property hostname 主机
 * @type {String}
 */
/**
 * @property port 端口
 * @type {Number}
 */
/**
 * @property path 路径
 * @type {String}
 */
/**
 * @property parameter 查询参数
 * @type {String/Object/js.net.URLParameter}
 */
/**
 * @property hash 锚点
 * @type {String}
 */
js.net.URL = js.util.Class.create({
	/**
	 * @cfg {String} protocol 协议
	 */
	/**
	 * @cfg {String} hostname 主机名
	 */
	/**
	 * @cfg {Number} port 端口
	 */
	/**
	 * @cfg {String} path 路径
	 */
	/**
	 * @cfg {String/Object/js.net.URLParameter} parameter 参数
	 */
	/**
	 * @cfg {String} hash 锚点
	 */
	
	/**
	 * 构造函数
	 * @method constructor
	 * 
	 * @param {Object} args
	 */
	constructor: function (args) {
		var args = args || {};
		
		js.util.Class.extend(this, this.constructor.config);
		
		js.util.Class.copy(
			js.util.Type.isString(args) || args === location ?
				this.constructor.parseJSON(args)
				: args,
			this
		);
		
		this.parameter = new js.net.URLParameter(this.parameter);
		
		return this;
	},
	
	/**
	 * 设置协议
	 * @param {String} protocol
	 * 
	 * @return {js.net.URL}
	 */
	setProtocol: function (protocol) {
		this.protocol = protocol;
		return this;
	},
	
	/**
	 * 获取协议部分
	 * @param {Boolean} withSep 是否获取用于分隔协议的“://”部分，默认：false。
	 * 
	 * @return {String} 如果有主机部分，则返回如http://类似的协议部分，否则返回空串。
	 */
	getProtocol: function (withSep) {
		var protocol = '';
		if (this.getHost()) {
			protocol = (this.protocol || this.constructor.PROTOCOL_HTTP) + (withSep ? '://' : '');
		}
		return protocol;
	},
	
	/**
	 * 设置主机名
	 * @param {String} hostname
	 * 
	 * @return {js.net.URL}
	 */
	setHostname: function (hostname) {
		this.hostname = hostname;
		return this;
	},
	
	/**
	 * 获取主机名
	 * @return {String}
	 */
	getHostname: function () {
		return this.hostname;
	},
	
	/**
	 * 设置端口号
	 * @param {String/Number} port
	 * 
	 * @return {js.net.URL} 返回自身引用以供链式调用
	 */
	setPort: function (port) {
		this.port = port;
		return this;
	},
	
	/**
	 * 获取端口号
	 * @param {Boolean} withSep 是否包含端口号的分隔符“:”，默认：false
	 * 
	 * @return {String}
	 */
	getPort: function (withSep) {
		var port = this.port;
		return port && port != this.constructor.DEFAULT_PORT_HTTP ? withSep ? ':' + port : port : '';
	},
	
	/**
	 * 获取主机部分
	 * @return {String} 如果有主机部分，则返回主机+端口部分作为主机返回，如"abc.baidu.com"或"10.81.12.236:8080"
	 */
	getHost: function () {
		var host = '';
		if (this.hostname) {
			host = this.hostname + this.getPort(true);
		}
		
		return host;
	},
	
	/**
	 * 设置URL的路径
	 * @param {String} path
	 * 
	 * @return {js.net.URL} 返回自身引用以供链式调用
	 */
	setPath: function (path) {
		this.path = path;
		return this;
	},
	
	/**
	 * 获取URL的路径部分
	 * @return {String}
	 */
	getPath: function () {
		return this.path;
	},
	
	/**
	 * 设置URL的参数部分，详见：{@link js.net.URLParameter.set}
	 * @param {String/Object} key
	 * @param {String} value
	 * 
	 * @return {js.net.URL} 返回自身实例，以供链式调用
	 */
	setParameter: function (key, value) {
		this.parameter.set(key, value);
		return this;
	},
	
	/**
	 * 获取指定的参数，详见：{@link js.net.URLParameter.get}
	 * @param {String} key
	 * @return {String/Object}
	 */
	getParameter: function (key) {
		return this.parameter.get(key);
	},
	
	/**
	 * 获取URL的参数部分
	 * @param {Function} encoder (optional)编码函数 @see js.net.URLParameter
	 * @return {String}
	 */
	getQuery: function (encoder) {
		var param = this.parameter.toString(encoder);
		return param ? '?' + param : '';
	},
	
	/**
	 * 获取URL的hash部分
	 * @return {String}
	 */
	getHash: function () {
		return this.hash ? '#' + this.hash : '';
	},
	
	/**
	 * 将URL输出为一个字符串
	 * @param {Function} encoder (optional)参数编码函数 @see js.net.URL.getQuery
	 * @return {String}
	 */
	toString: function (encoder) {
		return js.text.Template.format(this.constructor.URL_TEMPLATE, {
			protocol: this.getProtocol(true),
			host: this.getHost(),
			path: this.path,
			param: this.getQuery(encoder),
			hash: this.getHash()
		});
	}
});


js.util.Class.extend(js.net.URL, {
	/**
	 * @constant
	 * @static
	 * @property js.net.URL.DEFAULT_PORT_HTTP http协议默认端口
	 * @type {Number}
	 */
	DEFAULT_PORT_HTTP: 80,
	
	/**
	 * @constant
	 * @static
	 * @property js.net.URL.PROTOCOL_HTTP http协议标识
	 * @type {String}
	 */
	PROTOCOL_HTTP: 'http',
	
	/**
	 * @constant
	 * @static
	 * @property js.net.URL.PROTOCOL_HTTPS https协议标识
	 * @type {String}
	 */
	PROTOCOL_HTTPS: 'https',
	
	/**
	 * @ignore
	 * @constant
	 * 输出模板
	 */
	URL_TEMPLATE: '#{protocol}#{host}#{path}#{param}#{hash}',
	
	/**
	 * @ignore
	 * 默认配置项
	 */
	config: {
		protocol: '',
		hostname: '',
		port: '',
		path: '',
		parameter: '',
		hash: ''
	},
	
	/**
	 * 解析url为JSON格式
	 * @method parseJSON
	 * @static
	 * 
	 * @param {Location/String} u 输入源
	 * 
	 * @return {Object}
	 */
	parseJSON: function (u) {
		var Class = js.util.Class,
			Type = js.util.Type,
			json = Class.copy(this.config);
		if (!u || u == location.href || u === location) {
			var u = location;
			json = Class.copy({
				protocol: u.protocol.replace(':', ''),
				hostname: u.hostname,
				port: u.port,
				path: u.pathname,
				parameter: u.search.slice(1),
				hash: u.hash.slice(1)
			}, json);
		} else if (Type.isObject(u)) {
			Class.copy(u, json);
		} else if (Type.isString(u)) {
			var ret = u;
			var matcher = u.match(/^(([a-z]+):\/\/)((([a-z0-9]+-?)*[a-z0-9]+\.)*([a-z0-9]+-?)*[a-z0-9]+)(\:(\d+))?([\/?#]|$)/i);
			//对于没有协议部分的url，仅认为是一个相对路径
			if (matcher) {
				json.protocol = matcher[2];
				json.hostname = matcher[3];
				json.port = matcher[8] || '';
				ret = u.replace(matcher[0], matcher[9]);
			}
			
			if (ret) {
				var searchStart = ret.indexOf('?');
				var searchEnd = ret.indexOf('#');
				var len = ret.length;
				json.path = ret.substring(0, searchStart >= 0 ? searchStart : searchEnd >= 0 ? searchEnd : len);
				json.parameter = ret.substring(searchStart >= 0 ? searchStart : len, searchEnd >= 0 ? searchEnd : len);
				json.hash = ret.substring(searchEnd >= 0 ? searchEnd : len, len);
			}
		}
		
		return json;
	}
});