import { Coins, DollarSign, Home, PlusCircle, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import usePlayerData from '@/hooks/usePlayerData'
import { useState } from 'react'
import AddInvestmentDialog from './AddInvestmentDialog'
import AddRealEstateDialog from './AddRealEstateDialog'
import AddCashFlowDialog from './AddCashFlowDialog'
import GoldCoinsDialog from './GoldCoinsDialog'

const AddAssetButton = () => {

  const { selected } = usePlayerData()

  const [openAddInvestment, setOpenAddInvestment] = useState(false)
  const [openAddRealEstate, setOpenAddRealEstate] = useState(false)
  const [openAddCashFlow, setOpenAddCashFlow] = useState(false)
  const [openGoldCoins, setOpenGoldCoins] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={!selected} className="h-7 gap-2 text-sm">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Add</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpenAddInvestment(true)}>
            <TrendingUp className='w-4 h-4 mr-2' />
            Investment
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenAddRealEstate(true)}>
            <Home className='w-4 h-4 mr-2' />
            Real Estate / Business
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenAddCashFlow(true)}>
            <DollarSign className='w-4 h-4 mr-2' />
            Cash Flow
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setOpenGoldCoins(true)}>
            <Coins className='w-4 h-4 mr-2' />
            Gold Coins
            <span className='ml-auto'>{selected?.coins || 0}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddInvestmentDialog open={openAddInvestment} onOpenChange={setOpenAddInvestment} />
      <AddRealEstateDialog open={openAddRealEstate} onOpenChange={setOpenAddRealEstate} />
      <AddCashFlowDialog open={openAddCashFlow} onOpenChange={setOpenAddCashFlow} />
      <GoldCoinsDialog open={openGoldCoins} onOpenChange={setOpenGoldCoins} />
    </>
  )
}

export default AddAssetButton
