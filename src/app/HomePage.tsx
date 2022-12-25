'use client'

import { useEffect, useState } from 'react'
import { Album } from '../components/Album'

export interface HomePageProps {
	/** The Spotify API bearer token, will remove this from client components eventually */
	token: string
}

export default function HomePage(props: HomePageProps) {

	const [album, setAlbum] = useState<Spotify.Album>()
	const [catalogue, setCatalogue] = useState<Map<string, Interlude.CatalogueItem>>()
	const [notes, setNotes] = useState<string>('')
	const [tagString, setTagString] = useState<string>('')
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		const json = JSON.parse(localStorage.getItem('catalogue_v1') || '{}')
		const catalogue = new Map<string, Interlude.CatalogueItem>(Object.entries(json))
		console.info('initialize', catalogue)
		setCatalogue(catalogue)
	}, [])

	async function getInfoForUri(uri: string) {

		if (!uri.includes('spotify:')) return console.error(`spotify uris are separated by :, did you use a url instead?`)
		if (!uri.includes('album') || !uri.includes('spotify')) return console.error(`That's not a spotify album uri!`)

		const id = uri.split(':')[2]
		console.info(id)

		if (!id) {
			return console.error(uri)
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

		setNotes('')
		setTagString('')
	}

	function parseTags(input: string) {
		return input.split(',').map(tag => tag.trim())
	}

	function addToCatalogue() {

		if (!album) return console.error(`Can't add, no album is selected somehow`)
		if (!catalogue) return console.error(`Catalogue wasn't initialized from localStorage correctly`)

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

		setCatalogue(new Map(catalogue.set(album.id, interludeItem)))

		localStorage.setItem(
			'catalogue_v1',
			JSON.stringify(Object.fromEntries(catalogue.entries())),
		)

		console.log('added!', JSON.parse(localStorage.getItem('catalogue_v1') || '{}'))
	}

	return (
		<>
			<h1>Interlude</h1>
			<div>An app to help organize and think about the music you listen to.</div>
			<br />
			<label htmlFor='add-box'>Paste a Spotify album uri (opt-click Share):</label>
			<input name='add-box' value={ url } style={{ width: '500px' }} onChange={ (e) => setUrl(e.target.value) } />
			<button onClick={ () => getInfoForUri(url) }>Get its info</button>

			{ album && <Album album={ album } /> }

			{ album && (
				<div>
					<label>Tags (comma seperated):</label>
					<input value={ tagString } onChange={ (e) => setTagString(e.target.value) } />
					<div style={{ color: '#999' }}>{ parseTags(tagString).toString() }</div>

					<div style={{ display: 'flex', marginTop: 10 }}>
						<label>Notes:</label>
						<textarea value={ notes } onChange={ (e) => setNotes(e.target.value) } />
					</div>

					<button style={{ marginTop: 20 }} onClick={ addToCatalogue }>Add to my catalogue</button>
				</div>
			) }

			{ catalogue && (
				<>
					<hr />
					<h2>My Catalogue</h2>
					<ul>
						{ Array.from(catalogue).map(([key, val]) => (
							<li key={ key } style={{ marginBottom: 10 }}>
								<div>{ val.data.artists[0].name } — { val.data.name }</div>
								<div style={{ color: '#999' }}>{ val.tags.toString() }</div>
							</li>
						))}
					</ul>
				</>
			) }
		</>
	)
}
