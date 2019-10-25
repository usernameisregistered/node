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
     * 路径合成
     * @param {String} src 
     * @param {String} [basename] 
     * @returns {String} 合成后的路径
     */
    function mergePath(src,basename){
        if(!basename){
            return src
        }else{
            if(!/\/$/.test(basename)){
                basename += "/"
            }

            if(!/^\./.test(src)){
                return  basename + src
            }

            src = /^\.\//.test(src) ? src.slice(2) : src

            while(/\.\./.test(src)){
                src = src.slice(3)
                if(basename == "/"){
                    throw Error("合成路径失败 无法合成路径","请检查参数是否合法")
                }else if(basename === "./"){
                    basename = "../"
                }else{
                    if(/\/\w+\/$/.test(basename)){
                        basename = basename.replace(/\/\w+\/$/,"/")
                    }else {
                        basename = '../' + basename
                    }
                }
            }
            return basename + src
        }
    }
    return mergePath
}))