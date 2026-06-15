'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DrawerWrapper, DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer'
import Button from '@/components/ui/Button'
import ImageDropzone from '@/components/form/ImageDropzone'
import MachineFormFields from './MachineFormFields'
import type { MachineFieldValues } from './MachineFormFields'

/* ─── Types ────────────────────────────────────────────────────────── */

export interface AddMachineDrawerProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: MachineFieldValues & { thumbnail: File | null }) => void
}

/* ─── Initial state ─────────────────────────────────────────────────── */

const EMPTY_FIELDS: MachineFieldValues = {
  name: '',
  active: true,
  serialNumber: '',
  category: '',
  location: '',
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function AddMachineDrawer({
  open,
  onClose,
  onSubmit,
}: AddMachineDrawerProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [fields, setFields] = useState<MachineFieldValues>(EMPTY_FIELDS)

  function handleChange(patch: Partial<MachineFieldValues>) {
    setFields((prev) => ({ ...prev, ...patch }))
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    onSubmit?.({ ...fields, thumbnail })
    onClose()
  }

  function handleClose() {
    onClose()
  }

  return (
    <DrawerWrapper open={open} onClose={handleClose}>
      <DrawerHeader title="Add Machine" />

      {/*
        Wrap Body + Footer in a single <form> so Enter submits
        and the primary button's type="submit" works correctly.
      */}
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <DrawerBody>
          <div className="flex flex-col gap-5">
            {/* 1. Thumbnail */}
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-black">Thumbnail</span>
              <ImageDropzone
                label="Upload Machine Image"
                hint="PNG, JPG up to 5MB"
                onFileSelect={(file) => setThumbnail(file)}
              />
            </div>

            {/* Divider */}
            <hr className="border-neutral-400" />

            {/* 2–6. Shared field set */}
            <MachineFormFields values={fields} onChange={handleChange} />
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary-filled" icon={Plus} type="submit">
            Create Machine
          </Button>
        </DrawerFooter>
      </form>
    </DrawerWrapper>
  )
}
