(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.compressImage = factory(root.jQuery);
    }
}(this, function () {
    /**
     * @description 图片压缩 一 根据指定的图片大小压缩（不改变图像的宽度修改文件的清晰度） 二 根据给定的宽度或者高度压缩 三 根据指定的缩放比例进行等比缩放
     * @param {File} file 
     * @param {Object} config 
     */
    /*
        config={
            unitsList:['bit', 'kb', 'mb', 'gb'] 允许的文件大小的单位
            units: 'bit', 默认的文件大小单位
            suffixList:['image/png','image/webp'], 允许的图片的格式 不建议修改 其他的图片的格式默认按照image/png 
            suffix:'image/png', 默认的图片格式 不建议修改
            type: 1|2|3 图片的压缩方式 默认是一
            ohterConfig:{
                width:'', 压缩的图片宽度 类型为2 参数有效
                height:'',压缩的图片高度 类型为2 参数有效
                zoomFactor: number 缩放比例 类型为3 参数有效
                compressratee：number > 0 && < 1 压缩比 类型为1 参数有效 
                size:number|string 要压缩的最大字节数 类型为1 参数有效 
            }

        }
    */
    function compressImage(file, config) {
        this.config = {
            unitsList: ['bit', 'kb', 'mb', 'gb'],
            units: 'bit',
            suffixList:['image/png','image/webp'],
            suffix:'image/png',
            type:1,
            ohterConfig:{
                width:'',
                height:'',
                zoomFactor:0.8,
                compressratee:0.92,
                size:'2kb'
            }
        }
        for(let key in config){
           if(key != 'ohterConfig'){
            this.config[key] =  config[key]
           }else{
               for(let item in config['ohterConfig']){
                this.config['ohterConfig'][item] = config['ohterConfig'][item]
               }
           }
        }
        if(this.config.type == 1){
            this.convSize();
        }
        this.file = file;
        this.reader = new FileReader();
        this.img = new Image();
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.imageData = '';
        this.getImageInfo();
        this.blob = '';
    };
    compressImage.prototype = {      
        getImageInfo(){
            this.reader.addEventListener("load",()=>{
                this.img.src = this.reader.result;
                this.imageData = this.reader.result;
                this.img.addEventListener('load',()=>{
                    if(this.config.type == 2 ){
                        this.config.ohterConfig.width = this.config.ohterConfig.width;
                        this.config.ohterConfig.height = this.config.ohterConfig.height;
                    }else if(this.config.type == 3){
                        if(this.config.ohterConfig.zoomFactor){
                            this.config.ohterConfig.width *= this.config.ohterConfig.zoomFactor;
                            this.config.ohterConfig.height *= this.config.ohterConfig.zoomFactor;
                        }else{
                            throw new Error("缺少必要的参数缩放比例：zoomFactor")
                        }
                    } else{
                        this.config.ohterConfig.width = this.img.width;
                        this.config.ohterConfig.height = this.img.height;
                    }
                    this.canvas.width = this.img.width;
                    this.canvas.height =  this.img.height;
                    this.drawImage();
                    if(this.config.type == 1 ){
                        while(this.config.ohterConfig.size * 2 < this.imageData.length){
                            let tempimg = new Image();
                            tempimg.src = this.imageData;
                            img.addEventListener('load',()=>{
                                this.context.drawImage(tempimg,0,0,this.config.ohterConfig.width,this.config.ohterConfig.height);
                                this.imageData = this.canvas.toDataURL(this.config.suffix,this.config.ohterConfig.compressratee); 
                            },{once:true})
                            
                        }
                    }
                },{once:true})
            }, false);
            
            /* 当imageData为undefined时 读取上传的文件否则读取压缩后base64 */
            if(!this.imageData){
                this.reader.readAsDataURL(this.file)
            }
            
        },
        /**绘制图片*/
        drawImage(){
            this.context.drawImage(this.img,0,0,this.config.ohterConfig.width,this.config.ohterConfig.height);
            this.imageData = this.canvas.toDataURL(this.config.suffix,this.config.ohterConfig.compressratee);            
        },

          /**
         * 进制转换将单位全部转化为字节
         */
        convSize() {
            if (/^\d+$/.test(this.config.size)) {
                this.config.size += this.config.units;
            }
            let size = this.config.ohterConfig.size.match(/\d*/)[0];
            let units = this.config.ohterConfig.size.match(/\D*$/)[0];
            if (this.config.unitsList.indexOf(units) > -1) {
                switch (units) {
                    case 'bit':
                        this.config.ohterConfig.size = size;
                        break;
                    case 'kb':
                        this.config.ohterConfig.size = size * 1024;
                        break;
                    case 'mb':
                        this.config.ohterConfig.size = size * 1024 * 1024;
                        break;
                    case 'gb':
                        this.config.ohterConfig.size = size  * 1024 * 1024 * 1024;
                        break; 
                }
            } else {
                throw new Error("转换单位不被允许")
            }
        },
    }
    return compressImage;
}));