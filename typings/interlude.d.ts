declare namespace Interlude {

	interface CatalogEntry {
		/** ISO format */
		addedOn: string
		data: {
			artists: Spotify.Artist[]
			name: string
			id: string
			images: Spotify.Image[]
			release_date: string
			source: 'spotify'
			uri: string
		}
		notes: string
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
