//==============================================================================
//                                【日志存储】
//==============================================================================
"use strict"
var fs = require("fs");
var fileName = "logs.json";

function Logger() { }

//错误
Logger.prototype.error = function (content) { appendLog(now(), content, "text-danger"); };

//一般
Logger.prototype.normal = function (content) { appendLog(now(), content, "text-muted"); };

//成功
Logger.prototype.success = function (content) { appendLog(now(), content, "text-success"); };

//读取所有日志
Logger.prototype.readAll = function (callback) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            alert(err);
        } else {
            callback(data);
        }
    });
};

//清空所有日志
Logger.prototype.clearAll = function (callback) {
    fs.writeFile(fileName, "", callback);
}

//获取当前时间的字串表示
function now() {
    var date = new Date();
    var strData = date.getFullYear() + "-" +
        formatNumber(date.getMonth() + 1) + "-" +
        formatNumber(date.getDate()) + " " +
        formatNumber(date.getHours()) + ":" +
        formatNumber(date.getMinutes()) + ":" +
        formatNumber(date.getSeconds());
    return strData;
}

//数字补齐两位数
function formatNumber(n) {
    return n < 10 ? "0" + "" + n : n;
};

//往文件中追加日志内容
function appendLog(dt, dd, cls) {
    var logContent = "<dt>" + dt + "</dt><dd class=\"" + cls + "\">" + dd + "</dd>\r\n";
    fs.appendFile(fileName, logContent, (err) => { if (err) alert(err); });
};

Object.defineProperty(global, "log", {
    value: new Logger(),
    writable: false,
    configurable: false
});