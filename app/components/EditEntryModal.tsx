import { Button, Input } from '@mui/base'
import { Fragment, useEffect, useState } from 'react'
import { parseAlbumUrl, useSpotifyContext } from '../common'
import { Album } from './Album'
import { Tags } from './Tags'

/**
 * A hook that provides control of the EditEntryModal's state.
 */
export function useEditEntryModal() {

	const [showEditEntryModal, setShowEditEntryModal] = useState<boolean>(false)

	const openEditEntryModal = () => setShowEditEntryModal(true)
	const closeEditEntryModal = () => setShowEditEntryModal(false)

	return { showEditEntryModal, openEditEntryModal, closeEditEntryModal }
}

export interface EditEntryModalProps {
	/** Passing an entry is optional; leave this blank if the user is adding a new entry from scratch. */
	entry?: Interlude.CatalogEntry
	/** Pass in the `closeEditEntryModal` function from the consuming component's instance of the `useEditEntryModal` hook. */
	close: () => void
}

/**
 * Renders UI for editing a catalog entry. It allows the user to search for an entry
 * if no value is provided for `props.entry`. If this value _is_ provided, the user can edit the existing entry.
 *
 * To show the modal, consume `showEditEntryModal` and `openEditEntryModal` from the `useEditEntryModal` hook.
 * Use `showEditEntryModal` to conditionally render the component and then call `openEditEntryModal` to show it.
 *
 * Make sure to pass in the instance of `closeEditEntryModal` from the hook as well so the modal can close itself.
 * (That's required because hooks share stateful _logic_, but not state itself.)
 */
export function EditEntryModal(props: EditEntryModalProps) {

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

		props.close()
	}

	function removeEntry() {
		// TODO: This can become generic if we need to manage multiple events.
		window.dispatchEvent(new CustomEvent<string>('Interlude:RemoveFromCatalog', { detail: props.entry?.data.id }))

		props.close()
	}

	function parseTags(input: string) {

		if (input.length === 0) return []

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
		<div style={{ background: 'rgb(255 255 255 / 0.05)', padding: 10 }}>

			{/* If no entry is passed in, we need to do a search to find an album. The entry will be based on that. */}
			{ !props.entry && (
				<Fragment>
					<label htmlFor='add-box'>Paste a Spotify album link:</label>
					<Input id='add-box' value={ url } style={{ marginBottom: '5px', maxWidth: '500px', width: '100%' }} onChange={ (e) => setUrl(e.target.value) } />
					<Button onClick={ () => getSpotifyInfo(url) }>Get its info</Button>
				</Fragment>
			)}

			{ album && <Album album={ album } /> }

			{ album && (
				<div>
					<label htmlFor='tags'>Tags (comma seperated)</label>
					<Input id='tags' value={ tagString } style={{ width: '300px' }} onChange={ (e) => setTagString(e.target.value) } />

					<Tags style={{ margin: '4px 0 8px 0' }} tags={ parseTags(tagString) } />

					<label htmlFor='notes'>Notes</label>
					<Input
						id='notes'
						multiline
						onChange={ (e) => setNotes(e.target.value) }
						style={{ height: 50, width: 300 }}
						value={ notes }
					/>

					<Button disabled={ !album } style={{ marginTop: 20, marginRight: 5 }} onClick={ addEntry }>
						{ props.entry ? 'Update my Catalog' : 'Add to my Catalog' }
					</Button>

					{ props.entry && (
						<Button
							slotProps={{ root: { className: 'isDangerous' } }}
							onClick={ removeEntry }
						>Remove this entry</Button>
					)}
				</div>
			) }
		</div>
	)
}
