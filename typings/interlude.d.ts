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
}
