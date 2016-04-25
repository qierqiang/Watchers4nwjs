var gui = require('nw.gui');
var app = gui.App;
var fs = require("fs");

//==============================================================================
//                           【托盘】 图标、菜单
//==============================================================================
var tray = new gui.Tray({ "icon": "images/trayIcon_80.png", "tooltip": "提醒" });

//选项菜单
var menuOptions = new nw.MenuItem({
    label: "选项",
    click: function () { nw.Window.open("options.html", { id: "options", height: 480 }); }
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
menu.append(menuQuit);

tray.menu = menu;

// var log = require("Logger");
// log.test();
//log.success("启动成功。");



