/**
 * js文件压缩
 * @author liming
 * @version 1.0.0
 * @desc 下一个版本对压缩函数进行优化包括=(){}等特殊符号旁边的空格
 */
(function (exports) {
    "use strict";
    /**
     * @desc 解析对象 
     * @param { string } data 
     * @param { object } option 
     * @description 对js文件进行删除注释和删除多余空行以及添加函数末尾的分号以及对文件进行压缩
     */
    function Analyze(data, option) {
        if(!data && typeof data !== 'string'){
            throw new Error('Cannot Analyze null and non-string')
        }
        this.reg_multi_comment = /\s*\/\*[\s\S]*?\*\//gm; //多行注释正则匹配
        this.reg_single_comment = /\s*\/\/[\t \S]*/g;//单行注释正则匹配
        this.reg_blank_line = /(\n|\r\n){1,}/g; //空行正则匹配
        this.end_semicolon = /\s+([^;])\s*}/g;
        this.solidity = /(\n|\r\n|\t| {2,})*/g;
        this.data = data;
        this.option = Object.assign({delMComment:true,delSComment:true,addSemicolon:false,compress:true}, option || {})
    }
    /**
     * 删除多行注释
     */
    Analyze.prototype.delMComment = function () {
        this.data = this.data.replace(this.reg_multi_comment, '');
        return this
    }

    /**
     * 删除单行注释
     */
    Analyze.prototype.delSComment = function () {
        this.data = this.data.replace(this.reg_single_comment, '');
        return this
    }

    /**
     * 删除空白行
     */
    Analyze.prototype.delBLine = function () {
        this.data = this.data.replace(this.reg_blank_line, '').trim();
        return this
    }
    /**
     * 函数末尾没有分号添加;
     */
    Analyze.prototype.addSemicolon = function () {
        this.data = this.data.replace(this.end_semicolon, function (match, p1) { return match.replace(p1, p1 + ';') });
        return this
    }

    /**
     * 压缩文件
     */
    Analyze.prototype.compress = function () {
        this.data = this.data.replace(this.solidity,'');
        return this
    }

    Analyze.prototype.parse = function () {
        if(this.option.delMComment){
            this.delMComment();
        }
        if(this.option.delSComment){
            this.delSComment();
        }
        if(this.option.addSemicolon){
            this.addSemicolon();
        }
        if(this.option.compress){
            this.compress();
        }
        return this.data
    }

    exports.Analyze = Analyze;

}(typeof exports === 'object' && exports || this))
