var fs = require("fs");
var logger = require("./Logger.js");
var cfg = require("./Config.js");
var fileName = "annos.json";

//注册事件
$("#btnClose").click(function () {
    nw.Window.get().close();
});

window.onload = function () {
    //读取保存在本地的内容
    fs.readFile(fileName, (err, data) => {
        $("#contents").html("");
        if (err) {
            logger.error(err);
            $("#contents").html(`<center>${err}</center>`);
        } else {
            var arr = JSON.parse(data);

            cfg.load(function (config) {
                arr.forEach(function (item) {
                    var badge = "";
                    if (item.title.indexOf(config.anno_keyword) >= 0) {
                        badge += `<span class="badge">${config.anno_keyword}</span>`;
                    }
                    $("#contents").append(`<button type="button" class="list-group-item" data-url="http://www.hfjjzd.gov.cn${item.href}">${badge} ${item.title}</button>`);
                }, this);

                $(".list-group-item").click(function () {
                    nw.Shell.openExternal($(this).attr("data-url"));
                });
            });
        }
    });
};