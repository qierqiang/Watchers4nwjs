"use strict"
var logger = require("./Logger.js");
var autoLogin = require("./AutoLogin.js");
var cfg = require("./Config.js");
var _data = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
var _url = "http://172.18.18.18/hftpframe/ZHManageMis_HFZTB/MainPages/TP_Main_OA/TP_Main_OA.aspx/GetMissionContent";
var isLogin = false;
var timerId;
var self = this;
exports.keyword;
exports.interval;

cfg.load(function (data) {
    this.keyword = data.todo_keyword;
    this.interval = parseInt(data.todo_interval);
});

exports.start = function () {
    self.stop();
    if (!isLogin) {
        autoLogin.login(() => {
            isLogin = true;
            self.query();
            timerId = setInterval(self.query, self.interval * 60 * 1000);
        });
    } else {
        self.query();
        timerId = setInterval(self.query, self.interval * 60 * 1000);
    }
};

exports.stop = function () {
    clearInterval(timerId);
};

exports.query = function () {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                logger.error("【失败】查询待办失败！是否还没有登录？");
            }
            else {
                if (xhr.responseText.indexOf(keyword) >= 0) {
                    logger.success("发现待办，发出提醒。", "success");
                    var n = new Notification("待办提醒", {
                        body: keyword,
                        icon: "images/trayicon_64.png"
                    });
                    n.onclick = function () {
                        n.cancel();
                    };
                }
                else {
                    logger.normal("查询待办完成。");
                }
            }
        }
    };
    xhr.open("POST", _url, true);
    xhr.send(_data);
};