(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.customEvent = factory(root.jQuery);
    }
}(this ,function(){
    /**
     * @description 事件自定义类
     * @author liming
     * @version 1.0.0
     */
    let myEvent = function(){
        this.version = "1.0.0"
        this._listeners = {};
    };
    myEvent.prototype = {
        on: function(type, callback) {
            if (!(type in this._listeners)) {
                this._listeners[type] = [];
            }
            if (typeof callback === "function") {
                this._listeners[type].push(fn);
            }
        },
        trigger: function(type, params) {
            let eventList = this._listeners[type];
            if (eventList instanceof Array) {
                for(let callback of eventList){
                    if (typeof callback === "function") {
                        callback(params);
                    }
                }
            }
        },
        remove: function(type, callback) {
            let eventList = this._listeners[type];
            if (typeof type === "string" && eventList instanceof Array) {
                if (typeof callback === "function") {
                    for(let [key,method] of eventList){
                        if (method.toString() === callback.toString()) {
                            this._listeners[type].splice(key, 1);
                        }
                    }
                } else {
                    this._listeners[type] = [];
                }
            }
        },

        once:function (param) {

        }
    }
    return myEvent
}))