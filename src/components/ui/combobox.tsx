import * as React from "react"

import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type ComboboxOption = {
  label: string
  value: string
  [key: string]: unknown
}

type ComboboxContextValue = {
  items: ComboboxOption[]
  filteredItems: ComboboxOption[]
  selectedItems: ComboboxOption[]
  multiple: boolean
  query: string
  setQuery: (value: string) => void
  isOpen: boolean
  open: () => void
  close: () => void
  toggleItem: (item: ComboboxOption) => void
  removeItem: (value: string) => void
  registerInput: (node: HTMLInputElement | null) => void
  focusInput: () => void
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useCombobox(component: string) {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error(`${component} must be used within a <Combobox />`)
  }
  return context
}

interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "defaultValue"> {
  items: ComboboxOption[]
  children: React.ReactNode
  multiple?: boolean
  value?: ComboboxOption[]
  defaultValue?: ComboboxOption[]
  onChange?: (items: ComboboxOption[]) => void
}

function Combobox({
  items,
  children,
  className,
  multiple = false,
  value,
  defaultValue,
  onChange,
  ...props
}: ComboboxProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const [uncontrolledValue, setUncontrolledValue] = React.useState<ComboboxOption[]>(
    defaultValue ?? [],
  )
  const isControlled = value !== undefined
  const selectedItems = React.useMemo(
    () => (isControlled ? (value ?? []) : uncontrolledValue),
    [isControlled, value, uncontrolledValue],
  )
  const normalizedSelected = React.useMemo(
    () => (multiple ? selectedItems : selectedItems.slice(0, 1)),
    [multiple, selectedItems],
  )

  const setSelectedItems = React.useCallback(
    (next: ComboboxOption[]) => {
      if (!isControlled) {
        setUncontrolledValue(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  React.useEffect(() => {
    if (!multiple && normalizedSelected.length > 1) {
      setSelectedItems(normalizedSelected.slice(0, 1))
    }
  }, [multiple, normalizedSelected, setSelectedItems])

  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items
    const term = query.toLowerCase()
    return items.filter((item) =>
      item.label.toLowerCase().includes(term) || item.value.toLowerCase().includes(term),
    )
  }, [items, query])

  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])

  const toggleItem = React.useCallback(
    (item: ComboboxOption) => {
      const exists = normalizedSelected.some((selected) => selected.value === item.value)
      let next: ComboboxOption[]
      if (multiple) {
        next = exists
          ? normalizedSelected.filter((selected) => selected.value !== item.value)
          : [...normalizedSelected, item]
      } else {
        next = exists ? [] : [item]
      }
      setSelectedItems(next)
      if (!multiple) {
        close()
      }
      setQuery("")
    },
    [close, multiple, normalizedSelected, setSelectedItems],
  )

  const removeItem = React.useCallback(
    (value: string) => {
      const next = normalizedSelected.filter((item) => item.value !== value)
      setSelectedItems(next)
    },
    [normalizedSelected, setSelectedItems],
  )

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [close])

  const contextValue = React.useMemo<ComboboxContextValue>(
    () => ({
      items,
      filteredItems,
      selectedItems: normalizedSelected,
      multiple,
      query,
      setQuery,
      isOpen,
      open,
      close,
      toggleItem,
      removeItem,
      registerInput: (node) => {
        inputRef.current = node
      },
      focusInput: () => {
        inputRef.current?.focus()
      },
    }),
    [
      items,
      filteredItems,
      normalizedSelected,
      multiple,
      query,
      isOpen,
      open,
      close,
      toggleItem,
      removeItem,
    ],
  )

  return (
    <ComboboxContext.Provider value={contextValue}>
      <div ref={rootRef} className={cn("relative", className)} data-slot="combobox" {...props}>
        {children}
      </div>
    </ComboboxContext.Provider>
  )
}

const ComboboxChips = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function ComboboxChips(
  { className, onClick, ...props },
  ref,
) {
  const { isOpen, focusInput } = useCombobox("ComboboxChips")
  return (
    <div
      ref={ref}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "flex min-h-[46px] flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 shadow-xs transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
        className,
      )}
      onClick={(event) => {
        focusInput()
        onClick?.(event)
      }}
      {...props}
    />
  )
})

interface ComboboxValueProps {
  children: (value: ComboboxOption[]) => React.ReactNode
}

function ComboboxValue({ children }: ComboboxValueProps) {
  const { selectedItems } = useCombobox("ComboboxValue")
  return <>{children(selectedItems)}</>
}

const ComboboxInput = React.forwardRef<HTMLInputElement, InputProps>(function ComboboxInput(
  { className, onFocus, onBlur, onKeyDown, ...props },
  ref,
) {
  const { query, setQuery, open, close, registerInput, selectedItems, removeItem } = useCombobox(
    "ComboboxInput",
  )

  return (
    <Input
      {...props}
      ref={(node) => {
        registerInput(node)
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      value={query}
      onFocus={(event) => {
        open()
        onFocus?.(event)
      }}
      onBlur={(event) => {
        const target = event.currentTarget
        window.setTimeout(() => {
          if (!target.parentElement?.parentElement?.contains(document.activeElement)) {
            close()
          }
        }, 120)
        onBlur?.(event)
      }}
      onKeyDown={(event) => {
        if (event.key === "Backspace" && query.length === 0 && selectedItems.length > 0) {
          removeItem(selectedItems[selectedItems.length - 1]?.value)
        }
        onKeyDown?.(event)
      }}
      onChange={(event) => {
        setQuery(event.target.value)
      }}
      className={cn(
        "h-auto flex-1 border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0",
        className,
      )}
    />
  )
})

interface ComboboxPopupProps extends React.HTMLAttributes<HTMLDivElement> { }

function ComboboxPopup({ className, children, ...props }: ComboboxPopupProps) {
  const { isOpen } = useCombobox("ComboboxPopup")
  if (!isOpen) return null

  return (
    <div
      className={cn(
        "absolute left-0 right-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl",
        className,
      )}
      data-slot="combobox-popup"
      {...props}
    >
      {children}
    </div>
  )
}

interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> { }

function ComboboxEmpty({ className, children, ...props }: ComboboxEmptyProps) {
  const { filteredItems } = useCombobox("ComboboxEmpty")
  if (filteredItems.length > 0) return null

  return (
    <div className={cn("px-3 py-4 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  )
}
interface ComboboxListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: (item: ComboboxOption) => React.ReactNode
}
// interface ComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {
//   children: (item: ComboboxOption) => React.ReactNode
// }

function ComboboxList({ className, children, ...props }: ComboboxListProps) {
  const { filteredItems } = useCombobox("ComboboxList")
  if (filteredItems.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} role="listbox" {...props}>
      {filteredItems.map((item) => (
        <React.Fragment key={item.value}>{children(item)}</React.Fragment>
      ))}
    </div>
  )
}

interface ComboboxItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: ComboboxOption
}

function ComboboxItem({ value, className, children, ...props }: ComboboxItemProps) {
  const { toggleItem, selectedItems } = useCombobox("ComboboxItem")
  const isSelected = selectedItems.some((item) => item.value === value.value)

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      data-selected={isSelected}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted data-[selected=true]:bg-muted",
        className,
      )}
      onMouseDown={(event) => event.preventDefault()}
      onClick={(event) => {
        props.onClick?.(event)
        toggleItem(value)
      }}
      {...props}
    >
      {children ?? value.label}
    </button>
  )
}

interface ComboboxChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value?: ComboboxOption
  removable?: boolean
}

const ComboboxChip = React.forwardRef<HTMLButtonElement, ComboboxChipProps>(function ComboboxChip(
  { value, removable = true, className, children, onClick, ...props },
  ref,
) {
  const { removeItem } = useCombobox("ComboboxChip")

  return (
    <button
      type="button"
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground transition hover:bg-muted/80",
        className,
      )}
      onClick={(event) => {
        if (removable && value) {
          removeItem(value.value)
        }
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </button>
  )
})

function ComboboxValueFallback({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export {
  Combobox,
  ComboboxChips,
  ComboboxValue,
  ComboboxInput,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChip,
  ComboboxValueFallback,
}
