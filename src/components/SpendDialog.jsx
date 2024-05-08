import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { updateBalance } from '@/app/dataSlice'
import { Check, CreditCard } from 'lucide-react'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import usePlayerData from '@/hooks/usePlayerData'

const schema = z.object({
  amount: z.number()
})

const SpendDialog = ({ open, onOpenChange }) => {
  
  const { selected } = usePlayerData()
  const [mode, setMode] = useState('send')

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ amount }) => {
    if (mode === 'send' && amount > selected.balance) return
    dispatch(updateBalance(mode === 'send' ? amount * -1 : amount))
    form.reset()
    setMode('send')
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); setMode('send'); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <CreditCard className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Payment</DialogTitle>
          </div>
          <DialogDescription>
            Send / receive money to update your balance.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className='w-[100px] h-9 shadow-sm'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='send'>Send</SelectItem>
              <SelectItem value='receive'>Receive</SelectItem>
            </SelectContent>
          </Select>
          <Input type='number' placeholder='Amount' autoComplete='off' {...form.register('amount', { valueAsNumber: true })} className='h-9 shadow-sm w-auto flex-grow' />
          <Button type='submit' className='h-9 w-9 p-0'>
            <Check className='w-4 h-4' />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SpendDialog
