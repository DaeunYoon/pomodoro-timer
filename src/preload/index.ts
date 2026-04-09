import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  playSound: () => ipcRenderer.invoke('play-sound'),
  updateTray: (time: string) => ipcRenderer.invoke('update-tray', time),
})
