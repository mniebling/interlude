import { getLocalCatalog, removeFromCatalog, SpotifyContext, SpotifyContextObject, updateCatalog, writeLocalCatalog } from '@/app/common'
import { Catalog, EmptyCatalog, Footer } from '@/app/components'
import { useEffect, useState } from 'react'
import { getAuthToken } from './get-auth-token'
import css from './HomePage.module.css'


export function HomePage() {

	const [catalog, setCatalog] = useState<Interlude.Catalog>()
	const [spotify, setSpotify] = useState<SpotifyContextObject>()

	// HomePage manages the Catalog state by listening to update events.
	// TODO: Make these methods generic when the events become generic. A function that returns a listener with the provided method.
	function updateCatalogListener(event: CustomEvent<Interlude.CatalogEntry>) {

		// Apply the update to the view model.
		const updated = updateCatalog(catalog || new Map(), event.detail)
		setCatalog(updated)

		// Persist the new catalog (TODO: roll back the view model if the persist fails).
		writeLocalCatalog(updated)
	}

	function removeFromCatalogListener(event: CustomEvent<string>) {

		// Apply the update to the view model.
		const updated = removeFromCatalog(catalog || new Map(), event.detail)
		setCatalog(updated)

		// Persist the new catalog (TODO: roll back the view model if the persist fails).
		writeLocalCatalog(updated)
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

	// TODO: A lot of this should be in an app wrapper, and home page is just one
	// possible child route under that wrapper. Refactor this when adding a 2nd route.
	return (
		<SpotifyContext.Provider value={ spotify }>
			<div className={ css.layout }>
				{/* The blank slate shows instructions and allows the user to add a first entry. */}
				{ catalog.size === 0 && <EmptyCatalog /> }

				{ catalog.size > 0 && (
					<div style={{ marginBottom: 50, padding: 10 }}>
						<Catalog catalog={ catalog } />
					</div>
				)}

				<Footer />

			</div>
		</SpotifyContext.Provider>
	)
}
