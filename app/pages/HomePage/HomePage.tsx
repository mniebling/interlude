import { SpotifyTokenResult } from '@/api/spotify-token'
import { addToCatalog, CatalogContextObject, getLocalCatalog, removeFromCatalog, SpotifyContextObject } from '@/app/common'
import { Artists, EmptyCatalog, Footer, Header, NewEntry, Tags } from '@/app/components'
import { createContext, useEffect, useState } from 'react'

export const CatalogContext = createContext<CatalogContextObject | null>(null)
export const SpotifyContext = createContext<SpotifyContextObject | null>(null)


export function HomePage() {

	const [catalog, setCatalog] = useState<Interlude.Catalog>()
	const [spotify, setSpotify] = useState<SpotifyContextObject>()

	// This is only used once the blank slate disappears; refactor this once we componentize Catalog.
	const [showNewEntry, setShowNewEntry] = useState<boolean>(false)

	useEffect(() => {
		getAuthToken().then(authToken => setSpotify({ authToken }))
		setCatalog(getLocalCatalog())
	}, [])

	// This is pretty janky, definitely need to improve how we hide the new entry UI.
	useEffect(() => {
		setShowNewEntry(false)
	}, [catalog?.size])

	async function getAuthToken() {

		const response = await fetch('/api/spotify-token')

		if (!response.ok) throw new Error(`Couldn't retrieve a Spotify auth token.`)

		const result = await response.json() as SpotifyTokenResult

		console.log(`Spotify API token: ${result.token}`)
		return result.token
	}

	if (!spotify?.authToken || !catalog) return null

	return (
		<SpotifyContext.Provider value={ spotify }>
			<CatalogContext.Provider value={{
					catalog,
					// We need to apply the results of the update functions to local state so they
					// apply to the provided context value and re-render components. Is this the best way?
					addToCatalog: (catalog, entry) => setCatalog(addToCatalog(catalog, entry)),
					removeFromCatalog: (catalog, key) => setCatalog(removeFromCatalog(catalog, key)),
				}}>
				<Header />

				{/* The blank slate shows instructions and allows the user to add a first entry. */}
				{ catalog.size === 0 && <EmptyCatalog /> }

				{/* This is a naive version of the actual catalog; it should definitely get componentized. */}
				{ catalog.size > 0 && (
					<div style={{ marginBottom: 50, padding: 10 }}>
						<h2>My Catalog <button onClick={ () => setShowNewEntry(true) }>Add an entry</button></h2>

						{ showNewEntry && <NewEntry /> }

						<ul>
							{ Array.from(catalog).map(([key, val]) => (
								<li key={ key } style={{ marginBottom: 20 }}>
									<div>
										<span><Artists artists={ val.data.artists } /> — { val.data.name }</span>
										<button style={{ marginLeft: 5 }} onClick={ () => setCatalog(removeFromCatalog(catalog, key)) }>Remove</button>
									</div>
									<Tags tags={ val.tags } />
									<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
								</li>
							))}
						</ul>
					</div>
				)}

				<Footer />
			</CatalogContext.Provider>
		</SpotifyContext.Provider>
	)
}
