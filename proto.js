if (!('startsWith' in String.prototype)) {
    String.prototype.startsWith = function (searchString, position) {
        if (position) {
            if (this.indexOf(searchString) == position) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.indexOf(searchString) == 0) {
                return true;
            } else {
                return false;
            }
        }
    }
}

if (!('endsWith' in String.prototype)) {
    String.prototype.endsWith = function (searchString, position) {
        if (position) {
            if (this.lastIndexOf(searchString) == this.length - searchString.length - position) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.lastIndexOf(searchString) == this.length - searchString.length) {
                return true;
            } else {
                return false;
            }
        }
    }
}

if (!('repeat' in String.prototype)) {
    String.prototype.repeat = function (count) {
        if (!count ||/^\D+$/.test(count)) {
            return this.toString();
        } else {
            var result = '';
            while(count--){
                result += this.toString();
            }
            return result
        }
    }
}
if (!('padEnd' in String.prototype)) {
    String.prototype.padEnd = function(targetLength,padString) {
        targetLength = targetLength>>0;  
        padString = String((typeof padString !== 'undefined' ? padString: ''));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length);
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}

if (!('padStart' in String.prototype)) {
    String.prototype.padStart = function(targetLength,padString) {
        targetLength = targetLength>>0
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length);
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

Date.prototype.format = function (format) {
    format = format || "yyyy-MM-dd hh:mm:ss";
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}


