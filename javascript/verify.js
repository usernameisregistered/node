(function (global) {
    var Verify = global.Verify = function () {
        this.version = "1.0.0";
        this.allowClassifys = {
            "1": [1, 2, 3, 4],
            "2": [1, 2, 3],
            "3": [1, 2]
        }
        this.config = {

        }
    }
    /**
     * type  1 普通验证码  1 数字 2 字母 3 数字+字母 4 中文 
     *       2 算数验证码  1 加减法  2 乘除法  3 随机
     *       3 行为式验证码 1 拖动式  2 点触式（3-5个字)
     * 
     *   普通验证码 1  字符长度  2 偏移值  颜色随机  3 干扰素 [无，简易，复杂]
     *   算数验证码 1 最大值 2 最小值 
     *   行为式验证码 1 背景图地址 
     * 
     * 配置 
     *  widht 宽度
     *  height 长度
     *  offset 偏移值 
     *  type 类型
     *  size 字符个数 
     */


    Verify.prototype = {
        init: function (config) {
            this.config = Object.assign(this.config, config);
            switch (this.config.type) {
                case 1:
                    this.ordinaryVerify();
                    break;
                case 2:
                    this.mathVerify();
                    break;
                case 3:
                    this.actionVerify();
                    break;
                default:
                    console.error("Non-existent authentication code type, processable value:1,2,3")
            }
        },
        ordinaryVerify: function () {
            for(var i = 0 ; i < 20 ; i++){
                console.log("验证码："+generateCode.apply(this));
            }
            
            //console.log("普通验证码")
        },
        mathVerify: function () {
            console.log("算数验证码")
        },
        actionVerify: function () {
            console.log("行为式验证码")
        }
    }
    /**
     * @description 创建画布元素
     * @params width {Number} 画布宽度
     * @param height {Number} 画布高度 
     * @returns {Element}
     */
    function createCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("widht", width);
        canvas.setAttribute("height", height);
        return canvas;
    }
    /**
     * @description 根据最大值和最小值生成随机一个随机数
     * @param {Number} min
     * @param {Number} max 
     * @returns {Number}
     */
    function generateRandom(min,max){
        return String(min + Math.ceil(Math.random() * (max - min) ))
    }

    /**
     * 生成所需要的Code
     */
    function generateCode() {
        var code = '';
        var config = this.config;
        if (this.allowClassifys[config.type + ""].indexOf(config.classify) > -1) {
            switch (config.type) {
                case 1:
                    switch (config.classify) {
                        case 1:
                            for (var i = 0; i < config.size; i++) {
                                code += generateRandom(0,9)
                            }
                            return code;
                        case 2:
                            for (var i = 0; i < config.size; i++) {
                                code += String.fromCharCode(generateRandom(66,90))
                            }
                            return code;
                        case 3:
                            for (var i = 0; i < config.size; i++) {
                                if(Math.random() > 0.5){
                                    code += String.fromCharCode(generateRandom(66,90))
                                }else{
                                    code += generateRandom(0,9)
                                } 
                            }
                            return code;
                        case 4:
                            for (var i = 0; i < config.size -2 ; i++) {
                                code += String.fromCharCode(generateRandom(20112,40869))
                            }
                            return code;
                    }
                case 2:
                    switch (config.type) {
                        case 1:

                            break;
                        case 2:

                            break;
                        case 3:

                            break;
                    }
                    break;
                case 3:
                    switch (config.type) {
                        case 1:

                            break;
                        case 2:

                            break;
                        case 3:

                            break;
                    }
                    break;
            }
        } else {
            console.error("Non-existent authentication code classify, processable value:" + this.allowClassifys[config.type + ""].join(","))
        }
    }
})(window)
