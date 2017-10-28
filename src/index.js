'use strict'
// ELECTRON SIDE 
const electron = require('electron');
// Interprocess communication so that React can communicate with Electron.
const ipcMain = require("electron").ipcMain;
// Module to control application life.
const app = electron.app;
const dialog = electron.dialog;
// Module to control application tray and menu.
const Tray = electron.Tray;
const Menu = electron.Menu;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const {nativeImage} = require('electron');
const path = require('path');
const fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 300,
    minHeight: 700,
    width: 400,
    height: 750,
    transparent: true,
    frame: false,
    //icon: path.join('file://', __dirname, 'assets/electron-logo.png')
  })

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // System tray.
  var tray = new Tray('./app/assets/assignment.png');

  var contextMenu = Menu.buildFromTemplate([
    { label: 'open', click: () => {mainWindow.restore(); mainWindow.show();} },
    { label: 'minimize', click: () => {mainWindow.minimize();} },
    { label: 'close', click: 
      function handleClicked () {
        app.quit();
      }
    }
  ]);

  tray.on('click', function handleClicked () {
    mainWindow.restore();
    mainWindow.show();
  });
  tray.setToolTip('Material Account App');
  tray.setContextMenu(contextMenu);
}

ipcMain.on('close-main-window', function () {
    app.quit();
});

ipcMain.on('minimize', function () {
    mainWindow.minimize();
});

ipcMain.on('export-to-pdf', function () {

  let pdfSavePath = dialog.showSaveDialog({ 
    title: 'Save as PDF File',
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
  });

});

ipcMain.on('go-to-github', function () {
  electron.shell.openExternal('https://github.com/ue/electra');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

