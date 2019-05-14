function getData(tpl){
    var data = {};
    data["title"] = 'fasdfasf';
    data["color"] = 'red';
    data["list"] = [
        {title: '标题1', desc: '描述1'},
        {title: '标题2', desc: '描述2'},
        {title: '标题3', desc: '描述3'},
    ]
    var scriptResult = comilerSpecialElement(tpl,"script");
    tpl = scriptResult.tpl;
    var styleResult = comilerSpecialElement(tpl,"style");    
    tpl = revertSpecialElement(tpl,"script",scriptResult.result);
    tpl = revertSpecialElement(tpl,"style",styleResult.result);
    getScriptFragment(tpl,'if',data);
    //document.body.innerHTML = revertContent(tpl,data);
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

function getScriptFragment(tpl,keyword,data){
    var reg = new RegExp("{{\\s*"+keyword+"\\s*(\\S+)\\s*}}([\\s\\S]*?){{\\s*"+keyword+"end\\s*}}");
    console.log(reg)
    var result= reg.exec(tpl);
    if(data[result[1].trim()]){
        console.log(1111)
    }
}

function revertKeyword(tpl){
    var regIf = /{{\s*(if)\s*(\S+)\s*}}/;
    var regEIf = /{{\s*(\S+)\s*(\S+)\s*(\S+)\s*}}/
    var regElse = /{{\s*(\S+)\s*}}/;
    if(regIf.test(tpl)){
        console.log(regIf.exec(tpl))
    }
    // while(regIf.test(tpl)){
    //    
    // }
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
