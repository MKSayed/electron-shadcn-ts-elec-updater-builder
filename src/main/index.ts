import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { autoUpdater } from 'electron-updater'
import { addMainProcessEventListeners } from '../helpers/ipc/main-process-listeners-register'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden',
    // autoHideMenuBar: true, // This is not doing anything since I'm using titleBarStyle: 'hidden'.
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      devTools: true,
      sandbox: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Register all main process event listeners
  addMainProcessEventListeners(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.kiosk.app')

  app.on('browser-window-created', (_, window) => {
    // watchWindowShortcuts doing is:
    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R  to prevent reloads in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  // Check for available updates when the app is started.
  autoUpdater.setFeedURL({
    url: 'http://localhost:8080/update/download-update',
    provider: 'generic'
  })
  // Attach authentication token with the update checking request.
  autoUpdater.addAuthHeader(`Bearer ${'Test'}`)
  // Check and download updates when found.
  autoUpdater.checkForUpdates()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

console.log(app.getVersion())

// Add event listener that quits and update the app immediately after a new update was downloaded.
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})
