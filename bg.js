//==============================================================================
//                                 全局变量
//==============================================================================
"use strict"
var gui = require('nw.gui');
var app = gui.App;
var fs = require("fs");
var Logger = require("./modules/Logger.js");
var Config = require("./modules/Config.js");

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
//退出菜单
var menuQuit = new nw.MenuItem({
    label: "退出",
    click: function () { app.closeAllWindows(); }
});

var menu = new gui.Menu();
menu.append(menuOptions);
menu.append(menuLog);
menu.append(new nw.MenuItem({ type: "separator", }));
menu.append(menuAnnos);
menu.append(new nw.MenuItem({ type: "separator", }));
menu.append(menuQuit);

tray.menu = menu;

// //==============================================================================
// //                                     监控
// //==============================================================================
// var watcher = fs.watch("options.json", { persistent: true, recursive: false }, function (ev, fileName) {
//     if (ev == "change" && running) {
//         stop();
//         start();
//     }
// });

// var running = false;
// start();

// function start() {
//     //todo.start();
//     anno.start();
//     running = true;
//     global.cfg.normal("监控已启动");
// }

// function stop() {
//     //todo.stop();
//     anno.stop();
//     running = false;
//     global.cfg.normal("监控已停止");
// }