import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { getBankLoan } from '@/app/dataSlice'
import { Landmark, Plus } from 'lucide-react'
import { Separator } from './ui/separator'

const schema = z.object({
  amount: z.number().refine(a => a % 1000 === 0)
})

const LoanDialog = ({ open, onOpenChange }) => {

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ amount }) => {
    dispatch(getBankLoan(amount))
    form.reset()
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Landmark className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Bank Loan</DialogTitle>
          </div>
          <DialogDescription>
            Loans must be in multiples of $1,000 at 10% interest per month.
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

export default LoanDialog
