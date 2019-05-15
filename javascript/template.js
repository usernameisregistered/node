function getData(tpl){
    var data = {};
    data["title"] = 'fasdfasf';
    data["color"] = 'red';
    var scriptResult = comilerSpecialElement(tpl,"script");
    tpl = scriptResult.tpl;
    var styleResult = comilerSpecialElement(tpl,"style");    
    tpl = revertSpecialElement(tpl,"script",scriptResult.result);
    tpl = revertSpecialElement(tpl,"style",styleResult.result);
    tpl = getScriptFragment(tpl,data);
    document.body.innerHTML = revertContent(tpl,data)
}
getData(document.body.innerHTML);
/**
 * 
 * @param {DocumentFragment} tpl 
 * @param {String} tagname 
 * @returns {object}
 */
function comilerSpecialElement(tpl,tagname){
    var result = {'attr':[],'content':[]};
    var reg = new RegExp("<"+tagname+"([\\s\\S]*?)>([\\s\\S]*?)<\/"+tagname+">",'gi')
    var regResult = null;
    while( regResult = reg.exec(tpl)){
        result.attr.push(regResult[1])
        result.content.push(regResult[2])
    }
    return {'result':result,'tpl':tpl.replace(reg,"<"+tagname+"></"+tagname+">")};
}
/**
 * 
 * @param {DocumentFragment} tpl
 * @param {String} tagname 
 * @param {Ojbect} revertObj
 * @returns {DocumentFragment} 
 */
function revertSpecialElement(tpl,tagname,revertObj){
    for(var i=0,l = revertObj.attr.length; i < l; i++){
        tpl =  tpl.replace("<"+tagname+"></"+tagname+">","<"+tagname+revertObj.attr[i]+">"+revertObj.content[i]+"</"+tagname+">")
    }
    return tpl;
}
/**
 * @description 获取逻辑片段并且替换
 * @param {DocumentFragment} tpl
 * @param {Ojbect} data
 * @returns {DocumentFragment} 
 */
function getScriptFragment(tpl,data){
    var reg =/{{\s*\b([\w]*?)\b\s+([\s\S]*?\s*)}}([\s\S]*?){{/g;
    var reg2 =/{{\s*\b([\w]*?)\b\s+([\s\S]*?\s*)}}([\s\S]*?){{\s*(\/[\w]*?)\s+}}/g;
    var result = null;
    var code = '';
    var fragment = reg2.exec(tpl)[0];
    while(result = reg.exec(tpl)){
        if(data[result[2].trim()] || eval(result[2])){
            code = result[3];
        }
    }
    if(!code){
        var reg1 =/{{\s*\b([\w]*?)\b\s+}}([\s\S]*?){{/g;
        result = reg1.exec(tpl);
        if(result){
            code = result[2]
        }
    }
    return tpl.replace(fragment,code)
    
}

/**
 * 
 * @param {DocumentFragment} tpl
 * @param {Ojbect} data
 * @returns {DocumentFragment} 
 */
function revertContent(tpl,data){
    var tagReg = /{{([\s\S]*?)}}/;
    var result;
    var arr = [];
    while(tagReg.test(tpl)){
        var result = tagReg.exec(tpl);
        tpl = tpl.replace(tagReg,function(match,$1){
            return data[$1.trim()]
        });
    }
    return tpl;
}
