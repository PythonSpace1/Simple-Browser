const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    savePassword: (credentials) => ipcRenderer.send('save-password', credentials),
});