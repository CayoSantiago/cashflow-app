import { useState } from 'react'
import CreatePlayerDialog from './CreatePlayerDialog'
import { Button } from './ui/button'
import { Check, User, UserPlus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import usePlayerData from '@/hooks/usePlayerData'
import { selectPlayer } from '@/app/dataSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { cn } from '@/lib/utils'

const PlayerSelect = () => {

  const { players, selected } = usePlayerData()

  const [open, setOpen] = useState(false)
  const [openCreateUser, setOpenCreateUser] = useState(false)

  const dispatch = useDispatch()

  return (
    <>
      {selected ? (
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger asChild>
            <Button variant="ghost" role="combobox" size='sm' aria-expanded={open} className="w-[180px] justify-start">
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
                  {players?.map((p) => (
                    <CommandItem
                      key={p.name}
                      value={p.name}
                      onSelect={() => {
                        dispatch(selectPlayer(p.name))
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", p.name === selected.name ? "opacity-100" : "opacity-0")} />
                      {p.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {players.length < 4 ? (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem value='add player' onSelect={() => { setOpenCreateUser(true); setOpen(false) }}>
                        <UserPlus className='w-4 h-4 mr-2' />
                        Add Player
                      </CommandItem>
                    </CommandGroup>
                  </>
                ) : null}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Button variant='outline' onClick={() => setOpenCreateUser(true)} className='w-[180px]'>Start Game</Button>
      )}

      <CreatePlayerDialog open={openCreateUser} onOpenChange={setOpenCreateUser} />
    </>
  )
}

export default PlayerSelect
