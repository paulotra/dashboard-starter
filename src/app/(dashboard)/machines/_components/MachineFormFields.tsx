'use client'

import { useId } from 'react'
import { SAMPLE_MACHINES } from '@/lib/machines'
import Switch from '@/components/ui/Switch'
import FormField from '@/components/form/FormField'
import Input from '@/components/form/Input'
import Select from '@/components/form/Select'

/* ─── Types ────────────────────────────────────────────────────────── */

export interface MachineFieldValues {
  name: string
  active: boolean
  serialNumber: string
  category: string
  location: string
}

export interface MachineFormFieldsProps {
  values: MachineFieldValues
  onChange: (patch: Partial<MachineFieldValues>) => void
}

/* ─── Derive unique categories once (module-level, no re-computation) ── */

const CATEGORY_OPTIONS = Array.from(new Set(SAMPLE_MACHINES.map((m) => m.category)))
  .sort()
  .map((cat) => ({ label: cat, value: cat }))

/* ─── Component ─────────────────────────────────────────────────────── */

/**
 * Shared controlled field set used by AddMachineDrawer (and any future edit
 * mode). Renders:
 *   1. Machine Name (text, required)
 *   2. Active toggle row (Switch + description)
 *   3. Serial Number (text, required)
 *   4. Category (Select, required)
 *   5. Location (text, required)
 *
 * Does NOT include the thumbnail — that differs between Add and Edit.
 */
export default function MachineFormFields({ values, onChange }: MachineFormFieldsProps) {
  const machineNameId = useId()
  const activeId = useId()
  const serialNumberId = useId()
  const categoryId = useId()
  const locationId = useId()

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Machine Name */}
      <FormField label="Machine Name" required htmlFor={machineNameId}>
        <Input
          id={machineNameId}
          type="text"
          placeholder="e.g. BFC Classica GT 2 groeps"
          value={values.name}
          onChange={(e) => onChange({ name: e.target.value })}
          required
        />
      </FormField>

      {/* 2. Active toggle row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <label htmlFor={activeId} className="font-sans text-sm font-medium text-black">
            Active
          </label>
          <p id={`${activeId}-desc`} className="font-sans text-sm text-neutral-600">
            Machine is active and in use
          </p>
        </div>
        <Switch
          checked={values.active}
          onChange={(checked) => onChange({ active: checked })}
          aria-label="Active"
        />
      </div>

      {/* 3. Serial Number */}
      <FormField label="Serial Number" required htmlFor={serialNumberId}>
        <Input
          id={serialNumberId}
          type="text"
          placeholder="e.g. JE6-2021-4482"
          value={values.serialNumber}
          onChange={(e) => onChange({ serialNumber: e.target.value })}
          required
        />
      </FormField>

      {/* 4. Category */}
      <FormField label="Category" required htmlFor={categoryId}>
        <Select
          id={categoryId}
          placeholder="Select a category"
          options={CATEGORY_OPTIONS}
          value={values.category}
          onChange={(e) => onChange({ category: e.target.value })}
          required
        />
      </FormField>

      {/* 5. Location */}
      <FormField label="Location" required htmlFor={locationId}>
        <Input
          id={locationId}
          type="text"
          placeholder="e.g. Museumstraat 1, 1071 XX Amsterdam, Netherlands"
          value={values.location}
          onChange={(e) => onChange({ location: e.target.value })}
          required
        />
      </FormField>
    </div>
  )
}
