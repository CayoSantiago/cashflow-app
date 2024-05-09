import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useState } from 'react';
import SellRealEstateDialog from './SellRealEstateDialog';
import EditRealEstateCashFlow from './EditRealEstateCashFlow';
import { AnimatedCounter } from 'react-animated-counter';

const RealEstateCard = ({ realEstate }) => {
  
  const [openSellRealEstate, setOpenSellRealEstate] = useState(false)
  const [openEditCashFlow, setOpenEditCashFlow] = useState(false)

  const [selectedRealEstate, setSelectedRealEstate] = useState(null)
  
  return (
    <Card>
      <CardContent className='p-6 grid gap-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Real Estate / Business</TableHead>
              <TableHead className='hidden sm:table-cell'>Down Pay</TableHead>
              <TableHead className='hidden sm:table-cell text-right'>Cost</TableHead>
              <TableHead className='text-right'>Cash Flow</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {realEstate?.map(({ name, downPayment, cost, cashFlow }) => (
              <TableRow key={name}>
                <TableCell>
                  <div className="font-medium">{name}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">${downPayment}</TableCell>
                <TableCell className="hidden sm:table-cell text-right">${cost}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end">
                    $<span>
                      <AnimatedCounter
                        value={cashFlow}
                        fontSize='14px'
                        includeDecimals={false}
                        />
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => { setSelectedRealEstate({ name }); setOpenEditCashFlow(true) }}>Edit cash flow</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => { setSelectedRealEstate({ name }); setOpenSellRealEstate(true) }}>Sell</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <SellRealEstateDialog {...selectedRealEstate} open={openSellRealEstate} onOpenChange={open => { if (!open) setSelectedRealEstate(null); setOpenSellRealEstate(open) }} />
      <EditRealEstateCashFlow {...selectedRealEstate} open={openEditCashFlow} onOpenChange={open => { if (!open) setSelectedRealEstate(null); setOpenEditCashFlow(open) }} />
    </Card>
  )
}

export default RealEstateCard
