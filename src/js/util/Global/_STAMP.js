/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-08-13 By mytharcher
 * 
 * update:
 */

///import js.util.Global.guid;

/**
 * @class js.util.Global
 */
/**
 * 全局唯一标记键名
 * @property
 * @type {String}
 */
js.util.Global._STAMP = js.util.Global.guid('abcdefghijklmnopqrstuvwxyz'.charAt(+new Date % 26) + (+new Date).toString(36).slice(1) + '_');