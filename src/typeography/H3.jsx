import { cn } from '@/lib/utils'

const H3 = ({ children, className }) => {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}

export default H3
