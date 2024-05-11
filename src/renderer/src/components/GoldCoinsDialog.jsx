import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { Coins } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from './ui/label'
import usePlayerData from '@/hooks/usePlayerData'
import { Separator } from './ui/separator'
import { buyGoldCoins, sellGoldCoins } from '@/app/dataSlice'

const schema = z.object({
  amount: z.number(),
  price: z.number(),
})

const GoldCoinsDialog = ({ open, onOpenChange, mode = 'Buy' }) => {

  const { selected } = usePlayerData()

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data, e) => {
    if (e.nativeEvent.submitter.value === 'buy') {
      if (data.price * data.amount > selected?.balance) return
      dispatch(buyGoldCoins(data))
    } else {
      if (data.amount > selected?.coins) return
      dispatch(sellGoldCoins(data))
    }
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Coins className='w-5 h-5 mr-2 inline' />
            <DialogTitle>{mode} Gold Coins</DialogTitle>
          </div>
          <DialogDescription>
            You currently have {selected?.coins} coins.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 py-2 pb-4">
            <div className="space-y-1 5">
              <Label htmlFor='amount'>Amount</Label>
              <Input id='amount' type='number' autoComplete='off' {...form.register('amount', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
            <div className="space-y-1 5">
              <Label htmlFor='price'>Price / Coin</Label>
              <Input id='price' type='number' autoComplete='off' {...form.register('price', { valueAsNumber: true })} className='shadow-sm h-9' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline' className='h-9'>Cancel</Button>
            </DialogClose>
            {mode === 'Buy' ? (
              <Button className='h-9' type='submit' value='buy'>Buy</Button>
            ) : mode === 'Sell' ? (
              <Button className='h-9' variant='destructive' type='submit' value='sell'>Sell</Button>
            ) : null}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GoldCoinsDialog
