import { Info } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Progress } from './ui/progress'
import usePlayerData from '@/hooks/usePlayerData'
import { AnimatedCounter } from 'react-animated-counter'

const PassiveIncomeCard = () => {

  const { selected, passiveIncome, totalExpenses } = usePlayerData()

  const percentDone = totalExpenses ? Math.floor(Math.min(100, passiveIncome / totalExpenses * 100)) : 0

  return (
    <Card className='relative'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost' disabled={!selected} className='w-4 h-4 p-0 rounded-full text-muted-foreground absolute top-3 right-3 hover:bg-transparent'>
            <Info className='w-4 h-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='right' align='start' className='w-[30ch] px-3 py-1.5 text-sm font-light'>
          Get out of the Rat Race and onto the Fast Track by building up your <strong className='font-semibold'>Passive Income</strong> to be <strong className='font-semibold'>greater</strong> than your <strong className='font-semibold'>Total Expenses</strong>
        </PopoverContent>
      </Popover>
      <CardHeader className='pb-2'>
        <CardDescription>Passive Income</CardDescription>
        <CardTitle className="text-4xl flex items-center">
          $<span>
            <AnimatedCounter
              value={passiveIncome}
              fontSize='36px'
              includeDecimals={false}
              includeCommas={true}
            />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          ~{percentDone}% of expenses
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={percentDone} aria-label="25% increase" />
      </CardFooter>
    </Card>
  )
}

export default PassiveIncomeCard