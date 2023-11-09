import { useContext } from 'react'
import { CatalogContext, SpotifyContext } from '../pages/HomePage'

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
	catalog: Interlude.Catalog
	addToCatalog: (catalog: Interlude.Catalog, entry: Interlude.CatalogEntry) => void
	removeFromCatalog: (catalog: Interlude.Catalog, key: string) => void
}

/**
 * This context is used for data related to the Spotify API.
 * In the future, this could be a service-agnostic context providing auth/user data.
 */
export function useSpotifyContext(): SpotifyContextObject {

	const ctx = useContext(SpotifyContext)
	if (!ctx) throw new Error('Spotify data is undefined in the context.')

	return ctx
}

export interface SpotifyContextObject {
	authToken: string
}
