declare namespace Interlude {

	interface CatalogueEntry {
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

	type Catalogue = Map<string, CatalogueEntry>
}
