export function parseAlbumUrl(input: string) {

	if (!input.includes('spotify')) throw new Error(`${input} is not a spotify link`)
	if (!input.includes('album')) throw new Error(`That's not a spotify album link!`)

	let parts = input.split(':')

	// Spotify uri of the form spotify:album:7rpLc55Vg0N5S5drt7MOMt
	// Parts:                  0       1     2
	if (parts.length === 3) {
		return {
			id: parts[2],
			type: parts[1],
		}
	}

	// Spotify url of the form https://open.spotify.com/album/7rpLc55Vg0N5S5drt7MOMt?si=ED1vm4UqTFm4AJCg9p5G7w
	// Parts:                  0     1 2                3     4
	parts = input.split('/')

	return {
		id: parts[4].split('?')[0],
		type: parts[3],
	}
}
