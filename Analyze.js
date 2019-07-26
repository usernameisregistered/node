/**
 * js文件压缩
 * @author liming
 * @version 1.0.4
 * @desc 本版本根据导出文件的信息以及要处理的文件的文件信息自动化了流程 下一个版本添加分号函数不正确 重写添加分号函数
 */

 /**
    option = {
        outputdir:'./',
        outputFile:'index.js',
        inputDir:'',
        inputFile:'',
    }

 */
 
(function (exports) {
    const fs = require("fs");
    const path = require("path");
    "use strict";

    /**
     * @desc 解析对象 
     * @param { object } option 
     * @description 对js文件进行删除注释和删除多余空行以及添加函数末尾的分号以及对文件进行压缩
     */
    function Analyze(option) {
        this.option = Object.assign({delMComment:true,delSComment:true,addSemicolon:false,compress:true}, option || {});
        this.reg_multi_comment = /\s*\/\*[\s\S]*?\*\//gm; //多行注释正则匹配
        this.reg_single_comment = /\s*\/\/[.\.]*(?:\r)(\n)$/g;//单行注释正则匹配
        this.reg_blank_line = /(\n|\r\n){1,}/g; //空行正则匹配
        this.end_semicolon = /\s+([^;])\s*}/g; // 添加分号
        this.solidity = /(\n|\r\n|\t| {2,})*/g;  
        this.getInputFile();
        this.createDir();              
    }
    /**
     * 获取要处理的文件
     */
    Analyze.prototype.getInputFile = function(){
        let inputDir = "", inputFile=""; //定义基本路径
        if(path.isAbsolute(this.option.inputDir)){
            inputDir = this.option.inputDir;
        }else{
            inputDir = path.join(__dirname,this.option.inputDir);
        }
        inputFile = path.join(inputDir,this.option.inputFile);
        if(fs.existsSync(inputFile)){
            this.data  = fs.readFileSync(inputFile).toString();
            if(!this.data && typeof this.data !== 'string'){
                throw new Error('Cannot Analyze null and non-string')
            }else{
                this.parse();
            }
           
        }else{
            console.error(`要处理的文件${inputFile}不存在,请检查文件的路径是否正确`);
        }
    }
    /**
     * 创建目录
     */
    Analyze.prototype.createDir = function () {
        let outputDir = ""; //定义基本路径
        if(path.isAbsolute(this.option.outputDir)){
            outputDir = this.option.outputDir;
        }else{
            outputDir = path.join(__dirname,this.option.outputDir);
        }
        if(fs.existsSync(outputDir)){
            console.log(`目录${outputDir}已存在`)
        }else{
            console.log(`目录${outputDir}不存在`);
            fs.mkdirSync(outputDir);
            if(fs.existsSync(outputDir)){
                console.log(`目录${outputDir}创建成功`);
                this.option.outputDir = outputDir;
            }else{
                console.error(`目录${outputDir}创建失败`);
                return; 
            }
        }
        this.createFile();
    }
    /**
     * 创建文件
     */
    Analyze.prototype.createFile = function () {
        this.option.outputFile = path.join(this.option.outputDir,this.option.outputFile);
        if(fs.existsSync(this.option.outputFile)){
            console.log(`文件${this.option.outputFile}已存在,文件将被强制重写`)
        }else{
            console.log(`文件${this.option.outputFile}不存在`);
        }
        let result = fs.writeFileSync(this.option.outputFile, this.data);
        if(!result){
            console.log(`文件${this.option.outputFile}写入成功`); 
        }else{
            throw new Error(result);
        }
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
            console.log("删除多行注释")
            this.delMComment();
        }
        if(this.option.delSComment){
            console.log("删除单行注释")
            this.delSComment();
        }
        if(this.option.addSemicolon){
            console.log("函数末尾添加分号");
            this.addSemicolon();
        }
        if(this.option.compress){
            console.log("文件压缩")
            this.compress();
        }
        return this.data
    }

    exports.Analyze = Analyze;

}(typeof exports === 'object' && exports || this))
