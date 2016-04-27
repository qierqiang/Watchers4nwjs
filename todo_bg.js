var logger = require("./Logger.js");
var timerId;

exports.keyword = "";
exports.interval = 0;

exports.start = function () {
    stop();
    query();
    timerId = setInterval(query, this.interval * 60 * 1000);
};

exports.stop = function () {
    clearInterval(timerId);
};

function query() {
    var _data = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
    var _url = "http://172.18.18.18/hftpframe/ZHManageMis_HFZTB/MainPages/TP_Main_OA/TP_Main_OA.aspx/GetMissionContent";

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                logger.error("【失败】查询待办失败！是否还没有登录？");
            }
            else {
                if (xhr.responseText.indexOf(this.keyword) >= 0) {
                    logger.success("发现待办，发出提醒。", "success");
                    var n = new Notification("待办提醒", {
                        body: this.keyword,
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








    // $.ajax({
    //     type: "post",
    //     data: _data,
    //     contentType: "application/json;utf-8",
    //     url: _url,
    //     success: function (data) {
    //         var ret = data.d;
    //         var arr = new Array();
    //         $(ret).find("li").each(function (i) { arr[i] = $(this).find("div").eq(1).text(); });
    //         $(arr).each(function (i) {
    //             var tmp = arr[i];
    //             //通知
    //             if (tmp.indexOf(keyword) >= 0) {
    //                 found = true;
    //                 logger.log("发现待办，发出提醒。", "success");
    //                 var title = tmp.slice(tmp.indexOf("【") + 1, tmp.indexOf("】"));
    //                 var msg = tmp.slice(tmp.indexOf("】") + 1);
    //                 var n = new Notification(title, {
    //                     body: msg,
    //                     icon: "images/trayicon_64.png"
    //                 });
    //             }
    //         });
    //         if (!found) {
    //             logger.log("查询待办完成。");
    //         }
    //     }, error: function (e) {
    //         logger.error("【失败】查询待办失败！是否还没有登录？");
    //     }
    // });