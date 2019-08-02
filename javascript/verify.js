(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Verify = factory();
    }
}(this, function () {
    /**
     * @author:liming     
     * @version:1.0.0
     * @date:2019-08-02 11:50
     * @descrption 验证码类
     */
    return class Verify{
        version= '1.0.0';
        result = {
            code:'',
            createTime:'',
            answer:'',
        };
        canvas = null;
        context = null;
        config = {
            width:'',
            height:'',
            type:"",
            offset:[],
            pool:'',
            category:'',
            otherConfig:{
                size:'',
                interferon:'',
                classify:'',
                ingoreCase:true,
                random:0.2,
            },
            font:{
                size:'16px',
                family:'sans-serif'
            }
        }
        constructor(config,id){
            this.setOption(config)
            this.setPool();
            this.generateCode();
            this.getReource(id);
            console.log(this)
        }
        /**
         * @description 设置verify的配置
         * @param {obj} config 
         * @returns {void}
         */
        setOption(config){
            for(let item in config){
                if(item != 'otherConfig'){
                    this.config[item] = config[item]
                }else{
                    for(let key in config["otherConfig"]){
                        this.config["otherConfig"][key] = config["otherConfig"][key]
                    }
                }
            }
        }

        /**
         * @description 设置验证码字符的池子
         * @returns {void}
         */
        setPool(){
            if(!this.config.pool){
                switch(String(this.config.type)){
                    case "1":
                        switch(String(this.config.otherConfig.classify)){
                            case "1":
                                this.config.pool = "0123456789";
                                break;
                            case "2":
                                this.config.pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRETUVWXYZ";
                                break;
                            case "3":
                                this.config.pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRETUVWXYZ";
                                break;
                            case "4":
                                this.config.pool = "的一了是我不在人们有来他这上着个地到大里说去子得也和那要下看天时过出小么起你都把好还多没为又可家学只以主会样年想能生同老中从自面前头到它后然走很像见两用她国动进成回什边作对开而已些现山民候经发工向事命给长水几义三声于高正妈手知理眼志点心战二问但身方实吃做叫当住听革打呢真党全才四已所敌之最光产情路分总条白话东席次亲如被花口放儿常西气五第使写军吧文运在果怎定许快明行因别飞外树物活部门无往船望新带队先力完间却站代员机更九您每风级跟笑啊孩万少直意夜比阶连车重便斗马哪化太指变社似士者干石满决百原拿群究各六本思解立河爸村八难早论吗根共让相研今其书坐接应关信觉死步反处记将千找争领或师结块跑谁草越字加脚紧爱等习阵怕月青半火法题建赶位唱海七女任件感准张团屋爷离色脸片科倒睛利世病刚且由送切星晚表够整认响雪流未场该并底深刻平伟忙提确近亮轻讲农古黑告界拉名呀土清阳照办史改历转画造嘴此治北必服雨穿父内识验传业菜爬睡兴"
                                break;
                        }
                        break;
                    case "2":
                        this.config.pool = "0123456789";
                        break;
                    case "3":
                        switch(String(this.config.otherConfig.classify)){
                            case "1":
                                this.config.pool = "的一了是我不在人们有来他这上着个地到大里说去子得也和那要下看天时过出小么起你都把好还多没为又可家学只以主会样年想能生同老中从自面前头到它后然走很像见两用她国动进成回什边作对开而已些现山民候经发工向事命给长水几义三声于高正妈手知理眼志点心战二问但身方实吃做叫当住听革打呢真党全才四已所敌之最光产情路分总条白话东席次亲如被花口放儿常西气五第使写军吧文运在果怎定许快明行因别飞外树物活部门无往船望新带队先力完间却站代员机更九您每风级跟笑啊孩万少直意夜比阶连车重便斗马哪化太指变社似士者干石满决百原拿群究各六本思解立河爸村八难早论吗根共让相研今其书坐接应关信觉死步反处记将千找争领或师结块跑谁草越字加脚紧爱等习阵怕月青半火法题建赶位唱海七女任件感准张团屋爷离色脸片科倒睛利世病刚且由送切星晚表够整认响雪流未场该并底深刻平伟忙提确近亮轻讲农古黑告界拉名呀土清阳照办史改历转画造嘴此治北必服雨穿父内识验传业菜爬睡兴"
                                break;
                            case "2":
                                this.config.pool = "的一了是我不在人们有来他这上着个地到大里说去子得也和那要下看天时过出小么起你都把好还多没为又可家学只以主会样年想能生同老中从自面前头到它后然走很像见两用她国动进成回什边作对开而已些现山民候经发工向事命给长水几义三声于高正妈手知理眼志点心战二问但身方实吃做叫当住听革打呢真党全才四已所敌之最光产情路分总条白话东席次亲如被花口放儿常西气五第使写军吧文运在果怎定许快明行因别飞外树物活部门无往船望新带队先力完间却站代员机更九您每风级跟笑啊孩万少直意夜比阶连车重便斗马哪化太指变社似士者干石满决百原拿群究各六本思解立河爸村八难早论吗根共让相研今其书坐接应关信觉死步反处记将千找争领或师结块跑谁草越字加脚紧爱等习阵怕月青半火法题建赶位唱海七女任件感准张团屋爷离色脸片科倒睛利世病刚且由送切星晚表够整认响雪流未场该并底深刻平伟忙提确近亮轻讲农古黑告界拉名呀土清阳照办史改历转画造嘴此治北必服雨穿父内识验传业菜爬睡兴"
                                break;
                        }
                        break;
                }
            }
        }
        /**
         * @description 生成code
         * @returns {void}
         */
        generateCode(){
            let max = '';
            switch(String(this.config.type)){
                case "1":
                    max = this.config.pool.length-1;
                    this.result.code = '';
                    for(let i= 0; i < this.config.otherConfig.size;i++){
                        this.result.code += this.config.pool[this.generateRandom(0,max)];
                        if(this.config.otherConfig.ingoreCase){
                            this.result.answer = this.result.code.toLowerCase();
                        }else{
                            this.result.answer = this.result.code;
                        }
                    }
                    if(this.config.type = 1 && this.config.otherConfig.classify == 3){
                        if(!/\d{1,3}/.test(this.result.code)){
                            this.generateCode()
                        }
                    }
                    break;
                case "2":
                    max = this.config.pool.length-1;
                    let firstNumber = this.config.pool[this.generateRandom(1,max)];
                    let lastNumber = this.config.pool[this.generateRandom(1,max)];
                    switch(String(this.config.otherConfig.classify)){
                        case "1":
                            this.result.code = `${firstNumber}+${lastNumber}`;
                            this.result.answer = firstNumber * 1 + lastNumber * 1;
                            break; 
                        case "2":
                            this.result.code = `${firstNumber}-${lastNumber}`;
                            this.result.answer = firstNumber * 1 - lastNumber * 1;
                            if(this.result.answer <= 0){
                                this.generateCode();
                            }
                            break;
                        case "3":
                            this.result.code = `${firstNumber}*${lastNumber}`;
                            this.result.answer = firstNumber * lastNumber;
                            break;  
                    }
                    break;
                case "3":
                    break;
            }
            
        }

        /**
         * @description 根据最大值和最小值生成随机一个随机数
         * @param {Number} min
         * @param {Number} max 
         * @returns {Number}
         */
        generateRandom(min,max){
            return String(min + Math.ceil(Math.random() * (max - min) ))
        }
        /**
         * @description 检测参数的有效性
         * @returns {boolean}
         */
        checkOption(){

        }
        /**
         * @description 获取canvas
         * @param {string } id  元素的id
         */
        getReource(id){
            if(id){
                this.canvas = document.getElementById(id);
            }else{
                this.canvas = document.createElement("canvas");
            }
            this.canvas.width = this.config.width;
            this.canvas.height = this.config.height;
            this.context = this.canvas.getContext("2d");
            this.context.strokeRect(0,0,this.config.width,this.config.height)
            this.drawCode();
            this.result.createTime = Date.now();
        }
        /**
         * @description 绘制验证码
         * @returns {void}
         */
        drawCode(){
            let maxWidth = (this.config.width * 1  - this.config.offset[0] * 2 ) / this.config.otherConfig.size ;
            let code = this.result.code.split("");
            this.context.font = this.config.font.size + " " + this.config.font.family;
            this.context.textAlign ="center";
            for(let i = 0; i < code.length ; i++){
                this.context.fillStyle = 'rgb(' + Math.floor(255 * Math.random()) + ',' + Math.floor(255 * Math.random())  + ',' + Math.floor(255 * Math.random())+')';
                let randomDistance = Number(this.config.font.size.slice(0,this.config.font.size.length -2)) * Number(this.config.otherConfig.random) * Number(Math.random() > 0.5 ? 1 : -1); 
                let x_postion = this.config.offset[0] * 1 + i * maxWidth;
                let y_position = this.config.height * 1 - this.config.offset[1] * 1 + randomDistance * 1;
                this.context.fillText(code[i],x_postion,y_position,maxWidth)
            }
            this.context.fillStyle = "black"
            this.context.textAlign ="start";
            this.context.font = "10px sans-serif";
            switch(this.config.otherConfig.interferon){
                case "none":
                    break;
                case "simple": 

                    break;
                case "complex":
                    break;
            }   
        }
        drawinterferon(){
            
        }
        /**
         * @description 重新生成
         */
        reload(){
            this.drawCode();
        }
        /**
         * 校验
         */
        checkout(code){
           let duration = Date.now - this.result.createTime / 1000;
           if(duration < this.config.validity){
                if(code == this.result.answer){
                    return {code:'1001',message:"验证码校验通过"};
                }else{
                    return {code:'1002',message:"验证码校验不通过"};
                }
           }else{
               return {code:'1001',message:"验证码有效期已过，请重新生成"};
           }
        }
        
    }
}))