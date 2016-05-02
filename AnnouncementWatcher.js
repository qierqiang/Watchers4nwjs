//==============================================================================
//                              【设置】
//==============================================================================
"use strict"
function AnnouncementWatcher() {
    this.fs             = require("fs");
    this.xhr            = require("./modules/xhr.js");
    this.urlToWatch     = "http://www.hfjjzd.gov.cn/zhuzhan/jwgk/";
    this.readListFile   = "annoread.json";
    this.allListFile    = "annos.json";
    this.timerId;
}

//查询页面内容
AnnouncementWatcher.prototype.query = function (ref) {
    if (ref == null){
        ref = this;
    }
    try {
        var data = ref.xhr.get(ref.urlToWatch);
        ref.read(data);
    }
    catch (ex) {
        global.log.error(ex);
    }
}

//读取页面内容
AnnouncementWatcher.prototype.read = function (data) {
    let reg = /<a href="\S+" title="[^"]+" target="_blank">[^<]+<\/a><span>\d{4}-\d{2}-\d{2}<\/span>/g;
    let result;
    let found = [];
    let all = [];

    while ((result = reg.exec(data)) != null) {
        result = result.toString();
        let href = result.substr(9, result.indexOf("\"", 9) - 9);
        let tmp = 18 + href.length;//9+href.length+9
        let title = result.substr(tmp, result.indexOf("\"", tmp) - tmp);
        let item = { title: title, href: href };
        all.push(item);
    }
    
    var reffer = this;
    fs.readFile(this.readListFile, (err, tmp) => {
        let sTmp = "";
        if (!err) sTmp = tmp.toString();
        let words = global.cfg.anno_keyword.toString().split(",");
        words.forEach((w) => {
            all.forEach((a) => {
                if (a.title.indexOf(w) >= 0 && sTmp.indexOf(a.href) < 0) {
                    found.push(a);
                }
            }, this);
        }, this);
        //保存查询结果
        fs.writeFile(reffer.allListFile, JSON.stringify(all), (err) => { if (err) global.log.error(err); });
        //提示关键词
        if (found.length === 0) {
            global.log.success("查询交警公告完成。");
            return;
        }
        let body = "";
        found.forEach((item) => {
            body += `${item.title}\r\n`;
            fs.appendFile(reffer.readListFile, `${JSON.stringify(item)},\r\n`, (err) => { if (err) global.log.error(err); });
        }, this);
        var n = new Notification(`交警公告发现关键词“${global.cfg.anno_keyword}”`, { body: body, icon: "images/trayicon_64.png" });
        n.onclick = function () {
            nw.Window.open("annos.html", { id: "annos" });
            n.cancel();
        };
        global.log.success(`交警公告发现关键词“${global.cfg.anno_keyword}”`);
    });
}

//开始定时查询
AnnouncementWatcher.prototype.start = function () {
    this.stop();
    this.query();
    this.timerId = setInterval(this.query, global.cfg.anno_interval * 60 * 1000, this);
}

//停止定时查询
AnnouncementWatcher.prototype.stop = function () {
    clearInterval(this.timerId);
}

module.exports = AnnouncementWatcher;