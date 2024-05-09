import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSign } from 'lucide-react'
import { Separator } from './ui/separator'
import { useDispatch } from 'react-redux'
import { editInvestmentCashFlow } from '@/app/dataSlice'

const schema = z.object({
  cashFlow: z.number()
})

const EditInvestmentCashFlow = ({ open, onOpenChange, name = '' }) => {

  const form = useForm({
    resolver: zodResolver(schema)
  })

  const dispatch = useDispatch()

  const onSubmit = ({ cashFlow }) => {
    dispatch(editInvestmentCashFlow({ name, cashFlow }))
    form.reset()
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) form.reset(); onOpenChange(isOpen) }}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <DollarSign className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Edit Cash Flow</DialogTitle>
          </div>
          <DialogDescription>
            Update the cash flow for your shares of {name}.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
          <Input type='number' placeholder='Cash Flow' autoComplete='off' {...form.register('cashFlow', { valueAsNumber: true })} className='h-9 shadow-sm w-auto flex-grow' />
          <Button type='submit' className='h-9'>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditInvestmentCashFlow
