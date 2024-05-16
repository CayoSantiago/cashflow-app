import { PlusCircle } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import investments from '../data/fastTrackInvestments.json'
import { useDispatch } from 'react-redux'
import { addFastTrackInvestment, updateBalance } from '../app/dataSlice'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'

const AddFastTrackInvestmentButton = () => {

  const [open, setOpen] = useState(false)
  const [openPotentialCashDialog, setOpenPotentialCashDialog] = useState(false)

  const [potentialCashData, setPotentialCashData] = useState(null)

  const dispatch = useDispatch()

  return (
    <>
      <Button variant="outline" size="sm" disabled={open} onClick={() => setOpen(true)} className="h-7 gap-2 text-sm">
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only">Add</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search investment...' />
        <CommandList>
          <CommandEmpty>No investment found.</CommandEmpty>
          <CommandGroup>
            {investments?.map(({ title, desc, sub, cost, cashFlow, potentialCash }) => (
              <CommandItem
                key={title}
                value={title}
                onSelect={() => {
                  if (!cashFlow) {
                    dispatch(updateBalance({ amount: cost * -1 }))
                    setPotentialCashData({ title, desc, potentialCash })
                    setOpenPotentialCashDialog(true)
                  } else {
                    dispatch(addFastTrackInvestment({ title, sub, cost, cashFlow }))
                  }
                  setOpen(false)
                 }}
                className='justify-between'
              >
                <div className="grid">
                  <span>{title}</span>
                  <span className='text-xs'>{sub}</span>
                </div>
                <div className="grid">
                  <span className='font-medium text-right'>${cost.toLocaleString()}</span>
                  {cashFlow
                    ? <span className='text-xs text-right'>+${cashFlow.toLocaleString()}/mo CF</span>
                    : <span className='text-xs text-right'>+${potentialCash?.toLocaleString()} or +$0</span>
                  }
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Dialog open={openPotentialCashDialog} onOpenChange={setOpenPotentialCashDialog}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>{potentialCashData?.title || ''}</DialogTitle>
            <DialogDescription>{potentialCashData?.desc || ''}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='destructive'>$0</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => dispatch(updateBalance({ amount: potentialCashData?.potentialCash || 0 }))}>
                ${potentialCashData?.potentialCash?.toLocaleString() || 0}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddFastTrackInvestmentButton
