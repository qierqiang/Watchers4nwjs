//==============================================================================
//                           内网自动登录功能
//==============================================================================
// var fs = require("fs");
var http = require("http");
var logger = require("./Logger.js");
var cfg = require("./Config.js");
var testUrl = "http://172.18.18.18/hftpframe/EpointMetroNic/FrameAll_Metronic.aspx";
var loginUrl = "http://172.18.18.18/hftpframe/CustomFrame4Bid/login_TP.aspx";

//确保已经登录
exports.ensureLogin = function () {
    http.get(testUrl, (res) => {
        if (res.statusCode == 200) {
            //已登录
            this.ensureLoginComplete();
        }
        else if (res.statusCode.toString()[0] === "3") {
            //未登录，跳转登录页执行登录
            cfg.load(function (err, data) {
                if (err) {
                    logger.error(err);
                }
                else {
                    cfg.load(function (err, data) {
                        if (err) {
                            logger.error(err);
                        } else {
                            nw.Window.open(loginUrl, { id: "autoLogin" }, function (win) {//"autoLogin.html"
                                win.window.onload = function () {
                                    alert("load");
                                    win.window.document.getElementById("txtUserName").value = data.userName;
                                    win.window.document.getElementById("txtPwd").value = ata.password;
                                    win.window.document.getElementById("Imagebutton1").click();
                                };
                                win.window.onunload = function () {
                                    win.close();
                                };
                                win.window.setTimeout(function () {
                                    try {
                                        //var frame = win.window.document.getElementById("frame");
                                        // frame.document.getElementById("txtUserName").value = data.userName;
                                        // frame.document.getElementById("txtPwd").value = data.password;
                                        // frame.document.getElementById("Imagebutton1").click();
                                        win.window.document.getElementById("txtUserName").value = data.userName;
                                        win.window.document.getElementById("txtPwd").value = data.password;
                                        win.window.document.getElementById("Imagebutton1").click();
                                    } catch (ex) {
                                        logger.error(ex);
                                    }
                                }, 500);
                            });
                        }
                    })
                }
            });
        }
        else {
            logger.error(err);
        }
        res.resume();
    }).on("error", function (err) {
        logger.error(err);
    });
};

//当登录检查完成时
exports.ensureLoginComplete = function () { };