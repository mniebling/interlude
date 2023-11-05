const LOCAL_STORAGE_KEY = 'Catalog_v1'

export function getLocalCatalog(): Interlude.Catalog {

	// If there's no Catalog yet, return a blank one
	const json = JSON.parse(localStorage.getItem('Catalog_v1') || '{}')
	const catalog = new Map<string, Interlude.CatalogEntry>(Object.entries(json))

	return catalog
}

export function writeLocalCatalog(catalog: Interlude.Catalog) {

	const stringified = JSON.stringify(Object.fromEntries(catalog.entries()))

	localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
}
