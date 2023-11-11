import { writeLocalCatalog } from './local-storage'

/**
 * Attempts to add an entry to the catalog, returning the updated catalog.
 * Updating an existing entry is currently not supported, so this function errors
 * if you try to do that.
 */
export function updateCatalog(
	catalog: Interlude.Catalog,
	entry: Interlude.CatalogEntry,
): Interlude.Catalog {

	if (!catalog) throw new Error(`The Catalog doesn't exist; was it initialized incorrectly?`)

	// Add the new data.
	const updated = new Map(catalog.set(entry.data.id, entry))

	// Persist the new catalog.
	// Currently this is a synchronous side effect; eventually this would be an async
	// operation and we should ideally error check it and return the value it returns instead.
	writeLocalCatalog(updated)

	return updated
}

export function removeFromCatalog(
	catalog: Interlude.Catalog,
	key: string,
): Interlude.Catalog {

	console.log('Try to remove from Catalog', key)

	if (!catalog) throw new Error(`The Catalog doesn't exist; was it initialized incorrectly?`)

	if (catalog.delete(key)) {

		const updated = new Map(catalog)

		// Persist the new catalog.
		// Currently this is a synchronous side effect; eventually this would be an async
		// operation and we should ideally error check it and return the value it returns instead.
		writeLocalCatalog(updated)

		return updated
	}

	throw new Error(`Can't remove ${key}, it's not in the Catalog.`)
}
