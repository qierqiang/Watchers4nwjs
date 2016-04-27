//==============================================================================
//                              【日志存储】
//==============================================================================
var fs = require("fs");
var fileName = "logs.json";

//错误
exports.error = function (content) { appendLog(now(), content, "text-danger"); };

//一般
exports.normal = function (content) { appendLog(now(), content, "text-muted"); };

//成功
exports.success = function (content) { appendLog(now(), content, "text-success"); };

//获取当前时间的字串表示
var now = function () {
    var date = new Date();
    var strData = date.getFullYear() + "-" +
        formatNumber(date.getMonth()) + "-" +
        formatNumber(date.getDate()) + " " +
        formatNumber(date.getHours()) + ":" +
        formatNumber(date.getMinutes()) + ":" +
        formatNumber(date.getSeconds());
    return strData;
}

//数字补齐两位数
var formatNumber = function (n) {
    if (n < 10)
        return "0" + "" + n;
    else
        return n;
};

//往文件中追加日志内容
var appendLog = function (dt, dd, cls) {
    var logContent = "<dt>" + dt + "</dt><dd class=\"" + cls + "\">" + dd + "</dd>\r\n";
    fs.appendFile(fileName, logContent, (err) => { if (err) logger.error("err"); });
};

//读取所有日志
exports.readAll = function (callback) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            logger.error(err);
        } else {
            try {
                callback(data);
            } catch (ex) {
                logger.error(ex);
            }
        }
    });
};

//清空所有日志
exports.clearAll = function (callback) {
    fs.writeFile(fileName, "", callback);
}