import { DollarSign, Home, MoreHorizontal, PlusCircle, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import usePlayerData from '@/hooks/usePlayerData'
import AddInvestmentDialog from './AddInvestmentDialog'
import { useState } from 'react'
import AddRealEstateDialog from './AddRealEstateDialog'
import SellInvestmentDialog from './SellInvestmentDialog'
import { useDispatch } from 'react-redux'
import { doubleShares, halveShares } from '@/app/dataSlice'
import { AnimatedCounter } from 'react-animated-counter'
import SellRealEstateDialog from './SellRealEstateDialog'
import AddCashFlowDialog from './AddCashFlowDialog'

const PlayerAssetTabs = () => {

  const { selected } = usePlayerData()

  const [openAddInvestment, setOpenAddInvestment] = useState(false)
  const [openSellInvestment, setOpenSellInvestment] = useState(false)

  const [openAddRealEstate, setOpenAddRealEstate] = useState(false)
  const [openSellRealEstate, setOpenSellRealEstate] = useState(false)

  const [openAddCashFlow, setOpenAddCashFlow] = useState(false)

  const [selectedInv, setSelectedInv] = useState(null)
  const [selectedRealEstate, setSelectedRealEstate] = useState(null)

  const dispatch = useDispatch()

  const invItems = selected?.investments?.map(i => ({ ...i, cashFlow: i.amount * i.cashFlow })) || []
  const incomeItems = invItems.concat(selected?.realEstate || []).concat(selected?.cashFlow || [])

  const totalMortgage = selected ? selected.realEstate.reduce((acc, v) => acc + v.mortgage, 0) : 0

  return (
    <Tabs defaultValue="income">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger disabled={!selected} value="income">Income</TabsTrigger>
          <TabsTrigger disabled={!selected} value="assets">Assets</TabsTrigger>
          <TabsTrigger disabled={!selected} value="liabilities">Liabilities</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={!selected} className="h-7 gap-2 text-sm">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Add</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpenAddInvestment(true)}>
                <TrendingUp className='w-4 h-4 mr-2' />
                Investment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenAddRealEstate(true)}>
                <Home className='w-4 h-4 mr-2' />
                Real Estate / Business
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenAddCashFlow(true)}>
                <DollarSign className='w-4 h-4 mr-2' />
                Cash Flow
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ===== Income ===== */}
      <TabsContent value="income">
        <Card>
          <CardContent className='p-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Cash Flow</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeItems.map(({ name, cashFlow }) => (
                  <TableRow key={name}>
                    <TableCell>
                      <div className="font-medium">{name}</div>
                    </TableCell>
                    <TableCell className="text-right">${cashFlow}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ===== Assets ===== */}
      <TabsContent value='assets'>
        <Card>
          <CardContent className='p-6 grid gap-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stocks / Funds / CDs</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    # of Shares
                  </TableHead>
                  <TableHead className="text-right">Cost / Share</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selected?.investments?.map(({ name, amount, cost }) => (
                  <TableRow key={name}>
                    <TableCell>
                      <div className="font-medium">{name}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className='w-min'>
                        <AnimatedCounter
                          value={amount}
                          fontSize='14px'
                          includeDecimals={false}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${cost}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => dispatch(doubleShares({ name }))}>Double shares</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => dispatch(halveShares({ name }))}>Halve shares</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => { setSelectedInv({ name, amount }); setOpenSellInvestment(true) }}>Sell</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className='mt-2'>
          <CardContent className='p-6 grid gap-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Real Estate / Business</TableHead>
                  <TableHead className='hidden sm:table-cell'>Down Pay</TableHead>
                  <TableHead className='text-right'>Cost</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selected?.realEstate?.map(({ name, downPayment, cost }) => (
                  <TableRow key={name}>
                    <TableCell>
                      <div className="font-medium">{name}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      ${downPayment}
                    </TableCell>
                    <TableCell className="text-right">${cost}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => { setSelectedRealEstate({ name }); setOpenSellRealEstate(true) }}>Sell</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ===== Liabilities ===== */}
      <TabsContent value="liabilities">
        <Card>
          <CardContent className='p-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Real Estate / Business</TableHead>
                  <TableHead className="text-right">Mortgage / Liability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selected?.realEstate?.map(({ name, mortgage }) => (
                  <TableRow key={name}>
                    <TableCell>
                      <div className="font-medium">{name}</div>
                    </TableCell>
                    <TableCell className="text-right">${mortgage}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <div className="font-semibold">Total</div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">${totalMortgage}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <AddInvestmentDialog open={openAddInvestment} onOpenChange={setOpenAddInvestment} />
      <SellInvestmentDialog open={openSellInvestment} onOpenChange={isOpen => { if (!isOpen) setSelectedInv(null); setOpenSellInvestment(isOpen) }} {...selectedInv} />
      
      <AddRealEstateDialog open={openAddRealEstate} onOpenChange={setOpenAddRealEstate} />
      <SellRealEstateDialog open={openSellRealEstate} onOpenChange={isOpen => { if (!isOpen) setSelectedRealEstate(null); setOpenSellRealEstate(isOpen) }} {...selectedRealEstate} />

      <AddCashFlowDialog open={openAddCashFlow} onOpenChange={setOpenAddCashFlow} />
    </Tabs>
  )
}

export default PlayerAssetTabs
