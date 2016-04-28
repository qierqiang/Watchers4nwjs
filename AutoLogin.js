//==============================================================================
//                           内网自动登录功能
//==============================================================================
// var fs = require("fs");
var http = require("http");
var logger = require("./Logger.js");
var cfg = require("./Config.js");
var testUrl = "http://172.18.18.18/hftpframe/ZHManageMis_HFZTB/Pages/TodayDuty/TodayDuty_Detail.aspx";
var loginUrl = "http://172.18.18.18/hftpframe/CustomFrame4Bid/login_TP.aspx";

//登录
exports.login = function (callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                logger.normal(`正在自动登录……`)
                //未登录，跳转登录页执行登录
                cfg.load(function (data) {
                    nw.Window.open(loginUrl, { id: "autoLogin" }, function (win) {//"autoLogin.html"
                        win.window.onload = function () {
                            win.window.document.getElementById("txtUserName").value = data.userName;
                            win.window.document.getElementById("txtPwd").value = data.password;
                            win.window.document.getElementById("Imagebutton1").click();
                        };
                        win.window.onunload = function () {
                            win.close();
                            logger.normal("内网自动登录成功。")
                            callback();
                        };
                    });
                });
            }
            else {
                logger.error(`服务器返回了未知的状态：${res.statusCode}`);
            }
        }
    };
    xhr.open("GET", testUrl, true);
    xhr.send(null);
};