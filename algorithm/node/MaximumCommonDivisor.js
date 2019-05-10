/**
 * 
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
/**
 * 
 * @param {number} m 
 * @param {number} n 
 * @returns {number}
 * @description 分解质因数求最大公约数
 */
Number.gcd = function (m, n) {
    if (m == n) {
        throw new Error("Please enter two unequal numbers")
    } else {
        var mPrimeFactor = [], nPrimeFactor = [];
        for (var i = 2; i <= m; i++) {
            if (m % i == 0) {
                mPrimeFactor.push(i);
                m /= i;
                i = i - 1;
            }
        }
        for (var i = 2; i <= n; i++) {
            if (n % i == 0) {
                nPrimeFactor.push(i);
                n /= i;
                i = i - 1;
            }
        }
        if(mPrimeFactor.length < nPrimeFactor.length){
            return  mPrimeFactor.filter(v=>nPrimeFactor.includes(v)).reduce((accumulator, currentValue)=>{
                return accumulator *= currentValue;
            });
        }else{
            return  nPrimeFactor.filter(v=>mPrimeFactor.includes(v)).reduce((accumulator, currentValue)=>{
                return accumulator *= currentValue;
            });
        }        
    }
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
