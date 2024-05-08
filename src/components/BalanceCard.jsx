import { CreditCard, DollarSign, Undo } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'
import { useDispatch } from 'react-redux'
import { undo, updateBalance } from '@/app/dataSlice'
import { useState } from 'react'
import SpendDialog from './SpendDialog'
import { AnimatedCounter } from 'react-animated-counter'
import Tooltip from './Tooltip'

const BalanceCard = () => {

  const { selected, passiveIncome, totalExpenses } = usePlayerData()

  const [openSpendDialog, setOpenSpendDialog] = useState(false)

  const dispatch = useDispatch()

  const cashFlow = (selected?.salary || 0) + passiveIncome - totalExpenses

  return (
    <>
      <Card className="sm:col-span-2 relative">
        <div className="absolute top-2 right-2 flex gap-2">

          <Tooltip content='Undo'>
            <Button variant='ghost' disabled={!selected} onClick={() => dispatch(undo())} className='w-8 h-8 p-0 text-muted-foreground'>
              <Undo className='w-4 h-4' />
            </Button>
          </Tooltip>

          <Tooltip content='Pay Day'>
            <Button variant='ghost' disabled={!selected} onClick={() => dispatch(updateBalance(cashFlow))} className='w-8 h-8 p-0 text-muted-foreground'>
              <DollarSign className='w-4 h-4' />
            </Button>
          </Tooltip>

          <Tooltip content='Payment'>
            <Button variant='ghost' disabled={!selected} onClick={() => setOpenSpendDialog(true)} className='w-8 h-8 p-0 text-muted-foreground'>
              <CreditCard className='w-4 h-4' />
            </Button>
          </Tooltip>

        </div>
        <CardHeader>
          <CardDescription>Balance</CardDescription>
          <CardTitle className="text-4xl flex items-center">
            $<span>
              <AnimatedCounter
                value={selected?.balance || 0}
                fontSize='36px'
                includeDecimals={false}
                includeCommas={true}
              />
            </span>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='flex items-center justify-around py-3 h-[60px]'>
          <div className="grid place-items-center">
            <div className="text-sm font-semibold flex items-center">
              $<span>
                <AnimatedCounter
                  value={selected?.salary || 0}
                  fontSize='14px'
                  includeDecimals={false}
                  includeCommas={true}
                />
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Salary</div>
          </div>
          <Separator orientation='vertical' />
          <div className="grid place-items-center">
            <div className="text-sm font-semibold flex items-center">
              $<span>
                <AnimatedCounter
                  value={(selected?.salary || 0) + passiveIncome}
                  fontSize='14px'
                  includeDecimals={false}
                  includeCommas={true}
                />
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Total Income</div>
          </div>
          <Separator orientation='vertical' />
          <div className="grid place-items-center">
            <div className="text-sm font-semibold flex items-center">
              $<span>
                <AnimatedCounter
                  value={cashFlow}
                  fontSize='14px'
                  includeDecimals={false}
                  includeCommas={true}
                />
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Cash Flow</div>
          </div>
        </CardContent>
      </Card>

      <SpendDialog open={openSpendDialog} onOpenChange={setOpenSpendDialog} />
    </>
  )
}

export default BalanceCard
