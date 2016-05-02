"use strict"
var fs = require("fs");
var fileName = "logs.json";

$(window).load(() => { resizeBox(); readLogs(); });

$(window).resize(() => { resizeBox(); });

//监视日志文件
var watcher = fs.watch(fileName, (event, file) => {
    if (event == "change")
        readLogs();
});

//注册事件
$("#btnLogTest").click(() => {    //日志测试
    global.log.normal("日志测试-一般");
    global.log.success("日志测试-成功");
    global.log.error("日志测试-失败");
});
$("#btnClear").click(() => {      //清空日志
    global.log.clearAll();
});
$("#btnOptions").click(() => {      //选项
    nw.Window.open("options.html", { id: "options", height: 580 });
});
$("#btnClose").click(() => {        //关闭
    nw.Window.get().close();
});

function readLogs() {
    global.log.readAll((data) => {
        var html = data.toString();
        //反向排序
        var lines = html.split("\n");
        html = "";
        for (var i = lines.length - 1; i > -1; i--) {
            html += lines[i];
        }
        $("dl").html(html);
    });
}

function resizeBox() {
    $(".panel-body").css("height", `${document.documentElement.clientHeight - 180}`);
    $(".panel-body").css("overflow", "hidden");
    $(".panel-body").css("overflow-y", "scroll");
}