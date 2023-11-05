import { createContext, useContext } from 'react'

export interface CatalogContextObject {
	catalog: Interlude.Catalog | null
	addToCatalog: (entry: Interlude.CatalogEntry) => void
	removeFromCatalog: (key: string) => void
}

export const CatalogContext = createContext<CatalogContextObject | null>(null)

export function useCatalogContext(): CatalogContextObject {

	const ctx = useContext(CatalogContext)
	if (!ctx) throw new Error('Catalog is undefined in the context.')

	return ctx
}
