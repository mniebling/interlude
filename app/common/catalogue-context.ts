import { createContext, useContext } from 'react'

export interface CatalogueContextObject {
	catalogue: Interlude.Catalogue | null
	addToCatalogue: (entry: Interlude.CatalogueEntry) => void
	removeFromCatalogue: (key: string) => void
}

export const CatalogueContext = createContext<CatalogueContextObject | null>(null)

export function useCatalogueContext(): CatalogueContextObject {

	const ctx = useContext(CatalogueContext)
	if (!ctx) throw new Error('Catalogue is undefined in the context.')

	return ctx
}
