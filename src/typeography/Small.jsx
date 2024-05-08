import { cn } from '@/lib/utils'

const Small = ({ children, className }) => {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  )
}

export default Small
