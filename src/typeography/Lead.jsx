import { cn } from '@/lib/utils'

const Lead = ({ children, className }) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>
      {children}
    </p>
  )
}

export default Lead
