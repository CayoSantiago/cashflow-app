import { cn } from '@/lib/utils'

const H1 = ({ children, className }) => {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  )
}

export default H1
