import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Landmark } from 'lucide-react'
import { Separator } from './ui/separator'

const BankruptcyDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Landmark className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Bankruptcy - Uh oh! You Ran Out of Money</DialogTitle>
          </div>
          <DialogDescription>
            Sell any number of assets you own to the bank and receive 1/2 the Down Payment for each. Use these funds to pay off debts until your total income is greater than your total expenses. (In other words, your Monthly Cash Flow is positive.)
          </DialogDescription>
          <Separator />
          <DialogDescription className='text-right'>
            <strong>Lose 2 turns</strong>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default BankruptcyDialog
