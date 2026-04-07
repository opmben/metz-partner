import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--accent)] text-[var(--bg)] hover:opacity-90 active:scale-95',
        destructive:
          'bg-[#FF6B6B] text-[var(--bg)] hover:opacity-90',
        outline:
          'border border-[var(--border-hover)] bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[rgba(240,237,232,0.2)]',
        secondary:
          'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[rgba(240,237,232,0.12)]',
        ghost:
          'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]',
        link:
          'text-[var(--accent)] underline-offset-4 hover:underline p-0 h-auto normal-case tracking-normal',
      },
      size: {
        default: 'h-9 px-5 py-2',
        sm: 'h-8 px-3 text-[0.7rem]',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9 rounded-md normal-case tracking-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
