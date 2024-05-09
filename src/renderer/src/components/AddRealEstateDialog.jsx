import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { addRealEstate } from '@/app/dataSlice'
import { Home } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from './ui/label'
import usePlayerData from '@/hooks/usePlayerData'
import { Separator } from './ui/separator'

const schema = z.object({
  name: z.string().min(1),
  downPayment: z.number(),
  cost: z.number(),
  mortgage: z.number(),
  cashFlow: z.number().or(z.nan()),
})

const AddRealEstateDialog = ({ open, onOpenChange }) => {

  const { selected } = usePlayerData()

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (data.downPayment > selected.balance) return
    dispatch(addRealEstate({ ...data, cashFlow: isNaN(data.cashFlow) ? 0 : data.cashFlow }))
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Home className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Real Estate / Business</DialogTitle>
          </div>
          <DialogDescription>
            This includes real estate and businesses.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 py-2 pb-4">
            <div className="space-y-1 5">
              <Label htmlFor='name'>Name</Label>
              <Input id='name' autoComplete='off' {...form.register('name')} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='downPayment'>Down Payment</Label>
              <Input id='downPayment' type='number' autoComplete='off' {...form.register('downPayment', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='cost'>Cost</Label>
              <Input id='cost' type='number' autoComplete='off' {...form.register('cost', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='mortgage'>Mortgage / Liability</Label>
              <Input id='mortgage' type='number' autoComplete='off' {...form.register('mortgage', { valueAsNumber: true })} className='shadow-sm h-9' />
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

export default AddRealEstateDialog
