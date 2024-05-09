import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { updateBalance } from '@/app/dataSlice'
import { CreditCard, Minus, Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'

const schema = z.object({
  amount: z.number()
})

const BalanceDialog = ({ open, onOpenChange }) => {
  
  const { selected } = usePlayerData()

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ amount }, e) => {
    amount *= e.nativeEvent.submitter.value
    if (selected?.balance + amount < 0) return
    dispatch(updateBalance({ amount }))
    form.reset()
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <CreditCard className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Update Balance</DialogTitle>
          </div>
          <DialogDescription>
            Add or remove money from your account.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center">
          <Input type='number' placeholder='Amount' autoComplete='off' {...form.register('amount', { valueAsNumber: true })} className='h-9 shadow-sm w-auto flex-grow' />
          <Button type='submit' value={-1} variant='destructive' className='h-9 w-9 p-0 ml-4 mr-2'>
            <Minus className='w-4 h-4' />
          </Button>
          <Button type='submit' value={1} className='h-9 w-9 p-0'>
            <Plus className='w-4 h-4' />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BalanceDialog
