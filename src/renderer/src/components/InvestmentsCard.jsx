import { AnimatedCounter } from 'react-animated-counter';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { doubleShares, halveShares } from '@/app/dataSlice';
import { useState } from 'react';
import SellInvestmentDialog from './SellInvestmentDialog';
import EditInvestmentCashFlow from './EditInvestmentCashFlow';

const AssetInvestmentsCard = ({ investments }) => {

  const [openSellInv, setOpenSellInv] = useState(false)
  const [openEditCashFlow, setOpenEditCashFlow] = useState(false)

  const [selectedInv, setSelectedInv] = useState(null)

  const dispatch = useDispatch()

  return (
    <Card>
      <CardContent className='p-6 grid gap-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stocks / Funds / CDs</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Cost / Share</TableHead>
              <TableHead className="hidden sm:table-cell"># of Shares</TableHead>
              <TableHead className='text-right'>Cash Flow</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments?.map(({ name, amount, cost, cashFlow }) => (
              <TableRow key={name}>
                <TableCell>
                  <div className="font-medium">{name}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right">${cost}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className='w-min'>
                    <AnimatedCounter
                      value={amount}
                      fontSize='14px'
                      includeDecimals={false}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end">
                    $<span>
                      <AnimatedCounter
                        value={cashFlow * amount}
                        fontSize='14px'
                        includeDecimals={false}
                        />
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost" className='w-9 h-9'>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => dispatch(doubleShares({ name }))}>Double shares</DropdownMenuItem>
                      <DropdownMenuItem disabled={amount < 2} onSelect={() => dispatch(halveShares({ name }))}>Halve shares</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => { setSelectedInv({ name, amount }); setOpenEditCashFlow(true) }}>Edit cash flow</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => { setSelectedInv({ name, amount }); setOpenSellInv(true) }}>Sell</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      
      <SellInvestmentDialog {...selectedInv} open={openSellInv} onOpenChange={open => { if (!open) setSelectedInv(null); setOpenSellInv(open) }} />
      <EditInvestmentCashFlow {...selectedInv} open={openEditCashFlow} onOpenChange={open => { if (!open) setSelectedInv(null); setOpenEditCashFlow(open) }} />
    </Card>
  )
}

export default AssetInvestmentsCard
