import { ipcRenderer } from 'electron'
import {
  WIN_MINIMIZE_CHANNEL,
  WIN_MAXIMIZE_CHANNEL,
  WIN_CLOSE_CHANNEL,
  THEME_TOGGLE
} from './channels'

const electronCustomAPI = {
  minimizeWindow: () => ipcRenderer.invoke(WIN_MINIMIZE_CHANNEL),
  maximizeWindow: () => ipcRenderer.invoke(WIN_MAXIMIZE_CHANNEL),
  closeWindow: () => ipcRenderer.invoke(WIN_CLOSE_CHANNEL),
  isDarkMode: () => ipcRenderer.invoke(THEME_TOGGLE)
}

export default electronCustomAPI
