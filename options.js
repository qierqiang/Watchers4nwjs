var cfg = require("./Config.js");
var fileName = "options.json";

$(function () { loadConfig(); });

//注册事件
$("#btnSave").click(function () {   //保存
    var todo_keyword = $("#todo_keyword").val();
    var todo_interval = $("#todo_interval").val();
    var userName = $("#userName").val();
    var password = $("#password").val();
    var anno_keyword = $("#anno_keyword").val();
    var anno_interval = $("#anno_interval").val();
    cfg.save(todo_keyword, todo_interval, userName, password, anno_keyword, anno_interval, function (err) {
        $('#msgbox').modal("show");
    });
});
$("#btnNotifyTest").click(function () { //通知测试
    var n = new Notification("通知测试", {
        body: "这里显示通知内容。",
        icon: "images/trayicon_64.png"
    });
});
$("#btnLoginTest").click(function () {   //登录测试

});
$("#btnLog").click(function () {   //日志
    nw.Window.open("logs.html", { id: "logs", width: 800, height: 600 });
});
$("#btnClose").click(function () {   //关闭
    nw.Window.get().close();
});

//加载设置
function loadConfig() {
    cfg.load(function (err, data) {
        if (err) {
            alert(err);
        } else {
            $("#todo_keyword").val(data.todo_keyword);
            $("#todo_interval").val(data.todo_interval);
            $("#userName").val(data.userName);
            $("#password").val(data.password);
            $("#anno_keyword").val(data.anno_keyword);
            $("#anno_interval").val(data.anno_interval);
        }
    });
}