import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.maximize()
  mainWindow.show()

  // Vite dev server URL
  // mainWindow.loadURL('http://localhost:5173');
  mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
