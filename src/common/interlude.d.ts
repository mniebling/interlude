declare namespace Interlude {

	interface CatalogueItem {
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
}
