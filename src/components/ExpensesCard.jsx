import { PieChart } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ExpensesCard = () => {
  
  const { selected } = usePlayerData()

  const profession = selected?.profession
  const children = selected?.children || 0

  const generalExpenses = profession?.expenses ? Object.values(profession.expenses).reduce((acc, v) => acc + v, 0) : 0
  const childExpenses = (profession?.perChildExpense || 0) * children

  return (
    <Card className="overflow-hidden relative">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle>Expenses</CardTitle>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant='ghost' disabled={!selected} className='w-8 h-8 p-0 text-muted-foreground'>
                <PieChart className='w-4 h-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Coming soon!</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <div className="font-semibold">General Expenses</div>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Taxes
              </span>
              <span>${profession?.expenses?.taxes || 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Home Mortgage Payment
              </span>
              <span>${profession?.expenses?.home || 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                School Loan Payment
              </span>
              <span>${profession?.expenses?.school || 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Car Loan Payment
              </span>
              <span>${profession?.expenses?.car || 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Credit Card Payment
              </span>
              <span>${profession?.expenses?.creditCard || 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Other Expenses
              </span>
              <span>${profession?.expenses?.other || 0}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <div className="font-semibold">Child Expenses</div>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Children</span>
              <span>{children}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Per Child Expense</span>
              <span>${profession?.perChildExpense || 0}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <div className="font-semibold">Overall</div>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">General Expenses</span>
              <span>${generalExpenses}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Child Expenses</span>
              <span>${childExpenses}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>${generalExpenses + childExpenses}</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExpensesCard
