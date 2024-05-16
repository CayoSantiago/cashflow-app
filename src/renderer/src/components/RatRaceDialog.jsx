import { Rat } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { useDispatch } from 'react-redux'
import { leaveRatRace } from '../app/dataSlice'

const RatRaceDialog = ({ open, onOpenChange }) => {
  
  const dispatch = useDispatch()
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <Rat className='w-5 h-5 mr-2 inline' />
            <AlertDialogTitle>
              You escaped the Rat Race!
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            You may move from the Rat Race to the Fast Track at the start of any turn once your Passive Income is greater than your Total Expenses. Once you are on the Fast Track, you may no longer do any deals in the Rat Race.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(leaveRatRace())}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RatRaceDialog
