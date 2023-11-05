'use client'

const LOCAL_STORAGE_KEY = 'Catalog_v1'

export function getLocalCatalog(): Interlude.Catalog {

	// If there's no Catalog yet, create a blank one
	const json = JSON.parse(localStorage.getItem('Catalog_v1') || '{}')
	const Catalog = new Map<string, Interlude.CatalogEntry>(Object.entries(json))

	return Catalog
}

export function writeLocalCatalog(Catalog: Interlude.Catalog) {

	const stringified = JSON.stringify(Object.fromEntries(Catalog.entries()))

	localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
}
