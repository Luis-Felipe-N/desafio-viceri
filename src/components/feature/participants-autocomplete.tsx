import { useMemo } from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
  type ComboboxOption,
} from "@/components/ui/combobox"
import { FieldDescription } from "@/components/ui/field"
import { MOCK_USERS } from "@/utils/mock-user"

interface ParticipantsAutocompleteProps {
  value: string[]
  onChange: (ids: string[]) => void
  inputId?: string
}

const USER_OPTIONS = MOCK_USERS.map((user) => ({
  label: user.name,
  value: user.id,
  hint: user.squad,
}))

export function ParticipantsAutocomplete({ value, onChange, inputId }: ParticipantsAutocompleteProps) {
  const safeValue = useMemo(() => value ?? [], [value])

  const selectedOptions = useMemo(
    () =>
      safeValue
        .map((id) => USER_OPTIONS.find((option) => option.value === id))
        .filter((option): option is (typeof USER_OPTIONS)[number] => Boolean(option)),
    [safeValue],
  )

  // Correção aqui: usar ComboboxOption[] em vez de typeof USER_OPTIONS
  function handleValueChange(options: ComboboxOption[]) {
    onChange(options.map((option) => option.value))
  }

  return (
    <div className="space-y-2">
      <Combobox
        items={USER_OPTIONS}
        multiple
        value={selectedOptions}
        onChange={handleValueChange}
      >
        <ComboboxChips>
          <ComboboxValue>
            {(selected) => (
              <>
                {selected.map((option) => (
                  <ComboboxChip key={option.value} value={option} aria-label={option.label}>
                    {option.label}
                  </ComboboxChip>
                ))}
                <ComboboxInput
                  id={inputId}
                  aria-label="Selecionar participantes"
                  placeholder={selected.length > 0 ? "Adicionar outro nome..." : "Busque por nome ou squad"}
                  autoComplete="off"
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxPopup>
          <ComboboxEmpty>Nenhum colaborador encontrado.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  {"hint" in item && (
                    <p className="text-xs text-muted-foreground">{String(item.hint)}</p>
                  )}
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>

      <FieldDescription>
        {selectedOptions.length > 0
          ? `${selectedOptions.length} participante${selectedOptions.length > 1 ? "s" : ""} selecionado${selectedOptions.length > 1 ? "s" : ""}.`
          : "Selecione um ou mais participantes usando a busca."}
      </FieldDescription>
    </div>
  )
}