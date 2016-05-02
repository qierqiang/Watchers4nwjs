//注册事件
"use strict"
$(window).load(() => {   //加载设置
    $("#userName").val(global.cfg.userName);
    $("#password").val(global.cfg.password);
    $("#todo_keyword").val(global.cfg.todo_keyword);
    $("#todo_interval").val(global.cfg.todo_interval);
    $("#anno_keyword").val(global.cfg.anno_keyword);
    $("#anno_interval").val(global.cfg.anno_interval);
});
$("#btnSave").click(function () {   //保存
    global.cfg.userName         = $("#userName").val();
    global.cfg.password         = $("#password").val();
    global.cfg.todo_keyword     = $("#todo_keyword").val();
    global.cfg.todo_interval    = $("#todo_interval").val();
    global.cfg.anno_keyword     = $("#anno_keyword").val();
    global.cfg.anno_interval    = $("#anno_interval").val();
    global.cfg.save(() => { $('#msgbox').modal("show"); });
});
$("#btnNotifyTest").click(function () { //通知测试
    var n = new Notification("通知测试", {
        body: "这里显示通知内容。",
        icon: "images/trayicon_64.png"
    });
    n.onclick = () => { n.cancel(); };
});
$("#btnQueryTest").click(function () {   //查询测试
    var AnnouncementWatcher = require("./AnnouncementWatcher.js");
    var anno = new AnnouncementWatcher();
    anno.start();
});
$("#btnLog").click(function () {   //日志
    nw.Window.open("logs.html", { id: "logs", width: 800, height: 600 });
});
$("#btnClose").click(function () {   //关闭
    nw.Window.get().close();
});