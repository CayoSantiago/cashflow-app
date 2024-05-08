import SettingsButton from './components/SettingsButton'
import PlayerSelect from './components/PlayerSelect'
import ExpensesCard from './components/ExpensesCard'
import BalanceCard from './components/BalanceCard'
import PassiveIncomeCard from './components/PassiveIncomeCard'
import ChildrenCard from './components/ChildrenCard'
import PlayerAssetTabs from './components/PlayerAssetTabs'

const App = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <PlayerSelect />
          <SettingsButton className='ml-auto' />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <BalanceCard />
              <PassiveIncomeCard />
              <ChildrenCard />
            </div>
            <PlayerAssetTabs />
          </div>
          <ExpensesCard />
        </main>
      </div>
    </div>
  )
}

export default App
