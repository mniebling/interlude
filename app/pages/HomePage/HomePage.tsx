import { CatalogContextObject, getLocalCatalog, removeFromCatalog, SpotifyContextObject, updateCatalog } from '@/app/common'
import { Artists, EditEntry, EmptyCatalog, Footer, Header, Tags } from '@/app/components'
import { createContext, useEffect, useState } from 'react'
import { getAuthToken } from './get-auth-token'

export const CatalogContext = createContext<CatalogContextObject | null>(null)
export const SpotifyContext = createContext<SpotifyContextObject | null>(null)


export function HomePage() {

	const [catalog, setCatalog] = useState<Interlude.Catalog>()
	const [entry, setEntry] = useState<Interlude.CatalogEntry>()
	const [showEditEntry, setShowEditEntry] = useState<boolean>(false)
	const [spotify, setSpotify] = useState<SpotifyContextObject>()

	useEffect(() => {
		getAuthToken().then(authToken => setSpotify({ authToken }))
		setCatalog(getLocalCatalog())
	}, [])

	if (!spotify?.authToken || !catalog) return null

	return (
		<SpotifyContext.Provider value={ spotify }>
			<CatalogContext.Provider value={{
					catalog,
					// We need to apply the results of the update functions to local state so they
					// apply to the provided context value and re-render components. Is this the best way?
					addToCatalog: (catalog, entry) => {
						setCatalog(updateCatalog(catalog, entry))
						setEntry(undefined)
						setShowEditEntry(false)
					},
					removeFromCatalog: (catalog, key) => setCatalog(removeFromCatalog(catalog, key)),
				}}>
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

	function editEntry(entry: Interlude.CatalogEntry) {
		setShowEditEntry(true)
		setEntry(entry)
	}
}
