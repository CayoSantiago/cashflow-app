import { useDispatch } from 'react-redux'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { payOffLiability } from '@/app/dataSlice'
import { useState } from 'react'
import PayOffLoanDialog from './PayOffLoanDialog'

const LiabilitiesCard = ({ name, liabilities, loan, realEstate }) => {
  
  const [openLoanDialog, setOpenLoanDialog] = useState(false)

  const dispatch = useDispatch()

  const totalMortgage = realEstate?.reduce((acc, v) => acc + v.mortgage, 0) || 0
  
  return (
    <>
      {liabilities?.length ? (
        <Card>
          <CardContent className='p-6'>
            <Table>
              <TableBody>
                {liabilities?.map((l, idx) => (
                  <TableRow key={`${name}-${l.key}-${idx}`}>
                    <TableCell>{l.name}</TableCell>
                    <TableCell className="text-right">${l.value.toLocaleString()}</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm' onClick={() => dispatch(payOffLiability(idx))}>
                        Pay off
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {loan ? (
                  <TableRow>
                    <TableCell>Bank Loan</TableCell>
                    <TableCell className="text-right">${loan.toLocaleString()}</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm' onClick={() => setOpenLoanDialog(true)}>
                        Pay off
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

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
              {realEstate?.map((re, idx) => (
                <TableRow key={`${name}-${re.name}-${idx}`}>
                  <TableCell>
                    <div className="font-medium">{re.name}</div>
                  </TableCell>
                  <TableCell className="text-right">${re.mortgage.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <div className="font-semibold">Total</div>
                </TableCell>
                <TableCell className="text-right font-semibold">${totalMortgage.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PayOffLoanDialog open={openLoanDialog} onOpenChange={setOpenLoanDialog} />
    </>
  )
}

export default LiabilitiesCard
