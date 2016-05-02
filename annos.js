//==============================================================================
//                              【设置】
//==============================================================================
"use strict"
var fs = require("fs");
var fileName = "annos.json";

//注册事件
$("#btnClose").click(function () {
    nw.Window.get().close();
});

$(window).load(() => {
    //读取保存在本地的内容
    fs.readFile(fileName, (err, data) => {
        $("#contents").html("");
        if (err) {
            global.log.error(err);
            $("#contents").html(`<center>${err}</center>`);
        } else {
            let arr = JSON.parse(data);
            let words = global.cfg.anno_keyword.toString().split(",");
            arr.forEach(function (item) {
                var badge = "";
                words.forEach(function (w) {
                    if (item.title.indexOf(w) >= 0) {
                        badge = `<span class="badge">${w}</span>` + badge;
                    }
                }, this);
                $("#contents").append(`<button type="button" class="list-group-item" data-url="http://www.hfjjzd.gov.cn${item.href}">${badge} ${item.title}</button>`);
            }, this);

            $(".list-group-item").click(function () {
                nw.Shell.openExternal($(this).attr("data-url"));
            });
        }
    });
});