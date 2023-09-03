import * as React from 'react'
import clsx from 'clsx'

const Button = React.forwardRef(({ className, text, Svg, ...props }, ref) => {
  return (
    <button
      className={clsx('flex items-center text-white border rounded-lg px-3 py-2 mb-5', className)}
      ref={ref}
      {...props}
    >
      {Svg && <Svg />}
      {text}
    </button>
  )
})
Button.displayName = 'Button'

export { Button }
