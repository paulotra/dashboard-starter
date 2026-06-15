'use client'

import { useState, useMemo } from 'react'
import { Download, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NavActions } from '@/components/layout/PageActionsContext'
import ProductsTable from './_components/ProductsTable'
import AddProductDrawer from './_components/AddProductDrawer'

export default function ProductsPage() {
  const [addOpen, setAddOpen] = useState(false)

  // Memoize so NavActions receives a stable reference between re-renders.
  // setAddOpen is stable (React guarantees setState setters never change),
  // so the deps array can safely stay [].
  const actions = useMemo(
    () => (
      <>
        <Button variant="secondary" icon={Download} onClick={() => console.log('export')}>
          Export
        </Button>
        <Button variant="primary" icon={Plus} onClick={() => setAddOpen(true)}>
          Add Product
        </Button>
      </>
    ),
    [] // setAddOpen is a stable React setter — safe to omit from deps
  )

  return (
    <>
      <NavActions>{actions}</NavActions>

      <div className="flex flex-col gap-3">
        <ProductsTable />
      </div>

      <AddProductDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />
    </>
  )
}
