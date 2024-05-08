import { cn } from '@/lib/utils'

const Large = ({ children, className }) => {
  return (
    <div className={cn("text-lg font-semibold", className)}>
      {children}
    </div>
  )
}

export default Large
