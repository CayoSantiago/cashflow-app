import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Coins } from 'lucide-react'
import { Separator } from './ui/separator'
import { useDispatch } from 'react-redux'
import { sellRealEstate } from '@/app/dataSlice'

const schema = z.object({
  price: z.number()
})

const SellRealEstateDialog = ({ open, onOpenChange, name = '' }) => {

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ price }) => {
    dispatch(sellRealEstate({ name, price }))
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Coins className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Sell Real Estate / Business</DialogTitle>
          </div>
          <DialogDescription>
            Sell your {name}.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
          <Input type='number' placeholder='Price' autoComplete='off' {...form.register('price', { valueAsNumber: true })} className='h-9 shadow-sm w-auto flex-grow' />
          <Button type='submit' className='h-9'>Sell</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SellRealEstateDialog
