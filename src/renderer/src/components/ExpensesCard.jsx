import { Menu, PieChart } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'
import { useState } from 'react'
import { DonutChart, List, ListItem } from '@tremor/react'
import { cn } from '../lib/utils'

const currencyFormatter = (number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const ExpensesCard = () => {
  
  const { selected, totalExpenses } = usePlayerData()

  const [showGraph, setShowGraph] = useState(false)

  const children = selected?.children || 0

  const libExpenses = selected?.liabilities?.reduce((acc, l) => acc + selected?.expenses?.[l.key] || 0, 0) || 0
  const generalExpenses = libExpenses + (selected?.expenses?.taxes || 0) + (selected?.expenses?.other || 0) + (selected?.loan || 0) / 10
  const childExpenses = (selected?.costPerChild || 0) * children

  const expenses = [
    ...(selected?.liabilities?.map(l => ({ name: l.name, color: l.color, value: selected?.expenses?.[l.key] || 0 })) || []),
    { name: 'Taxes', color: 'bg-fuchsia-500', value: selected?.expenses?.taxes || 0 },
    { name: 'Other Expenses', color: 'bg-amber-500', value: selected?.expenses?.other || 0 },
    { name: 'Loan Payment', color: 'bg-teal-500', value: (selected?.loan || 0) / 10 },
    { name: 'Child Expenses', color: 'bg-pink-500', value: childExpenses },
  ].filter(i => i.value)

  expenses.sort((a, b) => b.value - a.value)

  const colors = expenses.map(i => i.color.split('-')[1])

  return (
    <Card className="overflow-hidden relative">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle>Expenses</CardTitle>
          <Button variant='ghost' disabled={!selected} onClick={() => setShowGraph(prev => !prev)} className='w-8 h-8 p-0'>
            {showGraph ? <Menu className='w-4 h-4' /> : <PieChart className='w-4 h-4' />}
          </Button>
        </div>
      </CardHeader>
      {showGraph ? (
        <CardContent className='p-6 text-sm'>
          <DonutChart
            data={expenses}
            valueFormatter={currencyFormatter}
            category='value'
            index='name'
            showTooltip={false}
            colors={colors}
          />
          <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
            <span>Category</span>
            <span>Amount / Share</span>
          </p>
          <List className='mt-2'>
            {expenses.map(({ name, color, value }) => (
              <ListItem key={name} className='space-x-6'>
                <div className="flex items-center space-x-2.5 truncate">
                  <span className={cn(color, 'h-2.5 w-2.5 shrink-0 rounded-sm')} aria-hidden={true} />
                  <span className="truncate dark:text-dark-tremor-content-emphasis">
                    {name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {currencyFormatter(value)}
                  </span>
                  <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                    {Math.round(value / totalExpenses * 1000) / 10}%
                  </span>
                </div>
              </ListItem>
            ))}
          </List>
        </CardContent>
      ) : (
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
      )}
    </Card>
  )
}

export default ExpensesCard
