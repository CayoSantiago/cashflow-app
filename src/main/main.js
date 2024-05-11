import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.maximize()
  mainWindow.show()

  // Vite dev server URL
  mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
  // mainWindow.loadURL('http://localhost:5173');
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
