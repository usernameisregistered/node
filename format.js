/**
 * 压缩文件的格式化
 * @author liming
 * @version 1.0.0
 * @desc 下一个版本对解压缩函数进行优化包括=(){}等特殊符号旁边的空格
 */
(function (exports) {
    const os = require("os")
    "use strict";
    /**
     * @desc 解析对象 
     * @param { string } data 
     * @param { object } option keys[delMComment,delSComment,addSemicolon,compress]
     */
    function BackAnalyze(data, option) {
        if(!data && typeof data !== 'string'){
            throw new Error('Cannot Analyze null and non-string')
        }
        this.curBig = 0; // 当前匹配大括号的个数
        this.leftBigPos = 0; // 当前左大括号的位置
        this.isfirstLeftBig = true; //前一个左大括号的位置
        this.rightBigPos = 0; // 当前右大括号的位置
        this.curLeftMiddle = 0; // 当前的左中括号的个数
        this.curRightMiddle = 0; // 当前的右中括号的个数
        this.data = data;
        this.output = ''; // 输出内容
        this.option = Object.assign({delMComment:true,delSComment:true,addSemicolon:false,compress:true}, option || {})
    }
    /**
     * 还原大括号
     */
    BackAnalyze.prototype.backBig = function () {
        this.leftBigPos = this.data.indexOf("{");
        if(this.leftBigPos > -1 && this.data.indexOf("}") > this.leftBigPos){
            this.curBig++;
            this.output = this.output + this.data.slice(0,this.leftBigPos + 1) + os.EOL + this.repeatString("\t",this.curBig);
            this.data = this.data.slice(this.leftBigPos + 1);
        }

        /** 当前仅当在一对{} 中间没有其他的{  执行此函数 */
        this.rightBigPos = this.data.indexOf("}");
        if(this.rightBigPos > -1 && this.data.indexOf("{") > this.rightBigPos ){
            --this.curBig;
            this.output = this.output + this.data.slice(0,this.rightBigPos) + os.EOL + this.repeatString("\t",this.curBig) + "}" + os.EOL + this.repeatString("\t",this.curBig);
            this.data = this.data.slice(this.rightBigPos + 1);
        }else if(this.data.indexOf("{") == -1 && this.rightBigPos > -1 ){
            --this.curBig;
            this.output = this.output + this.data.slice(0,this.rightBigPos) + os.EOL + this.repeatString("\t",this.curBig) + "}" + os.EOL + this.repeatString("\t",this.curBig);
            this.data = this.data.slice(this.rightBigPos + 1);
        }
        if(this.data.indexOf("}") > -1){
            this.backBig();
        }else{
            this.output += this.data;
        }
    }

    /**
     * @desc 添加空行在;后面
     */
    BackAnalyze.prototype.addBlankLine = function (string,number) {
       this.output = this.output.replace(/;/g,";" + os.EOL)
    }

    /**
     * @desc 返回重复指定次数的字符串
     * @param {String} string 
     * @param {Number} number 
     * @return {String} str 拼接之后的字符串
     */
    BackAnalyze.prototype.repeatString = function (string,number) {
        let str = "";
        while (number){
            str += string;
            number--
        }
        return str;
    }


    BackAnalyze.prototype.format = function () {
        this.backBig();
        return this.output
    }

    exports.BackAnalyze = BackAnalyze;

}(typeof exports === 'object' && exports || this))
