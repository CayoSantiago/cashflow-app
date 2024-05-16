import { cn } from '../lib/utils'
import { Card, CardContent } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const IncomeCard = ({ name, salary = 0, investments = [], realEstate = [], d2y = 0, isOutOfRatRace = false, fastTrack = [] }) => {

  const invItems = investments.filter(i => i.cashFlow > 0).map(i => ({ ...i, cashFlow: i.amount * i.cashFlow }))
  const incomeItems = [
    ...(salary > 0 ? [{ name: 'Salary', cashFlow: salary }] : []),
    ...(d2y.cashFlow > 0 ? [{ name: 'Direct 2 You', cashFlow: d2y.cashFlow }] : []),
    ...invItems,
    ...realEstate,
  ]

  const fastTrackTotal = fastTrack?.reduce((acc, i) => acc + i.cashFlow, 0) || 0
  
  return (
    <Card className='mb-2'>
      <CardContent className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Cash Flow</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isOutOfRatRace ? (
              <>
                {fastTrack?.map((i, idx) => (
                  <TableRow key={`${name}-${i.title}-${idx}`}>
                    <TableCell className={cn('grid', i.sub ? '' : 'py-6')}>
                      <span>{i.title}</span>
                      <span className='text-xs'>{i.sub || ''}</span>
                    </TableCell>
                    <TableCell className='text-right'>${i.cashFlow.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow className='font-semibold'>
                  <TableCell>Total</TableCell>
                  <TableCell className='text-right'>${fastTrackTotal.toLocaleString()}</TableCell>
                </TableRow>
              </>
            ) : incomeItems?.map((i, idx) => (
              <TableRow key={`${name}-${i.name}-${idx}`}>
                <TableCell>{i.name}</TableCell>
                <TableCell className="text-right">${i.cashFlow.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default IncomeCard
