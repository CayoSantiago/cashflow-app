import { Card, CardContent } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const IncomeCard = ({ name, salary = 0, investments = [], realEstate = [], d2y = 0 }) => {

  const invItems = investments.filter(i => i.cashFlow > 0).map(i => ({ ...i, cashFlow: i.amount * i.cashFlow }))
  const incomeItems = [
    ...(salary > 0 ? [{ name: 'Salary', cashFlow: salary }] : []),
    ...(d2y.cashFlow > 0 ? [{ name: 'Direct 2 You', cashFlow: d2y.cashFlow }] : []),
    ...invItems,
    ...realEstate,
  ]
  
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
            {incomeItems?.map((i, idx) => (
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
