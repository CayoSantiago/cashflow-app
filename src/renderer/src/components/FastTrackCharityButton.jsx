import { useState } from 'react'
import { Button } from './ui/button'
import { HeartHandshake } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useDispatch } from 'react-redux'
import { fastTrackDonate } from '../app/dataSlice'
import usePlayerData from '../hooks/usePlayerData'

const FastTrackCharityButton = () => {
  
  const { selected } = usePlayerData()

  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  
  return (
    <>
      <Button variant='outline' size="sm" onClick={() => setOpen(true)} className="h-7 gap-2 text-sm">
        <HeartHandshake className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only">Charity</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <div className="flex items-center w-full justify-center sm:justify-start">
              <HeartHandshake className='w-5 h-5 mr-2 inline' />
              <DialogTitle>{selected?.fastTrackHasDonated ? 'You Donated to Charity' : 'Donate to Charity'}</DialogTitle>
            </div>
            <DialogDescription>
              {selected?.fastTrackHasDonated
                ? 'You may roll 1, 2, or 3 die on each turn for the rest of the game.'
                : 'For $100,000 you may roll 1, 2, or 3 die on each turn for the rest of the game.'
              }
            </DialogDescription>
          </DialogHeader>
          {selected?.fastTrackHasDonated ? (
            <DialogFooter>
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </DialogFooter>
          ) : (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button disabled={selected?.balance < 100000} onClick={() => dispatch(fastTrackDonate())}>
                  Donate
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FastTrackCharityButton
