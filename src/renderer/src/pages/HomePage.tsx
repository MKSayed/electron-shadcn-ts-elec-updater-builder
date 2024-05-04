import ToggleTheme from '../components/ToggleTheme'

export default function HomePage() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">
          {'Electron with React, Shadcn/ui, Builder, and Updater'}
        </h1>
        <ToggleTheme />
      </div>
    </>
  )
}
