### verify 验证码类

> 参数说明
type 验证码类型
1 普通验证码  1 数字 2 字母 3 数字+字母 4 中文 
2 算数验证码  1 加  2 减  3 乘 
3 行为式验证码 1 拖动式  2 点触式（3-5个字)
其他参数
    普通验证码 1  字符长度  2 偏移值  颜色随机  3 干扰素 [无，简易，复杂]
    行为式验证码 1 背景图地址

配置
```
    conifig = {
       width：'',// number 宽度
       height:'',// number 高度
       type:'',// enum 验证码类型
       offset:['',''] // array<number> 偏移值
       otherConfig：{ // obj 其他配置
            size:'', // number  字符长度 默认为4  type=1 有效
            interferon:'',// enum ['none','simple','complex']  干扰素 type=1,2 有效  
            classify:'',// number | string  enum [1,2,3,4]  type=1,2 有效,
            ingoreCase:true, 是否忽略大小写  type=1 有效,
            category:'' //string [canvas,img] 参数不为3 是可选 为3时只能canvas,
            random:0.2 //随机偏移因子
       }  
    }
```

> 注意
汉字编码范围为20112,40869 随机生成的字符我都不认识所以使用指定的汉字字符 目前使用最常用的500个
的一了是我不在人们有来他这上着个地到大里说去子得也和那要下看天时过出小么起你都把好还多没为又可家学只以主会样年想能生同老中从自面前头到它后然走很像见两用她国动进成回什边作对开而已些现山民候经发工向事命给长水几义三声于高正妈手知理眼志点心战二问但身方实吃做叫当住听革打呢真党全才四已所敌之最光产情路分总条白话东席次亲如被花口放儿常西气五第使写军吧文运在果怎定许快明行因别飞外树物活部门无往船望新带队先力完间却站代员机更九您每风级跟笑啊孩万少直意夜比阶连车重便斗马哪化太指变社似士者干石满决百原拿群究各六本思解立河爸村八难早论吗根共让相研今其书坐接应关信觉死步反处记将千找争领或师结块跑谁草越字加脚紧爱等习阵怕月青半火法题建赶位唱海七女任件感准张团屋爷离色脸片科倒睛利世病刚且由送切星晚表够整认响雪流未场该并底深刻平伟忙提确近亮轻讲农古黑告界拉名呀土清阳照办史改历转画造嘴此治北必服雨穿父内识验传业菜爬睡兴

    



