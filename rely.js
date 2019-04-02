(function (global) {
    if (global.relyjs) {
        return
    }

    var relyjs = global.relyjs = {
        version: "1.0.0"
    }

    function isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]"
        }
    }

    var isObject = isType('Object');
    var isString = isType("String");
    var isArray = Array.isArray || isType("Array");
    var isFunction = isType("Function");
    var isUndefined = isType("Undefined");


    function define(lib, callback) {
        if(isArray(lib) && isFunction(callback)){
            lib.forEach(function (item) {
                request(item)
            });
            doc.onreadystatechange = function(){
                if(doc.readyState === 'complete'){
                    callback();
                }
            }
        }
    }
    /**
     * 
     * @param {object} configData 
     * config :{
     *     base:'./js',
     * }
     */
    var data = relyjs.data = {};

    var cache = relyjs.cache = {};
    relyjs.config = function (configData) {
        for (var key in configData) {
            var currConfig = configData[key];
            var bakConfig = data[key];
            if (bakConfig && isObject(bakConfig)) {
                for (var k in currConfig) {
                    bakConfig[k] = currConfig[k]
                }
            } else {
                if (isArray(bakConfig)) {
                    currConfig = bakConfig.concat(currConfig)
                } else if (key === "base") {
                    if (currConfig.slice(-1) !== "/") {
                        currConfig += "/"
                    }
                    currConfig = addBase(currConfig)
                }
                data[key] = currConfig;
            }
        }
        return relyjs
    }
    function addBase(uri, path) {
        var truePath = '';
        var relativep_path = /^(\.\/|\.\.\/)/
        if (relativep_path.test(uri)) {
            path = path || data.cwd;
            truePath = backPath(uri, path);
        } else {
            truePath = uri;
        }
        return truePath;
    }


    function backPath(childPath, parentPath) {
        var childPathArr = childPath.split("../");
        var backParentSize = childPathArr.length - 1;
        var domain = /^[a-z]{3,5}:\/\/\S*?\//.exec(parentPath)[0] || '';
        parentPath = parentPath.replace(domain, "");
        var parentPathArr = parentPath.split("/");
        if (parentPathArr.length - 1 < backParentSize) {
            throw new Error("path synthesis failed Please check if the parameters are correct");
        }
        var size = parentPathArr.length - 1 - backParentSize;
        return (size ? domain + parentPathArr.slice(0, size).join("/") : domain.slice(0, -1)) + (childPathArr.length != 1 ? '/' + childPathArr[childPathArr.length - 1] : childPathArr[0].slice(1));
    }

    var doc = document;
    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    var baseElement = head.getElementsByTagName("base")[0];
    function request(url, callback, charset, crossorigin) {
        if(cache[backPath(url, data.base)]){
            return;
        }
        var node = doc.createElement("script")
        if (charset) {
            node.charset = charset
        }
        if (!isUndefined(crossorigin)) {
            node.setAttribute("crossorigin", crossorigin)
        }
        node.async = true
        node.src = backPath(url, data.base)
        currentlyAddingScript = node;
        baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);
        cache[node.src] = true;
    }
    relyjs.request = request;

    global.define = relyjs.define = define;
}(this))
