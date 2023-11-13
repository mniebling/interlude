import { useEffect, useState } from 'react'
import { parseAlbumUrl, useSpotifyContext } from '../common'
import { Album } from './Album'
import { Tags } from './Tags'


/**
 * Renders UI for editing a catalog entry. It allows the user to search for an entry
 * if no value is provided for `props.entry`. If this value is provided, the user
 * can edit the existing entry.
 */
export function EditEntry(props: { entry?: Interlude.CatalogEntry }) {

	const { authToken } = useSpotifyContext()

	const [album, setAlbum] = useState<Spotify.Album>()
	const [notes, setNotes] = useState<string>('')
	const [tagString, setTagString] = useState<string>('')
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		setAlbum(props.entry?.data)
		setNotes(props.entry?.notes || '')
		setTagString((props.entry?.tags || []).join(','))
	}, [props.entry])

	function addEntry() {

		if (!album) throw new Error(`Can't add an entry without selecting an album.`)

		const entry: Interlude.CatalogEntry = {
			addedOn: new Date().toISOString(), // TODO: probably want to keep track of added and updated separately
			data: album,
			notes,
			source: 'spotify',
			tags: parseTags(tagString),
			type: 'album',
		}

		// TODO: This can become generic if we need to manage multiple events.
		window.dispatchEvent(new CustomEvent<Interlude.CatalogEntry>('Interlude:UpdateCatalog', { detail: entry }))
	}

	// TODO: Handle empty string
	function parseTags(input: string) {
		return input.split(',').map(tag => tag.trim())
	}

	async function getSpotifyInfo(input: string) {

		const { id } = parseAlbumUrl(input)

		if (!id) {
			return console.error(input)
		}

		// Move this into server components
		const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
			headers: {
				'Authorization': `Bearer ${authToken}`,
				'Content-Type': 'application/json',
			}
		})

		const album = await response.json() as Spotify.Album // there must be a better way, what's Ky do?
		setAlbum(album)
	}

	return (
		<div style={{ background: '#f5f5f5', padding: 10 }}>

			{/* If no entry is passed in, we need to do a search to find an album. The entry will be based on that. */}
			{ !props.entry && (
				<div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
					<label htmlFor='add-box'>Paste a Spotify album link:</label>
					<input id='add-box' value={ url } style={{ margin: '5px 0', maxWidth: '500px', width: '100%' }} onChange={ (e) => setUrl(e.target.value) } />
					<button onClick={ () => getSpotifyInfo(url) }>Get its info</button>
				</div>
			)}

			{ album && <Album album={ album } /> }

			{ album && (
				<div>
					<label>Tags (comma seperated):</label>
					<input value={ tagString } style={{ width: '300px' }} onChange={ (e) => setTagString(e.target.value) } />
					<Tags tags={ parseTags(tagString) } />

					<div style={{ display: 'flex', marginTop: 10 }}>
						<label>Notes:</label>
						<textarea style={{ height: 50, width: 300 }} value={ notes } onChange={ (e) => setNotes(e.target.value) } />
					</div>

					<button disabled={ !album } style={{ marginTop: 20 }} onClick={ addEntry }>
						{ props.entry ? 'Update my Catalog' : 'Add to my Catalog' }
					</button>
				</div>
			) }
		</div>
	)
}
