/**
 * @description 选择排序
 * @param {Array} arr 
 * @returns {Array}
 */
function selectSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr
}
/**
 * @description 冒泡排序
 * @param {Array} arr 
 * @returns {Array}
 */
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr;
}
/**
 * @description 插入排序
 * @param {Array} arr 
 * @returns {Array}
 */
function insertSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var j = i - 1;
        var temp = arr[i];
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = temp;
    }
    return arr;
}
/**
 * @description 合并(归并)排序
 * @param {Array} arr 
 * @returns {Array}
 */
/**
    var arr = [12, 32, 5, 36, 43, 23, 24];
    console.log(mergeSort(arr))
				[12, 32, 5, 36, 43, 23, 24]

			[12, 32, 5] 	[36, 43, 23, 24]

		[12, 32][5]				[36, 43][23, 24]

	[12][32][5]						[36][43][23][23]

		[12, 32][5]				[36, 43][23, 24]

			[5, 12 ,32]		[23, 24, 36, 43]

				[5, 12 ,23 ,24 ,32 ,36 ,43]
*/
function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var mid = Math.floor(len / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid, len);
    function merge(left, right) {
        var result = [];
        while (left.length > 0 && right.length > 0) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        while (left.length) {
            result.push(left.shift());
        }
        while (right.length) {
            result.push(right.shift());
        }
        return result;
    }
    return merge(mergeSort(left), mergeSort(right));
}

