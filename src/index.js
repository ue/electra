'use strict'
const {
  electron,
  ipcMain,
  app,
  dialog,
  Tray,
  Menu,
  BrowserWindow,
  nativeImage,
  clipboard,
  shell
}                 = require('electron');
const path        = require('path');

let mainWindow;

let createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 750,
    width: 400,
    height: 750,
    transparent: true,
    frame: false,
    icon: path.join(path.resolve(app.getAppPath(), './assets/lo-icon@2x.png'))
  })

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

  mainWindow.on('closed', () => {

    mainWindow = null
  });

  // System tray.
  //Tray with native image also this one fix the "index 0" error but still not shown image

  let image = nativeImage.createFromPath('./app/assets/lo-icon@2x.png')
  let tray = new Tray(image)

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

ipcMain.on('go-to-github', function () {
  shell.openExternal('https://github.com/ue/electra');
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