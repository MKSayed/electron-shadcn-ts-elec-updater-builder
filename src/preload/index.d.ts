import { ElectronAPI } from '@electron-toolkit/preload'
import electronCustomAPI from '../helpers/ipc/electronCustomAPI'

declare global {
  interface Window {
    electron: ElectronAPI
    api: electronCustomAPI
  }
}
