import { Coins, Minus, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import usePlayerData from '@/hooks/usePlayerData'
import { useState } from 'react'
import GoldCoinsDialog from './GoldCoinsDialog'

const GoldCoinButton = () => {

  const { selected } = usePlayerData()

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('Buy')

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={!selected} className="h-7 gap-2 text-sm">
            <Coins className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Gold Coins</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className='grid'>
            Gold Coins
            <div className='flex items-center text-xs font-normal text-muted-foreground'>
              You have:
              <span className="ml-auto">{selected?.coins}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {
            setMode('Buy')
            setOpen(true)
          }}>
            <Plus className='h-4 w-4 mr-2' />
            Buy
          </DropdownMenuItem>
          <DropdownMenuItem disabled={selected?.coins <= 0} onSelect={() => {
            setMode('Sell')
            setOpen(true)
          }}>
            <Minus className='h-4 w-4 mr-2' />
            Sell
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GoldCoinsDialog open={open} onOpenChange={setOpen} mode={mode} />
    </>
  )
}

export default GoldCoinButton
