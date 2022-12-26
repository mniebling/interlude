'use client'

import { useEffect, useState } from 'react'
import { getLocalCatalogue, writeLocalCatalogue } from '../common/local-storage'
import { parseAlbumUrl } from '../common/spotify-uri'
import { Album } from '../components/Album'

export interface HomePageProps {
	/** The Spotify API bearer token, will remove this from client components eventually */
	token: string
}

export default function HomePage(props: HomePageProps) {

	const [album, setAlbum] = useState<Spotify.Album>()
	const [catalogue, setCatalogue] = useState<Interlude.Catalogue>()
	const [notes, setNotes] = useState<string>('')
	const [tagString, setTagString] = useState<string>('')
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		setCatalogue(getLocalCatalogue())
	}, [])

	async function getSpotifyInfo(input: string) {

		const { id } = parseAlbumUrl(input)

		if (!id) {
			return console.error(input)
		}

		// Move this into server components
		const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
			headers: {
				'Authorization': `Bearer ${props.token}`,
				'Content-Type': 'application/json',
			}
		})

		const album = await response.json() as Spotify.Album // there must be a better way, what's Ky do?
		setAlbum(album)

		setUrl('')
		setNotes('')
		setTagString('')
	}

	function parseTags(input: string) {
		return input.split(',').map(tag => tag.trim())
	}

	function addToCatalogue(album: Spotify.Album) {

		if (!album) return console.error(`Can't add, no album is selected somehow`)
		if (!catalogue) return console.error(`Catalogue was not initialized correctly`)

		const interludeItem: Interlude.CatalogueItem = {
			addedOn: new Date().toISOString(),
			data: {
				artists: album.artists,
				name: album.name,
				id: album.id,
				images: album.images,
				release_date: album.release_date,
				source: 'spotify',
				uri: album.uri,
			},
			notes,
			tags: parseTags(tagString),
			type: 'album',
		}

		console.log('add to catalogue', interludeItem)

		if (catalogue.get(album.id)) return console.error(`Already in the catalogue, update is TODO`)

		writeLocalCatalogue(catalogue)
		setCatalogue(new Map(catalogue.set(album.id, interludeItem)))
	}

	function removeFromCatalogue(key: string) {

		if (!catalogue) return console.error(`Catalogue was not initialized correctly`)

		if (catalogue.delete(key)) {
			setCatalogue(new Map(catalogue))
			writeLocalCatalogue(catalogue)
			return
		}

		console.error(`Can't remove ${key}, it's not in the catalogue`)
	}

	return (
		<>
			<h1>Interlude</h1>
			<div>An app to help organize and think about the music you listen to.</div>
			<div>Currently supporting only Spotify, only albums, and writing data to local storage.</div>
			<div>You can't edit catalogue entries yet.</div>
			<div>To start over, type <code>localStorage.clear()</code> in the console.</div>
			<br />
			<label htmlFor='add-box'>Paste a Spotify album link:</label>
			<input name='add-box' value={ url } style={{ width: '500px' }} onChange={ (e) => setUrl(e.target.value) } />
			<button onClick={ () => getSpotifyInfo(url) }>Get its info</button>

			{ album && <Album album={ album } /> }

			{ album && (
				<div>
					<label>Tags (comma seperated):</label>
					<input value={ tagString } style={{ width: '300px' }} onChange={ (e) => setTagString(e.target.value) } />
					<div style={{ color: '#999' }}>{ parseTags(tagString).toString() }</div>

					<div style={{ display: 'flex', marginTop: 10 }}>
						<label>Notes:</label>
						<textarea style={{ height: 50, width: 300 }} value={ notes } onChange={ (e) => setNotes(e.target.value) } />
					</div>

					<button style={{ marginTop: 20 }} onClick={ () => addToCatalogue(album) }>Add to my catalogue</button>
				</div>
			) }

			{ catalogue && (
				<div style={{ marginBottom: 50 }}>
					<hr />
					<h2>My Catalogue</h2>

					{ catalogue.size === 0 && (
						<div>Your catalogue is empty. Find an album above, write some tags or notes and add it!</div>
					) }

					<ul>
						{ Array.from(catalogue).map(([key, val]) => (
							<li key={ key } style={{ marginBottom: 20 }}>
								<div>
									<span>{ val.data.artists[0].name } — { val.data.name }</span>
									<button style={{ marginLeft: 5 }} onClick={ () => removeFromCatalogue(key) }>Remove</button>
								</div>
								<div style={{ color: '#999' }}>{ val.tags.toString() }</div>
								<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
							</li>
						))}
					</ul>
				</div>
			) }
		</>
	)
}
