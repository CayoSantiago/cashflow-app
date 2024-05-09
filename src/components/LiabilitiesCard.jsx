import { useDispatch } from 'react-redux'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { payOffLiability } from '@/app/dataSlice'
import { useState } from 'react'
import PayOffLoanDialog from './PayOffLoanDialog'

const LiabilitiesCard = ({ liabilities, loan, realEstate }) => {
  
  const [openLoanDialog, setOpenLoanDialog] = useState(false)

  const dispatch = useDispatch()

  const totalMortgage = realEstate?.reduce((acc, v) => acc + v.mortgage, 0) || 0
  
  return (
    <>
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
              {realEstate?.map(({ name, mortgage }) => (
                <TableRow key={name}>
                  <TableCell>
                    <div className="font-medium">{name}</div>
                  </TableCell>
                  <TableCell className="text-right">${mortgage.toLocaleString()}</TableCell>
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

      {liabilities?.length ? (
        <Card className='mt-2'>
          <CardContent className='p-6'>
            <Table>
              <TableBody>
                {liabilities?.map(({ key, name, value }) => (
                  <TableRow key={key}>
                    <TableCell>{name}</TableCell>
                    <TableCell className="text-right">${value.toLocaleString()}</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm' onClick={() => dispatch(payOffLiability(key))}>
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

      <PayOffLoanDialog open={openLoanDialog} onOpenChange={setOpenLoanDialog} />
    </>
  )
}

export default LiabilitiesCard
