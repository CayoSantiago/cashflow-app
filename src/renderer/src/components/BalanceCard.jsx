import { CreditCard, Divide, DollarSign, Landmark, Scale } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'
import { useDispatch } from 'react-redux'
import { updateBalance } from '@/app/dataSlice'
import { useEffect, useState } from 'react'
import BalanceDialog from './BalanceDialog'
import { AnimatedCounter } from 'react-animated-counter'
import Tooltip from './Tooltip'
import LoanDialog from './LoanDialog'
import BankruptcyDialog from './BankruptcyDialog'
import { SparkAreaChart } from '@tremor/react'

const BalanceCard = () => {

  const { selected, passiveIncome, totalExpenses } = usePlayerData()

  const [openSpendDialog, setOpenSpendDialog] = useState(false)
  const [openLoanDialog, setOpenLoanDialog] = useState(false)
  const [openBankruptcy, setOpenBankruptcy] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => { if (selected?.isBankrupt) setOpenBankruptcy(true) }, [selected?.isBankrupt])

  const cashFlow = (selected?.salary || 0) + passiveIncome - totalExpenses

  const cashFlowDayIncome = (selected?.cashFlowDayIncome || 0) + (selected?.fastTrack?.reduce((acc, i) => acc + i.cashFlow, 0) || 0)

  const balanceHistory = selected?.balanceHistory?.map((v, idx) => ({ idx, value: v })) || []

  return (
    <>
      <Card className="sm:col-span-2 relative">
        {selected?.isOutOfRatRace ? (
          <div className="absolute top-2 right-2 flex gap-2">
            <Tooltip content='Divorce'>
              <Button variant='ghost' onClick={() => dispatch(updateBalance({ amount: (selected?.balance || 0) * -1 }))} className='w-8 h-8 p-0 text-muted-foreground'>
                <Scale className='w-4 h-4' />
              </Button>
            </Tooltip>

            <Tooltip content='Tax Audit / Lawsuit'>
              <Button variant='ghost' onClick={() => dispatch(updateBalance({ amount: (selected?.balance || 0) * -0.5 }))} className='w-8 h-8 p-0 text-muted-foreground'>
                <Divide className='w-4 h-4' />
              </Button>
            </Tooltip>

            <Tooltip content='Pay Day'>
              <Button variant='ghost' onClick={() => dispatch(updateBalance({ amount: cashFlowDayIncome }))} className='w-8 h-8 p-0 text-muted-foreground'>
                <DollarSign className='w-4 h-4' />
              </Button>
            </Tooltip>

            <Tooltip content='Update Balance'>
              <Button variant='ghost' onClick={() => setOpenSpendDialog(true)} className='w-8 h-8 p-0 text-muted-foreground'>
                <CreditCard className='w-4 h-4' />
              </Button>
            </Tooltip>
          </div>
        ) : (
          <div className="absolute top-2 right-2 flex gap-2">
            <Tooltip content='Loan'>
              <Button variant='ghost' disabled={!selected} onClick={() => setOpenLoanDialog(true)} className='w-8 h-8 p-0 text-muted-foreground'>
                <Landmark className='w-4 h-4' />
              </Button>
            </Tooltip>

            <Tooltip content='Pay Day'>
              <Button variant='ghost' disabled={!selected} onClick={() => dispatch(updateBalance({ payDay: true, amount: cashFlow }))} className='w-8 h-8 p-0 text-muted-foreground'>
                <DollarSign className='w-4 h-4' />
              </Button>
            </Tooltip>

            <Tooltip content='Update Balance'>
              <Button variant='ghost' disabled={!selected} onClick={() => setOpenSpendDialog(true)} className='w-8 h-8 p-0 text-muted-foreground'>
                <CreditCard className='w-4 h-4' />
              </Button>
            </Tooltip>
          </div>
        )}
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
            {selected?.balanceHistory?.length > 1 ? (
              <div className="ml-6 flex-grow self-stretch">
                <SparkAreaChart
                  data={balanceHistory}
                  categories={['value']}
                  index='idx'
                  colors={['emerald']}
                  className='w-full h-full'
                />
              </div>
            ) : null}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='flex items-center justify-around py-3 h-[60px]'>
          {selected?.isOutOfRatRace ? (
            <div className="grid place-items-center">
              <div className="text-sm font-semibold flex items-center">
                ${cashFlowDayIncome.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">CASHFLOW Day Income</div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </CardContent>
      </Card>

      <BalanceDialog open={openSpendDialog} onOpenChange={setOpenSpendDialog} />
      <LoanDialog open={openLoanDialog} onOpenChange={setOpenLoanDialog} />
      <BankruptcyDialog open={openBankruptcy} onOpenChange={setOpenBankruptcy} />
    </>
  )
}

export default BalanceCard
