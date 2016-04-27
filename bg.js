var gui = require('nw.gui');
var app = gui.App;
var fs = require("fs");

//==============================================================================
//                           【托盘】 图标、菜单
//==============================================================================
var tray = new gui.Tray({ "icon": "images/trayIcon_80.png", "tooltip": "提醒" });


//交警公告菜单
var menuAnnos = new nw.MenuItem({
    label: "交警公告",
    click: function () { nw.Window.open("annos.html", { id: "annos", width: 800, height: 600 }); }
});
//选项菜单
var menuOptions = new nw.MenuItem({
    label: "选项",
    click: function () { nw.Window.open("options.html", { id: "options", height: 580 }); }
});
//日志菜单
var menuLog = new nw.MenuItem({
    label: "日志",
    click: function () { nw.Window.open("logs.html", { id: "logs", width: 800, height: 600 }); }
});
//分隔
var menuSeperator = new nw.MenuItem({ type: "separator", });
//退出菜单
var menuQuit = new nw.MenuItem({
    label: "退出",
    click: function () { app.closeAllWindows(); }
});

var menu = new gui.Menu();
menu.append(menuOptions);
menu.append(menuLog);
menu.append(menuSeperator);
menu.append(menuAnnos);
menu.append(menuSeperator);
menu.append(menuQuit);

tray.menu = menu;

//==============================================================================
//                                     监控
//==============================================================================
var cfg = require("./Config.js");
var todo = require("./todo_bg.js");
var anno = require("./anno_bg.js");
var logger = require("./Logger.js");
var login = require("./AutoLogon.js");

var watcher = fs.watch("options.json", { persistent: true, recursive: false }, function (ev, fileName) {
    if (ev == "change" && running) {
        stop();
        start();
    }
});

// login.login();
var running = false;
start();

function start() {
    try {
        cfg.load(function (err, data) {
            if (err) { logger.error(err); }
            else {
                try {
                    todo.keyword = data.todo_keyword;
                    todo.interval = data.todo_interval;
                    anno.keyword = data.anno_keyword;
                    anno.interval = data.anno_interval;
                    todo.start();
                    anno.start();
                    running = true;
                    logger.normal("监控已启动");
                }
                catch (ex) {
                    logger.error(ex);
                }
            }
        });
    }
    catch (ex) {
        logger.error(ex);
    }
}

function stop() {
    try {
        todo.stop();
        anno.stop();
        running = false;
        logger.normal("监控已停止");
    }
    catch (ex) {
        logger.error(ex);
    }
}