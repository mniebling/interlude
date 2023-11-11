declare namespace Interlude {

	interface CatalogEntry {
		/** ISO format */
		addedOn: string
		data: Spotify.Album
		notes: string
		source: 'spotify'
		tags: string[]
		type: 'album'
	}

	type Catalog = Map<string, CatalogEntry>

	// API types
	interface ApiError {
		message: string
	}

	export namespace Events {

		type AddToCatalog = CustomEvent<{
			entry: Interlude.CatalogEntry
		}>
	}
}
