import { cn } from '@/lib/utils'

const H4 = ({ children, className }) => {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  )
}

export default H4
