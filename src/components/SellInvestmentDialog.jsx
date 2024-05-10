import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrendingUp } from 'lucide-react'
import { Separator } from './ui/separator'
import { useDispatch } from 'react-redux'
import { sellInvestment } from '@/app/dataSlice'

const schema = z.object({
  price: z.number()
})

const SellInvestmentDialog = ({ open, onOpenChange, name = '', amount = 0 }) => {

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ price }) => {
    dispatch(sellInvestment({ name, price }))
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <TrendingUp className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Sell Investment</DialogTitle>
          </div>
          <DialogDescription>
            Sell {amount} share(s) of {name}.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
          <Input type='number' placeholder='Price' autoComplete='off' {...form.register('price', { valueAsNumber: true })} className='h-9 shadow-sm w-auto flex-grow' />
          <Button type='submit' variant='destructive' className='h-9'>Sell</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SellInvestmentDialog
