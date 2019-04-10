/**
 *  颜色 ：黑色 black 红色 red 绿色 green 蓝色 blue 洋红色 Magenta 青色 verdant 白色 white
 */
"use strict";
class Logger {
    constructor() {
        this.fgmap = {
            'black_fg': '\x1b[30m',
            'red_fg': '\x1b[31m',
            'green_fg': '\x1b[32m',
            'yellow_fg': '\x1b[33m',
            'blue_fg': '\x1b[34m',
            'magenta_fg': '\x1b[35m',
            'verdant_fg': '\x1b[36m',
            'white_fg': '\x1b[37m'
        };
        this.bgmap = {
            'black_bg': '\x1b[40m',
            'red_bg': '\x1b[41m',
            'green_bg': '\x1b[42m',
            'yellow_bg': '\x1b[4m',
            'blue_bg': '\x1b[44m',
            'magenta_bg': '\x1b[45m',
            'verdant_bg': '\x1b[46m',
            'white_bg': '\x1b[47m'
        };
        this.othermap = {
            "bold": '\x1b[1m',
            "clear": '\x1b[0m',
            "underline": '\x1b[4m',
            "flicker": '\x1b[5m',
            'translucent': '\x1b[2m',
            'hidden': '\x1b[8m'
        };
    };
    /**
     * 
     * @param {String} output 
     */
    logger(content, format) {
        if (!format) {
            console.log(content + this.othermap["clear"]);
        } else {
            console.log(this.trans(format) + content +this.othermap["clear"])
        }

    }
    trans(format) {
        format = format.split("|");
        let result = [];
        for (let item of format) {
            if (item.indexOf("_fg") > -1) {
                result.push(this.fgmap[item])
            } else if (item.indexOf("_bg") > -1) {
                result.push(this.bgmap[item])
            } else {
                result.push(this.othermap[item])
            }
        }
        return result.join("");
    };
    error(content){
        this.logger(content,'red_fg');
    };
    info(content){
        this.logger(content,'black_fg|white_bg');
    }
};
