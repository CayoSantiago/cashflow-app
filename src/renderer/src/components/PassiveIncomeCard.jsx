import { Info } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Progress } from './ui/progress'
import usePlayerData from '@/hooks/usePlayerData'
import { AnimatedCounter } from 'react-animated-counter'
import { cn } from '../lib/utils'

const PassiveIncomeCard = () => {

  const { selected, passiveIncome, totalExpenses } = usePlayerData()

  const fastTrackPassiveIncome = selected?.fastTrack?.reduce((acc, v) => acc + v.cashFlow, 0) || 0

  const percentDone = totalExpenses ? Math.floor(Math.min(100, passiveIncome / totalExpenses * 100)) : 0
  const fastTrackPercentDone = Math.floor(Math.min(100, fastTrackPassiveIncome / 50000 * 100))
  
  const [value, percentValue] = selected?.isOutOfRatRace
    ? [fastTrackPassiveIncome, fastTrackPercentDone]
    : [passiveIncome, percentDone]

  return (
    <Card className={cn('relative transition-colors', selected?.isOutOfRatRace ? 'sm:col-span-2' : '', fastTrackPercentDone === 100 ? 'bg-primary/5' : '')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost' disabled={!selected} className='w-4 h-4 p-0 rounded-full text-muted-foreground absolute top-3 right-3 hover:bg-transparent'>
            <Info className='w-4 h-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='right' align='start' className='w-[30ch] px-3 py-1.5 text-sm font-light'>
          {selected?.isOutOfRatRace
            ? <>You win if you are the first person to accumulate $50,000 in Monthly Cash Flow from businesses purchased on the Fast Track.</>
            : <>Get out of the Rat Race and onto the Fast Track by building up your <strong className='font-semibold'>Passive Income</strong> to be <strong className='font-semibold'>greater</strong> than your <strong className='font-semibold'>Total Expenses</strong></>}
        </PopoverContent>
      </Popover>
      <CardHeader className='pb-2'>
        <CardDescription>{selected?.isOutOfRatRace ? 'Goal Income' : 'Passive Income'}</CardDescription>
        <CardTitle className="text-4xl flex items-center">
          ${selected?.isOutOfRatRace ? ((selected?.cashFlowDayIncome || 0) + 50000).toLocaleString() : (
            <span>
              <AnimatedCounter
                value={value}
                fontSize='36px'
                includeDecimals={false}
                includeCommas={true}
              />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentValue === 100 ? null : '~'}{percentValue}% {selected?.isOutOfRatRace ? 'complete' : 'of expenses'}
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={percentValue} aria-label={`around ${percentValue}% ${selected?.isOutOfRatRace ? 'complete' : 'of expenses'}`} />
      </CardFooter>
    </Card>
  )
}

export default PassiveIncomeCard
