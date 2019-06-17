(function (global) {
    var Verify = global.Verify = function () {
        this.version = "1.0.0",
            this.allowClassifys = {
                "0": [1, 2, 3, 4],
                "1": [1, 2, 3],
                "2": [1, 2]
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
            console.log(this.config)
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
            generateCode.apply(this);
            console.log("普通验证码")
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
     * 生成所需要的Code
     */
    function generateCode() {
        var code = null;
        if (this.allowClassifys[this.config.type + ""].indexOf(this.config.classify) > -1) {
            switch (this.config.type) {
                case 1:
                    switch (this.config.type) {
                        case 1:
                            for (var i = 0; i < this.config.size; i++) {
                                code += Math.random().slice(4, 1)
                            }
                            return code;
                        case 2:
                            for (var i = 0; i < this.config.size; i++) {
                                var number = Math.random().toString().slice(4, 6) * 1;
                                code +=  ( number % 16 > 9 ? number % 16 :16 - number ).toString().toLowerCase()
                            }
                            return code;
                            break;
                        case 3:

                            break;
                        case 4:

                            break;
                    }
                    break;
                case 2:
                    switch (this.config.type) {
                        case 1:

                            break;
                        case 2:

                            break;
                        case 3:

                            break;
                    }
                    break;
                case 3:
                    switch (this.config.type) {
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
            console.error("Non-existent authentication code classify, processable value:" + this.allowClassifys[this.config.type + ""].join(","))
        }
    }
})(window)
