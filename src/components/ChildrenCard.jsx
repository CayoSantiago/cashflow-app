import { Minus, Plus } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import usePlayerData from '@/hooks/usePlayerData'
import { useDispatch } from 'react-redux'
import { decrementChildren, incrementChildren } from '@/app/dataSlice'
import { AnimatedCounter } from 'react-animated-counter'

const ChildrenCard = () => {

  const { selected } = usePlayerData()

  const dispatch = useDispatch()

  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='px-3'>
        <div className="flex items-center justify-between px-3">
          <CardDescription>Children</CardDescription>
          <Badge variant='outline' className='text-muted-foreground'>${selected?.costPerChild || 0}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Button variant='ghost' disabled={!selected} onClick={() => dispatch(decrementChildren())} className='w-8 h-8 p-0 rounded-full text-muted-foreground'>
            <Minus className='w-4 h-4' />
          </Button>
          <CardTitle>
            <AnimatedCounter
              value={selected?.children || 0}
              includeDecimals={false}
              fontSize='36px'
            />
          </CardTitle>
          <Button variant='ghost' disabled={!selected} onClick={() => dispatch(incrementChildren())} className='w-8 h-8 p-0 rounded-full text-muted-foreground'>
            <Plus className='w-4 h-4' />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={Math.min(100, (selected?.children || 0) * 34)} aria-label="33% increase" />
      </CardFooter>
    </Card>
  )
}

export default ChildrenCard
