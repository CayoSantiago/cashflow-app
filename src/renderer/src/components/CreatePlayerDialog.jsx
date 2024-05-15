import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import professions from '@/data/professions.json'
import { useDispatch } from 'react-redux'
import { addPlayer } from '@/app/dataSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Check, ChevronsUpDown, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

const CreatePlayerDialog = ({ open, onOpenChange }) => {
  
  const [name, setName] = useState('')
  const [profession, setProfession] = useState(null)
  const [profOpen, setProfOpen] = useState(false)

  const dispatch = useDispatch()

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setName('')
      setProfession(null)
    }
    onOpenChange(isOpen)
  }

  const submitData = () => {
    dispatch(addPlayer({ name, profession }))
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center sm:justify-start">
            <UserPlus className='w-5 h-5 mr-2 inline' />
            <DialogTitle>Add Player</DialogTitle>
          </div>
          <DialogDescription>
            Add a new player to the game. Max of 4 players
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid grid-cols-2 gap-4 py-2 pb-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoComplete='off' placeholder='Player name' onChange={e => setName(e.target.value)} className='shadow-sm h-9' />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profession">Profession</Label>
            <Popover open={profOpen} onOpenChange={setProfOpen} modal>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full h-9 shadow-sm justify-between font-normal">
                  {profession ? profession.title : "Select profession..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {professions.map((p) => (
                        <CommandItem key={p.title} value={p.title} onSelect={() => { setProfession(p); setProfOpen(false) }}>
                          <Check className={cn("mr-2 h-4 w-4", profession?.title === p.title ? "opacity-100" : "opacity-0")} />
                          {p.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className='h-9' variant='outline'>Cancel</Button>
          </DialogClose>
          <Button className='h-9' disabled={!name || !profession} onClick={submitData}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePlayerDialog
