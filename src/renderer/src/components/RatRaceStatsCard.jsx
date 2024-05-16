import { Baby, Coins, DollarSign, Home, Rat, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

const RatRaceStatsCard = () => {
  
  const { selected, passiveIncome, totalExpenses } = usePlayerData()

  const children = selected?.children || 0

  const libExpenses = selected?.liabilities?.reduce((acc, l) => acc + selected?.expenses?.[l.key] || 0, 0) || 0
  const generalExpenses = libExpenses + (selected?.expenses?.taxes || 0) + (selected?.expenses?.other || 0) + (selected?.loan || 0) / 10
  const childExpenses = (selected?.costPerChild || 0) * children

  const cashFlow = (selected?.salary || 0) + passiveIncome - totalExpenses

  const loans = []
  let prev = selected?.loanHistory?.[0]
  for (const l of (selected?.loanHistory || [])) {
    if (l > prev) loans.push(l - prev)
    prev = l
  }

  const totalLoans = loans.reduce((acc, v) => acc + v, 0)

  return (
    <Card className="overflow-hidden relative">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center">
          <Rat className='w-6 h-6 mr-2' />
          <CardTitle>Rat Race Stats</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">

          <Collapsible className="grid gap-3" defaultOpen>
            <CollapsibleTrigger className="font-semibold text-start">Profession</CollapsibleTrigger>
            <CollapsibleContent asChild>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Title</span>
                  <span>{selected?.profession || ''}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Salary</span>
                  <span>${selected?.salary?.toLocaleString() || 0}</span>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2" />

          <Collapsible className="grid gap-3" defaultOpen>
            <CollapsibleTrigger className="font-semibold text-start">Income</CollapsibleTrigger>
            <CollapsibleContent asChild>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Passive Income</span>
                  <span>${passiveIncome.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Income</span>
                  <span>${((selected?.salary || 0) + passiveIncome).toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cash Flow</span>
                  <span>${cashFlow.toLocaleString()}</span>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2" />

          <Collapsible className="grid gap-3" defaultOpen>
            <CollapsibleTrigger className="font-semibold text-start">Expenses</CollapsibleTrigger>
            <CollapsibleContent asChild>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">General Expenses</span>
                  <span>${generalExpenses.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Child Expenses</span>
                  <span>${childExpenses.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Expenses</span>
                  <span>${totalExpenses.toLocaleString()}</span>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2" />

          <Collapsible className='grid gap-3' defaultOpen>
            <CollapsibleTrigger className='font-semibold text-start'>Loans</CollapsibleTrigger>
            <CollapsibleContent asChild>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground"># of Loans</span>
                  <span>{loans.length}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Amount Borrowed</span>
                  <span>${totalLoans.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className='text-muted-foreground'>Remaining Loan Balance</span>
                  <span>${selected.loan.toLocaleString()}</span>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2" />

          <Collapsible className='grid gap-3'>
            <CollapsibleTrigger className="font-semibold text-start">Other</CollapsibleTrigger>
            <CollapsibleContent asChild>
              <ul className="grid gap-3">
                <li className='flex items-center justify-between'>
                  <span className="text-muted-foreground flex items-center"><Users className='w-4 h-4 mr-2' />Direct 2 You</span>
                  <span>{selected?.d2y?.hasJoined
                    ? selected?.d2y?.cashFlow ? `$${selected.d2y.cashFlow.toLocaleString()}` : 'Level 1'
                    : 'Not Joined'
                  }</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center"><Coins className='w-4 h-4 mr-2' />Gold Coins</span>
                  <span>{selected?.coins}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center"><Baby className='w-4 h-4 mr-2' />Children</span>
                  <span>{selected?.children}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center"><TrendingUp className='w-4 h-4 mr-2' />Stocks / Funds / CDs</span>
                  <span>{selected?.investments?.length || 0}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center"><Home className='w-4 h-4 mr-2' />Real Estate / Businesses</span>
                  <span>{selected?.realEstate?.length || 0}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center"><DollarSign className='w-4 h-4 mr-2' />Final Balance</span>
                  <span>${selected?.ratRaceSnapshot?.balance?.toLocaleString() || 0}</span>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}

export default RatRaceStatsCard
