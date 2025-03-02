const { app, BrowserWindow, ipcMain, session } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webviewTag: true,
            preload: __dirname + '/preload.js',
        }
    });

    mainWindow.loadFile('index.html');
});

ipcMain.on('save-password', (event, credentials) => {
    session.defaultSession.cookies.set({
        url: 'electron-browser',
        name: credentials.username,
        value: credentials.password,
        secure: true,
        httpOnly: true
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
