import { app, BrowserWindow, Menu, ipcMain, Notification, Tray, nativeImage } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 400,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: true,
    },
    icon: path.join(__dirname, '../../public/icon.svg'),
  })

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../renderer/index.html')}`

  mainWindow.loadURL(startUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Create tray icon
  createTray()
}

function createTray() {
  // Create a simple icon for the tray (white circle)
  const icon = nativeImage.createFromDataURL(
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="120" fill="white"/></svg>'
  )

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow?.show() },
    { label: 'Quit', click: () => app.quit() },
  ])

  tray.setContextMenu(contextMenu)
  tray.setTitle('25:00')

  // Listen for timer updates from renderer
  ipcMain.handle('update-tray', (event, timeString: string) => {
    if (tray) {
      tray.setTitle(`⏱ ${timeString}`)
    }
  })

  // Click tray to toggle window
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
        mainWindow.focus()
      }
    }
  })
}

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

// Create menu
const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Pomodoro Timer',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// IPC Handlers
ipcMain.handle('play-sound', () => {
  new Notification({
    title: 'Pomodoro Timer',
    body: 'Time is up!',
  }).show()
})
