/**
 * @description 求最小公倍数  两个数的乘积等于这两个数的最大公约数与最小公倍数的积
 * @param {Number} m
 * @param {Number} n 
 * @returns {Number}
 */
Number.mcm = function (m, n) {
    return m * n / Number.gcd(m, n);
}
