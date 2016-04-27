var http = require("http");
var fs = require("fs");
var logger = require("./Logger.js");
var url = "http://www.hfjjzd.gov.cn/zhuzhan/jwgk/";
var readListFile = "annoread.json";
var allListFile = "annos.json";
var timerId;

exports.keyword = "";
exports.interval = 0;

//开始定时查询
exports.start = function () {
    this.stop();
    this.query();
    timerId = setInterval(query, this.interval * 60 * 1000);
};

//停止定时查询
exports.stop = function () {
    clearInterval(timerId);
};

//查询页面内容
exports.query = function () {
    http.get(url, (res) => {
        res.setEncoding('utf8');
        var data = "";
        res.on("data", function (trunk) {
            data += trunk;
        });
        res.on("end", function () {
            read(data);
        });
        res.on("error", function (err) {
            logger.error(err);
        });
    }).on("error", function (err) {
        logger.error(err);
    });
};

//读取页面内容
var read = function (data) {
    var reg = /<a href="\S+" title="[^"]+" target="_blank">[^<]+<\/a><span>\d{4}-\d{2}-\d{2}<\/span>/g;
    var result;
    var found = new Array();
    var all = new Array();

    while ((result = reg.exec(data)) != null) {
        result = result.toString();
        var href = result.substr(9, result.indexOf("\"", 9) - 9);
        var tmp = 18 + href.length;//9+href.length+9
        var title = result.substr(tmp, result.indexOf("\"", tmp) - tmp);
        var item = { title: title, href: href };
        all.push(item);
        if (title.indexOf(this.keyword) >= 0 && !isRead(href))
            found.push(item);
        // var words = this.keyword.toString().split(/,|;/);
        // words.forEach(function (w) {
        //     if (title.indexOf(w) >= 0 && !isRead(href))
        //         found.push(item);
        // }, this);
    }
    //保存查询结果
    fs.writeFile(allListFile, JSON.stringify(all), (err) => {
        logger.error(err);
        return;
    });
    //提示关键词
    if (found.length === 0) {
        logger.success("查询交警支队警务公开信息完成。");
        return;
    }
    var body = "";
    found.forEach(function (item) {
        body += `${item.title}\r\n`;
        fs.appendFile(readListFile, `${JSON.stringify(item)},\r\n`, (err) => {
            logger.error(err);
            return;
        });
    }, this);
    var n = new Notification(`查询交警支队警务公开信息。发现关键词“${this.keyword}”`, { body: body, icon: "images/trayicon_64.png" });
    n.onclick = function () {
        nw.Shell.openExternal(url);
    };
    logger.success(`查询交警支队警务公开信息。发现关键词“${this.keyword}”`);

}

//是否已读
function isRead(href) {
    fs.readFile(readListFile, (err, data) => {
        if (err) {
            logger.error(err);
            return false;
        }
        return data.toString().indexOf(href) >= 0;
    });
}