/**
 * @returns {Array}
 * @description 分解质因数 
 */
Number.prototype.decompositionFactor = function(){
    var primeFactor = [];
    var number = this.valueOf();
    for (var i = 2; i <= number; i++) {
        if (number % i == 0) {
            primeFactor.push(i);
            number /= i;
            i = 1;
        }
    }
    return primeFactor;
}
