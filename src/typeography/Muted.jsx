import { cn } from '@/lib/utils'

const Muted = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  )
}

export default Muted
