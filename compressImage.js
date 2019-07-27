
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
     * @description 图片压缩 
     * 一 根据指定的大小对图片压缩（不改变图像的宽度修改文件的清晰度） canvas目前仅支持对后缀为jpeg的图片进行压缩
     * 二 根据给定的宽度或者高度裁剪 
     * 三 根据指定的缩放比例进行裁剪 
     * 四 根据指定的缩放比例进行缩放 图片大小可能会变大 比较图片的分辨率
     * 
     * 
     * 图片base64编码后的大小关系为 base64编码后的字节长度除8乘6 大致等于 文件的实际大小位数
     * Base64编码要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，则用0填充，输出字符使用’=’，因此编码后输出的文本末尾可能会出现1或2个’=’ 
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
            suffixList:['image/png','image/webp','image/jpeg'],
                允许转换的图片的格式 不建议修改 Chrome支持“image/webp”类型 压缩后的图片统一后缀为jpeg png格式不支持清晰度压缩
            suffix:'image/jpeg', 默认的图片格式 不建议修改
            type: 1|2|3|4 图片的压缩方式 默认是一
            ohterConfig:{
                width:'', 压缩后的图片宽度 类型为2 参数有效
                height:'',压缩后图片高度 类型为2 参数有效
                offset:['xoffset','yoffset'] 先裁剪后进行其他的图片裁剪的偏移值 类型为2,3 参数有效
                zoomFactor: [zfactor,yfactor] 缩放比例 类型为3,4 参数有效
                compressratee：number > 0 && < 1 压缩比 类型为1 参数有效 
                size:number|string 要压缩的最大字节数 类型为1 参数有效 
            }
        }
    */
    function compressImage(file, config) {
        this.config = {
            unitsList: ['bit', 'kb', 'mb', 'gb'],
            units: 'bit',
            suffixList: ['image/png', 'image/webp','image/jpeg'],
            suffix: 'image/jpeg', 
            type: 4,
            ohterConfig: {
                width: '400',
                height: '400',
                zoomFactor: [0.4,0.4],
                compressratee: 0.92,
                offset:[100,100],
                size: '200kb'
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
        if (this.config.type == 1) {
            this.convSize();
        }
        this.file = file;
        this.reader = new FileReader();
        this.img = new Image();
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.imageData = '';
        this.getImageInfo();
        this.blob = '';
    };
    compressImage.prototype = {
        getImageInfo() {
            this.reader.addEventListener("load", () => {
                this.img.src = this.reader.result;
                this.imageData = this.reader.result;
                this.file.size = this.imageData.length * 6 / 8 ;
                this.img.addEventListener('load', () => {
                    switch(this.config.type + ''){
                        case "1":
                            this.canvas.width = this.config.ohterConfig.width = this.img.naturalWidth;
                            this.canvas.height= this.config.ohterConfig.height = this.img.naturalHeight;
                            break;
                        case "2":
                            this.canvas.width = this.config.ohterConfig.width; 
                            this.canvas.height = this.config.ohterConfig.height;
                            break; 
                        case "3":
                            this.canvas.width = this.config.ohterConfig.width  = (this.img.naturalWidth - this.config.ohterConfig.offset[0] ) * this.config.ohterConfig.zoomFactor[0]; 
                            this.canvas.height = this.config.ohterConfig.height = (this.img.naturalHeight - this.config.ohterConfig.offset[1] ) * this.config.ohterConfig.zoomFactor[1];
                            break; 
                        case "4":
                            this.canvas.width = this.config.ohterConfig.width  = this.img.naturalWidth * this.config.ohterConfig.zoomFactor[0];
                            this.canvas.height = this.config.ohterConfig.height = this.img.naturalHeight * this.config.ohterConfig.zoomFactor[1];

                    }
                    this.drawImage();
                }, {
                    once: true
                })
            },  {
                once: true
            });
            this.reader.readAsDataURL(this.file)
        },
        /**绘制图片*/
        drawImage() {  
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            switch (this.config.type + '') {
                case '1':
                    this.context.drawImage(this.img, 0, 0, this.config.ohterConfig.width, this.config.ohterConfig.height);
                    this.config.ohterConfig.scompressratee = this.file.size > this.config.ohterConfig.size ? this.config.ohterConfig.size / this.file.size : 1;
                    this.imageData = this.canvas.toDataURL(this.config.suffix,this.config.ohterConfig.scompressratee * 1);
                    if(this.config.suffix == "image/png"){
                        console.warn("png格式的图片目前不支持清晰度压缩")
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
                        this.config.ohterConfig.size = size * 1024 * 1024 * 1024;
                        break;
                }
            } else {
                throw new Error("转换单位不被允许")
            }
        },
    }
    return compressImage;
}));