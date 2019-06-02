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
