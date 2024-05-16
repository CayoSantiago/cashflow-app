import PlayerSelect from './components/PlayerSelect'
import ExpensesCard from './components/ExpensesCard'
import BalanceCard from './components/BalanceCard'
import PassiveIncomeCard from './components/PassiveIncomeCard'
import ChildrenCard from './components/ChildrenCard'
import PlayerAssetTabs from './components/PlayerAssetTabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Button } from './components/ui/button'
import { RotateCcw, Settings } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { reset } from './app/dataSlice'
import usePlayerData from './hooks/usePlayerData'
import { useEffect, useState } from 'react'
import RatRaceDialog from './components/RatRaceDialog'
import RatRaceStatsCard from './components/RatRaceStatsCard'

const App = () => {

  const { selected, passiveIncome, totalExpenses } = usePlayerData()
  const [openRatRaceDialog, setOpenRatRaceDialog] = useState(false)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (passiveIncome > totalExpenses && selected?.isOutOfRatRace === false) {
      setOpenRatRaceDialog(true)
    }
  }, [passiveIncome, totalExpenses, selected?.isOutOfRatRace, selected?.name])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <PlayerSelect />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={'w-9 h-9 ml-auto'}>
                <Settings className='w-5 h-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onSelect={() => dispatch(reset())}>
                <RotateCcw className='w-4 h-4 mr-2' />
                New Game
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <BalanceCard />
              <PassiveIncomeCard />
              {selected?.isOutOfRatRace ? null : <ChildrenCard />}
            </div>
            <PlayerAssetTabs />
          </div>
          {selected?.isOutOfRatRace ? <RatRaceStatsCard /> : <ExpensesCard />}
        </main>
      </div>

      <RatRaceDialog open={openRatRaceDialog} onOpenChange={setOpenRatRaceDialog} />
    </div>
  )
}

export default App
