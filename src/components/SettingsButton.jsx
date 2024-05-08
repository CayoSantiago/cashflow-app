import { RotateCcw, Settings, UserMinus } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { reset } from '@/app/dataSlice'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { cn } from '@/lib/utils'

const SettingsButton = ({ className }) => {

  const dispatch = useDispatch()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('w-9 h-9', className)}>
          <Settings className='w-5 h-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => dispatch(reset())}>
          <RotateCcw className='w-4 h-4 mr-2' />
          New Game
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserMinus className='w-4 h-4 mr-2' />
          Remove Player
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SettingsButton
