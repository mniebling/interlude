import { getLocalCatalog, removeFromCatalog, SpotifyContext, SpotifyContextObject, updateCatalog, writeLocalCatalog } from '@/app/common'
import { Artists, EditEntry, EmptyCatalog, Footer, Header, Tags } from '@/app/components'
import { useEffect, useState } from 'react'
import { getAuthToken } from './get-auth-token'


export function HomePage() {

	const [catalog, setCatalog] = useState<Interlude.Catalog>()
	const [entry, setEntry] = useState<Interlude.CatalogEntry>()
	const [showEditEntry, setShowEditEntry] = useState<boolean>(false)
	const [spotify, setSpotify] = useState<SpotifyContextObject>()

	// HomePage manages the Catalog state by listening to update events.
	// TODO: Make these methods generic when the events become generic. A function that returns a listener with the provided method.
	function updateCatalogListener(event: CustomEvent<Interlude.CatalogEntry>) {

		// Apply the update to the view model.
		const updated = updateCatalog(catalog || new Map(), event.detail)
		setCatalog(updated)

		// Persist the new catalog (TODO: roll back the view model if the persist fails).
		writeLocalCatalog(updated)

		// Hide the edit entry (TODO: decouple this from HomePage state).
		setShowEditEntry(false)
	}

	function removeFromCatalogListener(event: CustomEvent<string>) {

		// Apply the update to the view model.
		const updated = removeFromCatalog(catalog || new Map(), event.detail)
		setCatalog(updated)

		// Persist the new catalog (TODO: roll back the view model if the persist fails).
		writeLocalCatalog(updated)

		// Hide the edit entry (TODO: decouple this from HomePage state).
		setShowEditEntry(false)
	}

	useEffect(() => {
		window.addEventListener('Interlude:UpdateCatalog', updateCatalogListener, { passive: true })
		window.addEventListener('Interlude:RemoveFromCatalog', removeFromCatalogListener, { passive: true })

		return () => {
			window.removeEventListener('Interlude:UpdateCatalog', updateCatalogListener)
			window.removeEventListener('Interlude:RemoveFromCatalog', removeFromCatalogListener)
		}
	}, [catalog]) // We need to re-attach the listeners so we always have the most recent catalog state.

	// We want to block rendering the app until we have a Spotify token and a catalog.
	// These are both pretty fast results right now, but we might figure out a way to
	// make these non-blocking if they become more expensive in the future. For example, once
	// the catalog is no longer loaded from local storage.
	useEffect(() => {
		getAuthToken().then(authToken => setSpotify({ authToken }))
		setCatalog(getLocalCatalog())
	}, [])

	if (!spotify?.authToken || !catalog) return null

	return (
		<SpotifyContext.Provider value={ spotify }>
			<Header />

			{/* The blank slate shows instructions and allows the user to add a first entry. */}
			{ catalog.size === 0 && <EmptyCatalog /> }

			{/* This is a naive version of the actual catalog; it should definitely get componentized. */}
			{ catalog.size > 0 && (
				<div style={{ marginBottom: 50, padding: 10 }}>
					<h2>My Catalog <button onClick={ () => setShowEditEntry(true) }>Add an entry</button></h2>

					{ showEditEntry && <EditEntry entry={ entry } /> }

					<ul>
						{ Array.from(catalog).map(([key, val]) => (
							<li key={ key } style={{ marginBottom: 20 }}>
								<div>
									<span><Artists artists={ val.data.artists } /> — { val.data.name }</span>
									<button style={{ marginLeft: 5 }} onClick={ () => editEntry(val) }>Edit</button>
									<button style={{ marginLeft: 5 }} onClick={ () => removeEntry(val) }>Remove</button>
								</div>
								<Tags tags={ val.tags } />
								<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
							</li>
						))}
					</ul>
				</div>
			)}

			<Footer />
		</SpotifyContext.Provider>
	)

	function editEntry(entry: Interlude.CatalogEntry) {
		setShowEditEntry(true)
		setEntry(entry)
	}

	// TODO: It's silly to dispatch an event and handle it in the same component.
	// But this functionality will move out of HomePage sooner rather than later.
	function removeEntry(entry: Interlude.CatalogEntry) {
		// TODO: This can become generic if we need to manage multiple events.
		window.dispatchEvent(new CustomEvent<string>('Interlude:RemoveFromCatalog', { detail: entry.data.id }))
	}
}
