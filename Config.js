//==============================================================================
//                              【设置存储】
//==============================================================================
var fs = require("fs");
var logger = require("./Logger.js");
var fileName = "options.json";

//保存设置
exports.save = function (todo_keyword, todo_interval, userName, password, anno_keyword, anno_interval, callback) {
    try {
        var cfg = {
            todo_keyword: todo_keyword,
            todo_interval: todo_interval,
            userName: userName,
            password: password,
            anno_keyword: anno_keyword,
            anno_interval: anno_interval
        };
        fs.writeFile(fileName, JSON.stringify(cfg), callback);
    }
    catch (ex) {
        callback(ex);
    }
};

//读取设置
exports.load = function (callback) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            logger.error(err);
        } else {
            callback(JSON.parse(data));
        }
    });
};