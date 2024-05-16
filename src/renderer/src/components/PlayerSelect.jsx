import { useEffect, useState } from 'react'
import CreatePlayerDialog from './CreatePlayerDialog'
import { Button } from './ui/button'
import { Check, User, UserPlus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import usePlayerData from '@/hooks/usePlayerData'
import { selectPlayer } from '@/app/dataSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from './ui/command'
import { cn } from '@/lib/utils'
import { nextPlayer, prevPlayer } from '../app/dataSlice'

const PlayerSelect = () => {

  const { players, selected } = usePlayerData()

  const [open, setOpen] = useState(false)
  const [openCreateUser, setOpenCreateUser] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const down = e => {
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenCreateUser(prev => !prev)
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key) && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        dispatch(selectPlayer(parseInt(e.key - 1)))
      } else if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        dispatch(prevPlayer())
      } else if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        dispatch(nextPlayer())
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [dispatch])

  return (
    <>
      {selected ? (
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" size='sm' aria-expanded={open} className="w-[180px] justify-start">
              <User className='w-4 h-4 mr-2' />
              {selected.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Search player..." />
              <CommandList>
                <CommandEmpty>No player found.</CommandEmpty>
                <CommandGroup>
                  {players?.map((p, idx) => (
                    <CommandItem
                      key={p.name}
                      value={p.name}
                      onSelect={() => {
                        dispatch(selectPlayer(idx))
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", p.name === selected.name ? "opacity-100" : "opacity-0")} />
                      {p.name}
                      <CommandShortcut>⌘{idx + 1}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {players.length < 6 ? (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem value='add player' onSelect={() => { setOpenCreateUser(true); setOpen(false) }}>
                        <UserPlus className='w-4 h-4 mr-2' />
                        Add Player
                        <CommandShortcut>⌘N</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </>
                ) : null}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Button size='sm' onClick={() => setOpenCreateUser(true)} className='w-[180px]'>Start Game</Button>
      )}

      <CreatePlayerDialog open={players?.length < 6 ? openCreateUser : false} onOpenChange={setOpenCreateUser} />
    </>
  )
}

export default PlayerSelect
