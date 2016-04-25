var fs = require("fs");
var log = require("./Logger.js")
var fileName = "logs.json";

readLogs();

//监视日志文件
var watcher = fs.watch(fileName, { persistent: true, recursive: false }, function (ev, fileName) {
    if (ev == "change") {
        readLogs();
    }
});

//注册事件
$("#btnLogTest").click(function () {    //日志测试
    log.normal("日志测试-一般");
    log.success("日志测试-成功");
    log.error("日志测试-失败");
});
$("#btnClear").click(function () {      //清空日志
    log.clearAll((err) => { });
});
$("#btnOptions").click(function () {      //选项
    nw.Window.open("options.html", { id: "options", height: 480 });
});
$("#btnClose").click(function () {        //关闭
    nw.Window.get().close();
});

function readLogs() {
    log.readAll(function (data) {
        $("dl").html(data.toString());
    });
}