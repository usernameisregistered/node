
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.compressImage = factory();
    }
}(this, function () {
    /**
     * @description 图片压缩 
     * 一 根据指定的文件大小对图片压缩
     * 二 根据给定的宽度或者高度裁剪 
     * 三 根据指定的缩放比例进行裁剪 
     * 四 根据指定的缩放比例进行缩放 图片大小可能会变大 比较图片的分辨率
     * 
     * 
     * 图片的大小为 宽*高 * 位深  单位为字节
     * @params {File} file 
     * @params {Object} config 
     * @author liming
     * @date 2019-7-27
     * @version 1.0.0
     */
    /*
        config={
            unitsList:['bit', 'kb', 'mb', 'gb'] 允许的文件大小的单位
            units: 'bit', 默认的文件大小单位
            suffixList:['image/png','image/webp','image/jpeg'], 允许转换的图片的格式 不建议修改 Chrome支持“image/webp”类型 压缩后的图片统一后缀为jpeg png格式不支持清晰度压缩
            suffix:'image/jpeg', 默认的图片格式 不建议修改
            type: 1|2|3|4 图片的压缩方式 默认是一
            isConvFile:false 是否转换为blob,
            ohterConfig:{
                width:'', 压缩后的图片宽度 类型为2 参数有效
                height:'',压缩后图片高度 类型为2 参数有效
                offset:['xoffset','yoffset'] 先裁剪后进行其他的图片裁剪的偏移值 类型为2,3 参数有效
                zoomFactor: [zfactor,yfactor] 缩放比例 类型为3,4 参数有效
                compressratee：number > 0 && < 1 压缩比 类型为1 参数有效
                maxCompressratee:0.8 允许最大的压缩比例 当超过一定的比例后对图片的尺寸进行缩放 不建议小于0.8
                size:number|string 要压缩的最大字节数 类型为1 参数有效 
                colorDepth:'',
            },
            complete：function(){ //图片压缩完成以后

            }
        }
    */
    function compressImage(file, config) {
        this.config = {
            unitsList: ['byte', 'kb', 'mb', 'gb'],
            units: 'byte',
            suffixList: ['image/png', 'image/webp','image/jpeg'],
            suffix: 'image/jpeg', 
            type: 1,
            isConvFile:true,
            ohterConfig: {
                width: '400',
                height: '400',
                zoomFactor: [0.4,0.4],
                compressratee:'',
                maxCompressratee:0.92,
                colorDepth:24,
                offset:[100,100],
                size:'400kb'
            },
            complete:function (data,blob) {

            }
        }
        for (let key in config) {
            if (key != 'ohterConfig') {
                this.config[key] = config[key]
            } else {
                for (let item in config['ohterConfig']) {
                    this.config['ohterConfig'][item] = config['ohterConfig'][item]
                }
            }
        }
        this.blob ='',
        this.file = file;
        this.reader = new FileReader();
        this.img = new Image();
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.imageData = '';
        this.getImageInfo();
    };
    compressImage.prototype = {
        getImageInfo(){
            let self = this;
            self.reader.addEventListener("load", () => {
                self.img.src = self.reader.result;
                self.imageData = self.reader.result;
                if (self.config.type == 1) {
                    self.convSize();
                }
                self.img.addEventListener('load', () => {
                    switch(self.config.type + ''){
                        case "1":
                            self.canvas.width = self.config.ohterConfig.width = self.img.naturalWidth;
                            self.canvas.height= self.config.ohterConfig.height = self.img.naturalHeight;
                            break;
                        case "2":
                            self.canvas.width = self.config.ohterConfig.width; 
                            self.canvas.height = self.config.ohterConfig.height;
                            break; 
                        case "3":
                            self.canvas.width = self.config.ohterConfig.width  = (self.img.naturalWidth - self.config.ohterConfig.offset[0] ) * self.config.ohterConfig.zoomFactor[0]; 
                            self.canvas.height = self.config.ohterConfig.height = (self.img.naturalHeight - self.config.ohterConfig.offset[1] ) * self.config.ohterConfig.zoomFactor[1];
                            break; 
                        case "4":
                            self.canvas.width = self.config.ohterConfig.width  = self.img.naturalWidth * self.config.ohterConfig.zoomFactor[0];
                            self.canvas.height = self.config.ohterConfig.height = self.img.naturalHeight * self.config.ohterConfig.zoomFactor[1];

                    }
                    self.drawImage();
                }, {
                    once: true
                })
            },  {
                once: true
            });
            self.reader.readAsDataURL(self.file)
        },
        /**绘制图片*/
        drawImage() {  
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            switch (this.config.type + '') {
                case '1':
                    this.context.drawImage(this.img, 0, 0, this.config.ohterConfig.width, this.config.ohterConfig.height);
                    if(this.config.suffix == "image/png"){
                        console.warn("png格式的图片目前不支持清晰度压缩")
                    }
                    this.config.ohterConfig.compressratee = this.file.size > this.config.ohterConfig.size ? this.config.ohterConfig.size / this.file.size : 1;
                    if(this.config.ohterConfig.compressratee < this.config.ohterConfig.maxCompressratee){
                        console.warn("压缩比例超过当前允许的最大压缩率对图片进行缩放")
                        let ratio = this.img.naturalWidth / this.img.naturalHeight 
                        
                        this.canvas.width = this.config.ohterConfig.width = Math.sqrt(this.config.ohterConfig.size / ratio);
                        this.canvas.height= this.config.ohterConfig.height = this.canvas.width / ratio;
                        this.context.drawImage(this.img,0,0, this.img.naturalWidth, this.img.naturalHeight,0,0,this.canvas.width,this.canvas.height);
                        this.imageData = this.canvas.toDataURL(this.config.suffix,this.config.ohterConfig.maxCompressratee * 1);     
                    }else{
                        this.imageData = this.canvas.toDataURL(this.config.suffix,this.config.ohterConfig.compressratee * 1);      
                    }       
                    break;
                case "2":
                    this.context.drawImage(this.img,this.config.ohterConfig.offset[0],this.config.ohterConfig.offset[1], this.config.ohterConfig.width, this.config.ohterConfig.height,0,0,this.canvas.width,this.canvas.height);
                    this.imageData = this.canvas.toDataURL(this.config.suffix,1);
                    break;
                case '3':
                    this.context.drawImage(this.img, this.config.ohterConfig.offset[0],this.config.ohterConfig.offset[1], this.config.ohterConfig.width, this.config.ohterConfig.height,0,0,this.canvas.width,this.canvas.height);
                    this.imageData = this.canvas.toDataURL(this.config.suffix,1);
                    break;
                case "4":
                    this.context.drawImage(this.img, 0,0, this.img.naturalWidth, this.img.naturalHeight,0,0,this.canvas.width,this.canvas.height);
                    this.imageData = this.canvas.toDataURL(this.config.suffix,1);
                    break;
            }
            if(this.config.isConvFile){
                this.dataURItoBlob(this.imageData,this.blob); 
            }
            this.config.complete(this.imageData,this.blob);         
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
                    case 'byte':
                        this.config.ohterConfig.size = size;
                        break;
                    case 'kb':
                        this.config.ohterConfig.size = size * 1024;
                        break;
                    case 'mb':
                        this.config.ohterConfig.size = size * 1024 * 8;
                        break;
                    case 'gb':
                        this.config.ohterConfig.size = size * 1024 * 1024 * 8;
                        break;
                }
            } else {
                throw new Error("转换单位不被允许")
            }
        },
        dataURItoBlob () {
            let arr = this.imageData.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            this.blob = new File([u8arr], this.file.name, { type: mime });
        },
    }
    return compressImage;
}));