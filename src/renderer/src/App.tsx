import { type ReactNode } from 'react'
import BaseLayout from './containers/BaseLayout'
import HomePage from './pages/HomePage'

function App(): ReactNode {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  )
}

export default App
