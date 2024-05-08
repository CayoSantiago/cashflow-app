import { cn } from '@/lib/utils'

const H2 = ({ children, className }) => {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </h2>
  )
}

export default H2
