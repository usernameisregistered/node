 * @description 求最小公倍数  两个数的乘积等于这两个数的最大公约数与最小公倍数的积
 * @param {Number} m
 * @param {Number} n 
 * @returns {Number}
 */
Number.mcm = function (m, n) {
    return m * n / Number.gcd(m, n);
}

/**
 * @description 分解质因数
 * @param {Number} num
 * @returns {Array}
 */
Number.primeFactor = function (num) {
    var result = [];
    var i = 2;
    for (i = 2; i <= num; i++) {
        if (num % i == 0) {
            result.push(i);
            num /= i;
            i--;
        }
    }
    return result
}
/**
 * @description 求最小公倍数 分解质因数法
 * @param {Number} m
 * @param {Number} n 
 * @returns {Number}
 */
Number.mcm = function () {
    var factors = [];
    for (var value of arguments) {
        factors.push(Number.primeFactor(value))
    }
    var list = [];
    /**
     * 统计质因数出现的个数
     */
    for (var value of factors) {
        var obj = {};
        for (var item of value) {
            if (obj[item]) {
                obj[item] = obj[item] + 1
            } else {
                obj[item] = 1;
            }
        }
        list.push(obj)
    }
    var result = list[0];
    /**
     * 获取质因数出现的最高次数
     */
    for (var i = 1; i < list.length; i++) {
        for (var item in list[i]) {
            if (result[item] && result[item] < list[i][item]) {
                result[item] = list[i][item]
            } else if (!result[item]) {
                result[item] = list[i][item]
            }
        }
    }
    var number = 1;
    for(var item in result){
        number = number * Math.pow(item,result[item])
    }
    return number;
}
