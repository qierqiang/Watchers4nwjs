var fs = require("fs");
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
$("#btnQueryTest").click(function () {   //查询测试
    // var todo = require("./todo_bg.js");
    // var anno = require("./anno_bg.js");
    // cfg.load(function (data) {
    //     todo.start();
    //     anno.start();
    // });
    
    
    
    
    

    var login = require("./AutoLogin.js");
    login.login();
    
    // var u = "http://172.18.18.18/hftpframe/ZHManageMis_HFZTB/Pages/TodayDuty/TodayDuty_Detail.aspx";

    var x = require("./xhr.js");
    
var _data = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
var _url = "http://172.18.18.18/hftpframe/ZHManageMis_HFZTB/MainPages/TP_Main_OA/TP_Main_OA.aspx/GetMissionContent";

alert(x.post(_url, _data));
    
    
    
    // // var xh = x.xhr;
    // var data = x.get(u);
    // //alert(data);
    // fs.writeFile("a.html", data);

    // xhr.getAsync(u, function (data) { alert(data); });
});
$("#btnLog").click(function () {   //日志
    nw.Window.open("logs.html", { id: "logs", width: 800, height: 600 });
});
$("#btnClose").click(function () {   //关闭
    nw.Window.get().close();
});

//加载设置
function loadConfig() {
    cfg.load(function (data) {
        $("#todo_keyword").val(data.todo_keyword);
        $("#todo_interval").val(data.todo_interval);
        $("#userName").val(data.userName);
        $("#password").val(data.password);
        $("#anno_keyword").val(data.anno_keyword);
        $("#anno_interval").val(data.anno_interval);
    });
}