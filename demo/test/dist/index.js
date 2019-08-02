(function (global) {if (global.relyjs) {return}var relyjs = global.relyjs = {version: "1.2.0"}var doc = document;var event = relyjs.event = {};var cache = relyjs.cache = {};var data = relyjs.data = {"filename": 'rely.js','basepath': ''};function getBasePath() {var scripts = document.scripts || document.getElementsByTagName("script");for (var i = 0, l = scripts.length; i < l; i++) {var src = scripts[i].src;cache[src] = true;if (src.indexOf(data['filename']) > -1) {data.basepath = src.slice(0, src.lastIndexOf('/') + 1);}}}getBasePath();function request(url, callback, charset, crossorigin) {if (cache[normalize(url, data.basepath)]) {return;}var node = doc.createElement("script");var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;var baseElement = head.getElementsByTagName("base")[0];if (charset) {node.charset = charset}if (!isType("Undefined",crossorigin)) {node.setAttribute("crossorigin", crossorigin)}node.async = truenode.src = normalize(url, data.basepath)currentlyAddingScript = node;baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);cache[node.src] = true;}relyjs.request = request;var config = relyjs.config = function (configData) {for (var key in configData) {var currConfig = configData[key];var bakConfig = data[key];if (bakConfig && isObject(bakConfig)) {for (var k in currConfig) {bakConfig[k] = currConfig[k]}} else {if (isType("Array",bakConfig)) {currConfig = bakConfig.concat(currConfig)} else if (key === "basepath") {if (currConfig.slice(-1) !== "/") {currConfig += "/"}currConfig = addBase(currConfig)}data[key] = currConfig;}}return relyjs}function isType(type, obj) {return Object.prototype.toString.call(obj) === "[object " + type + "]"}function addBase(path) {if (/^([a-z]{3,5}:\/\/\S*?\/|\/)/.test(path)) {return path;} else {return normalize(name, data.basepath)}}function normalize(name, basePath) {if (isType('String', name) && isType('String', basePath)) {var namepart, backSize = 0, basepart, domain, realSize;switch (name.slice(0, 2)) {case '..':namepart = name.split('../');backSize = namepart.length - 1;breakcase './':if (name.indexOf("../") > -1) {return normalize(name.slice(2), basePath);} else {namepart = name.split('./');}breakdefault:name = data.alias[name]return normalize(name, basePath);}domain = /^[a-z]{3,5}:\/\/\S*?\//.exec(basePath)[0];basePath = basePath.replace(domain, "");basepart = basePath.split("/");realSize = basepart.length - 1 - backSize;if (realSize < 1) {throw new Error("path synthesis failed Please check if the parameters are correct");}return (realSize ? domain + basepart.slice(0, realSize).join("/") : domain.slice(0, -1)) + (namepart.length != 1 ? '/' + namepart[namepart.length - 1] : namepart[0].slice(1));}throw new Error("args [name,basename] Must be a string")}function define(lib, callback) {if(isType('Array',lib) && isType("Function",callback)){lib.forEach(function (item) {request(item)});doc.onreadystatechange = function(){if(doc.readyState === 'complete'){callback();}}}else if(isType('Function',lib) && isType("Undefined",callback)){doc.onreadystatechange = function(){if(doc.readyState === 'complete'){lib();}}}}global.define = relyjs.define = define;}(this))