'use client'

/**
 * Page Actions Context
 *
 * Architecture: a React Context slot.
 *
 * Two ways to register actions:
 *
 * 1. <NavActions> (convenient) — wrap buttons as children. Re-registers on
 *    every render of the page, so pass memoized elements or keep the tree
 *    stable to avoid unnecessary context updates.
 *
 * 2. useNavActions(node, deps) (controlled) — call with an explicit deps
 *    array. Use this when the action node is built from dynamic values and
 *    you want React to decide when to re-register (same rules as useEffect).
 *
 * Both clear the slot automatically when the page unmounts.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// ─── Context ──────────────────────────────────────────────────────────────────

interface PageActionsContextValue {
  actions: ReactNode
  setActions: (node: ReactNode) => void
}

const PageActionsContext = createContext<PageActionsContextValue | null>(null)

export function usePageActions(): PageActionsContextValue {
  const ctx = useContext(PageActionsContext)
  if (!ctx) {
    throw new Error('usePageActions must be used within a PageActionsProvider')
  }
  return ctx
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PageActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<ReactNode>(null)

  const value = useMemo<PageActionsContextValue>(
    () => ({ actions, setActions }),
    [actions]
  )

  return (
    <PageActionsContext.Provider value={value}>
      {children}
    </PageActionsContext.Provider>
  )
}

// ─── NavActions (component API) ───────────────────────────────────────────────

/**
 * Declare page-level header actions declaratively.
 * Renders nothing itself; injects children into the Navigation slot.
 *
 *   <NavActions>
 *     <Button variant="secondary" icon={Download}>Export</Button>
 *     <Button variant="primary" icon={Plus}>Create Order</Button>
 *   </NavActions>
 */
export function NavActions({ children }: { children: ReactNode }) {
  const { setActions } = usePageActions()

  useEffect(() => {
    setActions(children)
    return () => setActions(null)
  }, [children, setActions])

  return null
}

// ─── useNavActions (hook API) ─────────────────────────────────────────────────

/**
 * Imperative alternative to <NavActions>.
 * Pass a node and an explicit deps array — the effect re-runs only when deps
 * change, giving you precise control over re-registration.
 *
 *   useNavActions(
 *     <Button onClick={handleExport}>Export</Button>,
 *     [handleExport]
 *   )
 */
export function useNavActions(
  node: ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: ReadonlyArray<any>
) {
  const { setActions } = usePageActions()

  useEffect(() => {
    setActions(node)
    return () => setActions(null)
    // deps is caller-controlled, matching the useEffect contract
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// ─── NavActionsSlot (rendered inside Navigation) ──────────────────────────────

/**
 * Place this inside Navigation. Renders the current page's actions or nothing.
 */
export function NavActionsSlot() {
  const { actions } = usePageActions()
  if (!actions) return null
  return <div className="flex items-center gap-2">{actions}</div>
}
