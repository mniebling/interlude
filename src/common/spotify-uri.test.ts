import { expect, test } from 'vitest'
import { parseAlbumUrl } from './spotify-uri'


const cases = [
	{
		name: 'album url with query param',
		input: 'https://open.spotify.com/album/7rpLc55Vg0N5S5drt7MOMt?si=DHrsj_w2Q0uqKZDl-795Aw',
		expected: { type: 'album', id: '7rpLc55Vg0N5S5drt7MOMt' },
	},
	{
		name: 'album url w/o query param',
		input: 'https://open.spotify.com/album/7rpLc55Vg0N5S5drt7MOMt',
		expected: { type: 'album', id: '7rpLc55Vg0N5S5drt7MOMt' },
	},
	{
		name: 'album uri',
		input: 'spotify:album:7rpLc55Vg0N5S5drt7MOMt',
		expected: { type: 'album', id: '7rpLc55Vg0N5S5drt7MOMt' },
	},
]

cases.forEach(c => {
	test(c.name, () => {
		expect(parseAlbumUrl(c.input)).toEqual(c.expected)
	})
})
