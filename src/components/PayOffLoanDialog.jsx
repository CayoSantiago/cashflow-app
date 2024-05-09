import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { payOffBankLoan } from '@/app/dataSlice'
import { Landmark } from 'lucide-react'
import { Separator } from './ui/separator'

const schema = z.object({
  amount: z.number().refine(a => a % 1000 === 0)
})

const PayOffLoanDialog = ({ open, onOpenChange }) => {

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ amount }) => {
    dispatch(payOffBankLoan(amount))
    form.reset()
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Landmark className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Pay Off Loan</DialogTitle>
          </div>
          <DialogDescription>
            Loans can be paid off in $1,000 increments.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
          <Input type='number' placeholder='Amount' autoComplete='off' {...form.register('amount', { valueAsNumber: true })} className='h-9 shadow-sm w-auto flex-grow' />
          <Button type='submit' size='sm'>
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PayOffLoanDialog
