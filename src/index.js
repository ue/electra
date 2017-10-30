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
let mainWindow;

let createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 300,
    minHeight: 700,
    width: 400,
    height: 750,
    transparent: true,
    frame: false
   // icon: path.join(path.resolve(app.getAppPath(), './assets/icon.png'))
  })

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

  mainWindow.on('closed', () => {

    mainWindow = null
  });

  // System tray.

  //var tray = new Tray('./app/assets/assignment.png');
  var tray = new Tray(path.resolve(app.getAppPath(), './app/assets/assignment.png'));

  //var tray = new Tray(path.resolve(app.getAppPath(), './assets/icon.png'));


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

app.on('ready', createWindow)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (mainWindow === null) {
    createWindow()
  }
})

