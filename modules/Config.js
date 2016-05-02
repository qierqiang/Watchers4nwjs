//==============================================================================
//                              【设置】
//==============================================================================
"use strict"
var fs          = require("fs");
var logger      = require("./Logger.js");
var fileName    = "options.json";

function Config() {
    this.userName       = "";
    this.password       = "";
    this.todo_keyword   = "";
    this.todo_interval  = "";
    this.anno_keyword   = "";
    this.anno_interval  = "";
    
    this.load();
}

//加载设置
Config.prototype.load = function () {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            logger.error(err);
        } else {
            var cfg = JSON.parse(data);
            this.userName        = cfg.userName,
            this.password        = cfg.password,
            this.todo_keyword    = cfg.todo_keyword,
            this.todo_interval   = cfg.todo_interval,
            this.anno_keyword    = cfg.anno_keyword,
            this.anno_interval   = cfg.anno_interval
        }
    });
}

//保存设置
Config.prototype.save = function (callback) {
    var cfg = {
        userName        : this.userName,
        password        : this.password,
        todo_keyword    : this.todo_keyword,
        todo_interval   : this.todo_interval,
        anno_keyword    : this.anno_keyword,
        anno_interval   : this.anno_interval
    };
    fs.writeFile(fileName, JSON.stringify(cfg), (err) => {
        if(err)
            logger.error(err);
        else
            callback();
    });
}

Object.defineProperty(global, "cfg", {
    value: new Config(),
    writable: false,
    configurable: false
});