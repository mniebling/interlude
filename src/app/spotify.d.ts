declare namespace Spotify {
	interface Artist {
		href: string
		id: string
		name: string
		type: 'artist'
		uri: string
	}

	interface Album {
		artists: Spotify.Artist[]
		id: string
		images: Spotify.Images[]
		name: string
		release_date: string
		uri: string
	}

	interface Image {
		height: number
		url: string
		width: number
	}
}
