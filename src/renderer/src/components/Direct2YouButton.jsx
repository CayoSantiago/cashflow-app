import { LogIn, Users } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import usePlayerData from '@/hooks/usePlayerData'
import { useDispatch } from 'react-redux'
import { increaseD2YCashFlow, joinD2Y } from '@/app/dataSlice'

const Direct2YouButton = () => {

  const { selected } = usePlayerData()

  const dispatch = useDispatch()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={!selected} className="h-7 gap-2 text-sm">
            <Users className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Direct 2 You</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {selected?.d2y?.hasJoined ? (
            <>
              <DropdownMenuLabel className='grid'>
                Direct 2 You
                <span className='font-normal text-xs text-muted-foreground flex items-center'>
                  {selected?.d2y?.cashFlow ? (
                    <>Cash Flow: <span className='ml-auto'>${selected?.d2y?.cashFlow || 0}</span></>
                  ) : (
                    <>Level 1</>
                  )}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Increase Cash Flow
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => dispatch(increaseD2YCashFlow(100))}>$100</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => dispatch(increaseD2YCashFlow(150))}>$150</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </>
          ) : (
            <>
              <DropdownMenuLabel>
                Direct 2 You
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <LogIn className='w-4 h-4 mr-2' />
                  Join
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => dispatch(joinD2Y(200))}>$200</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => dispatch(joinD2Y(300))}>$300</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => dispatch(joinD2Y(400))}>$400</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>


    </>
  )
}

export default Direct2YouButton
