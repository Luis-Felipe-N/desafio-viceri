import * as React from "react"
import { cn } from "@/lib/utils"

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Field(
  { className, ...props },
  ref,
) {
  return (
    <div ref={ref} data-slot="field" className={cn("grid gap-2", className)} {...props} />
  )
})

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(function FieldLabel({ className, ...props }, ref) {
  return (
    <label
      ref={ref}
      data-slot="field-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
})

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function FieldDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="field-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
})

export { Field, FieldLabel, FieldDescription }
