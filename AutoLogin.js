//==============================================================================
//                           内网自动登录功能
//==============================================================================
// var fs          = require("fs");
// var xhr         = require("./xhr.js");
// var logger      = require("./Logger.js");
var cfg         = require("./Config.js");
// var testUrl     = "http://172.18.18.18/hftpframe/ZHManageMis_HFZTB/Pages/TodayDuty/TodayDuty_Detail.aspx";
var loginUrl    = "http://172.18.18.18/hftpframe/CustomFrame4Bid/login_TP.aspx";
var isLogin     = false;

//登录
exports.login = function (callback) {
    if (isLogin) return;
    cfg.load(function (data) {
        nw.Window.open(loginUrl, { id: "autoLogin" }, function (win) {
            win.window.onload = function () {
                win.window.document.getElementById("txtUserName").value = data.userName;
                win.window.document.getElementById("txtPwd").value = data.password;
                win.window.document.getElementById("Imagebutton1").click();
            };
            win.window.onunload = function () {
                win.close();
                logger.normal("内网自动登录成功。");
                isLogin = true;
                callback();
            };
        });
    });
};

// //执行登录操作
// exports.login = () => {
//     if (isLogin) return true;
//     var html = xhr.get(loginUrl);
//     var data = getFormData(html);
//     cfg.load((config) => {
//         data.txtUserName    = config.userName;
//         data.txtPwd         = config.password;
//         try {
//             xhr.post(loginUrl, JSON.stringify(data));
//             var tmp = xhr.get(testUrl);
//             fs.writeFile("a.html", tmp);
//         } catch(ex) {
//             logger.error(ex);
//         }
//     });
// };

// // 生成post数据
// function getFormData(sHtml) {
//     var __VIEWSTATE         = get__VIEWSTATE(sHtml);
//     var __EVENTVALIDATION   = get__EVENTVALIDATION(sHtml);
//     var txtClientTime       = gettxtClientTime();
//     return {
//         __EVENTTARGET       : "",
//         __EVENTARGUMENT     : "",
//         __VIEWSTATE         : __VIEWSTATE,
//         __EVENTVALIDATION   : __EVENTVALIDATION,
//         txtMessage          : "",
//         usbkeycode          : "",
//         UserMacAddress      : "未知",
//         UserIP              : "未知",
//         UserHostName        : "未知",
//         UserHardID          : "未知",
//         txtClientTime       : txtClientTime
//     };
// }

// function get__VIEWSTATE(sHtml) {
//     var regex = /id="__VIEWSTATE" value="[^"]"/i;
//     var match = regex.exec(sHtml);
//     var value = "";
//     if (match != null) {
//         value = match.toString();
//         value = value.substr(25, value.length -26);
//     }
//     return value;
// }
// function get__EVENTVALIDATION(sHtml) {
//     var regex = /id="__EVENTVALIDATION" value="[^"]"/i;
//     var match = regex.exec(sHtml);
//     var value = "";
//     if (match != null) {
//         value = match.toString();
//         value = value.substr(30, value.length -31);
//     }
//     return value;
// }
// function gettxtClientTime() {
//     var myDate = new Date();
//     var CTime = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
//     return CTime;
// }