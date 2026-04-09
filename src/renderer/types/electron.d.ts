declare global {
  interface Window {
    electron: {
      playSound: () => Promise<void>
      updateTray: (time: string) => Promise<void>
    }
  }
}

export {}
