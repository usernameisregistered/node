/**
 * @param {number} m 
 * @param {number} n 
 * @returns {number}
 * @description辗转相除法求最大公约数
 */
Number.gcd = function(m,n){
    if(m == n){
        throw new Error("Please enter two unequal numbers")
    }else{
        var remainder = m % n;
        while(remainder != 0){
            m = n;
            n = remainder;
            remainder = m % n;
        }
        return n
    }
}

/**
 * 
 * @param {number} m 
 * @param {number} n 
 * @returns {number}
 * @description 连续正整数整除法求最大公约数
 */
Number.gcd = function(m,n){
    if(m == n){
        throw new Error("Please enter two unequal numbers")
    }else{
        var min = m > n ? n  : m ;
        while(!((m % min == 0) && (n % min == 0))){
            min--
        }
        return min;
    }
}
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
 * 
 * @param {number} m 
 * @param {number} n 
 * @returns {number}
 * @description 分解质因数求最大公约数
 */
Number.gcd = function () {
    var factors = [];
    for (var value of arguments) {
        factors.push(Number.primeFactor(value))
    }
    /**
     * 统计质因数出现的个数
     */
    var list = [];
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
    /**
     * 获取公共质因数出现的最少次数
     */
    var result = list[0];
    for (var i = 1; i < list.length; i++) {
        for (var item in list[i]) {
            if (result[item] && result[item] > list[i][item]) {
                result[item] = list[i][item]
            } else if (!result[item]) {
                result[item] = list[i][item]
            }
        }
    }
    var commonElement = new Set(factors[0].filter((element) => {
        return factors.slice(1).every(list => {
            return list.indexOf(element) > -1
        })
    }))
    var number = 1;
    commonElement.forEach(element => {
        number = number * Math.pow(element, result[element])
    })
    return number;
}

/**
 * 
 * @param {number} m 
 * @param {number} n 
 * @returns {number}
 * @description 更相减损术求最大公约数
 */
Number.gcd = function (m, n) {
    if (m == n) {
        throw new Error("Please enter two unequal numbers")
    } else {
        var size = 0;
        while (m % 2 == 0 && n % 2 == 0) {
            m = m / 2;
            n = n / 2;
            size++
        }
        if( m < n){
            [m , n] = [n, m]
        }
        var temp = m - n;
        while(temp != 0){
            if( n < temp){
                [m , n] = [temp , n];
            }else{
                [m , n] = [n , temp]; 
            }
            temp = m - n;
        }
        return n * Math.pow(2,size)
    }
}
