const LOCAL_STORAGE_KEY = 'catalogue_v1'


export function getLocalCatalogue(): Interlude.Catalogue {

	// If there's no catalogue yet, create a blank one
	const json = JSON.parse(localStorage.getItem('catalogue_v1') || '{}')
	const catalogue = new Map<string, Interlude.CatalogueEntry>(Object.entries(json))

	return catalogue
}

export function writeLocalCatalogue(catalogue: Interlude.Catalogue) {

	const stringified = JSON.stringify(Object.fromEntries(catalogue.entries()))

	localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
}
