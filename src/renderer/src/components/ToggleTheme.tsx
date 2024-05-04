import { Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function updateDocumentTheme(isDarkMode: boolean) {
  if (!isDarkMode) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}

export default function ToggleTheme() {
  async function toggleTheme() {
    const isDarkMode = await window.api.isDarkMode()
    updateDocumentTheme(isDarkMode)
  }

  return (
    <Button onClick={toggleTheme} size="icon">
      <Moon size={16} />
    </Button>
  )
}
