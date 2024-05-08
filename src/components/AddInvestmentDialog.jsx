import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { addInvestment } from '@/app/dataSlice'
import { TrendingUp } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from './ui/label'
import usePlayerData from '@/hooks/usePlayerData'
import { Separator } from './ui/separator'

const schema = z.object({
  name: z.string().min(1),
  amount: z.number(),
  cost: z.number(),
  cashFlow: z.number().or(z.nan()),
})

const AddInvestmentDialog = ({ open, onOpenChange }) => {

  const { selected } = usePlayerData()

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (data.amount * data.cost > selected.balance) return
    dispatch(addInvestment({ ...data, cashFlow: isNaN(data.cashFlow) ? 0 : data.cashFlow }))
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <TrendingUp className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Investment</DialogTitle>
          </div>
          <DialogDescription>
            This includes stocks, funds, and CDs.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 py-2 pb-4">
            <div className="space-y-1 5">
              <Label htmlFor='name'>Name</Label>
              <Input id='name'  autoComplete='off' {...form.register('name')} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='amount'># of Shares</Label>
              <Input id='amount' type='number' autoComplete='off' {...form.register('amount', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='cost'>Cost / Share</Label>
              <Input id='cost' type='number' autoComplete='off' {...form.register('cost', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='cashFlow'>Cash Flow</Label>
              <Input id='cashFlow' type='number' autoComplete='off' {...form.register('cashFlow', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className='h-9' variant='outline' type='button'>Cancel</Button>
            </DialogClose>
            <Button className='h-9' type='submit'>Buy</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddInvestmentDialog
