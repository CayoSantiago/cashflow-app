import { Tooltip as TT, TooltipContent, TooltipTrigger } from './ui/tooltip'

const Tooltip = ({ children, content, delayDuration = 0, ...props }) => {
  return (
    <TT delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side='top' align='center' {...props}>
        {content}
      </TooltipContent>
    </TT>
  )
}

export default Tooltip
