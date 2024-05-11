import { PieChart } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ExpensesCard = () => {
  
  const { selected } = usePlayerData()

  const children = selected?.children || 0

  const libExpenses = selected?.liabilities?.reduce((acc, l) => acc + selected?.expenses?.[l.key] || 0, 0) || 0
  const generalExpenses = libExpenses + (selected?.expenses?.taxes || 0) + (selected?.expenses?.other || 0) + (selected?.loan || 0) / 10
  const childExpenses = (selected?.costPerChild || 0) * children

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
              <span>${selected?.expenses?.taxes || 0}</span>
            </li>

            {selected?.liabilities?.map(({ key, name }) => (
              <li key={key} className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {name}
                </span>
                <span>${selected?.expenses?.[key] || 0}</span>
              </li>
            ))}
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Other Expenses
              </span>
              <span>${selected?.expenses?.other || 0}</span>
            </li>
            {selected?.loan ? (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Loan Payment
                </span>
                <span>${(selected?.loan || 0) / 10}</span>
              </li>
            ) : null}
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
              <span>${selected?.costPerChild || 0}</span>
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
