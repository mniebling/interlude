import { createContext, useContext } from 'react'

/**
 * This context is used for managing the entire catalog that has been persisted
 * to the client. Currently this is the entire thing since we are backed by localstorage.
 */
export function useCatalogContext(): CatalogContextObject {

	const ctx = useContext(CatalogContext)
	if (!ctx) throw new Error('Catalog is undefined in the context.')

	return ctx
}

export interface CatalogContextObject {
	catalog: Interlude.Catalog | null
	addToCatalog: (entry: Interlude.CatalogEntry) => void
	removeFromCatalog: (key: string) => void
}

export const CatalogContext = createContext<CatalogContextObject | null>(null)


/**
 * This context is used for data relevant to the Spotify API.
 */
export function useSpotifyContext(): SpotifyContextObject {

	const ctx = useContext(SpotifyContext)
	if (!ctx) throw new Error('Spotify data is undefined in the context.')

	return ctx
}

export interface SpotifyContextObject {
	authToken: string
}

export const SpotifyContext = createContext<SpotifyContextObject | null>(null)
