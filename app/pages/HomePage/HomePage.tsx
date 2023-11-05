import { SpotifyTokenResult } from '@/api/spotify-token'
import { CatalogContext, getLocalCatalog } from '@/app/common'
import { Header } from '@/app/components'
import { EmptyCatalog } from '@/app/components/EmptyCatalog'
import { useEffect, useState } from 'react'


export function HomePage() {

	const [authToken, setAuthToken] = useState<string | null>(null)
	const [catalog, setCatalog] = useState<Interlude.Catalog | null>(null)
	// const [showNewEntry, setShowNewEntry] = useState<boolean>(false)

	useEffect(() => {
		getAuthToken().then(setAuthToken)
		setCatalog(getLocalCatalog())
	}, [])

	async function getAuthToken() {

		const response = await fetch('/api/spotify-token')
		const result = await response.json() as SpotifyTokenResult
		console.log(`Spotify API token: ${result.token}`)
		return result.token
	}

	if (!authToken) return null

	return (
		<CatalogContext.Provider value={{ catalog, addToCatalog, removeFromCatalog }}>
			<Header />
			<EmptyCatalog token={ authToken } />
		</CatalogContext.Provider>
	)


	// Temporary...
	function addToCatalog() {
		return 'noop'
	}

	function removeFromCatalog() {
		return 'noop'
	}

	// function addToCatalog(entry: Interlude.CatalogEntry) {

	// 	console.info('Add to Catalog', entry)

	// 	if (!catalog) return console.error(`Catalog was not initialized correctly`)
	// 	if (catalog.get(entry.data.id)) return console.error(`Already in the Catalog, update is TODO`)

	// 	// setShowNewEntry(false)
	// 	setCatalog(new Map(catalog.set(entry.data.id, entry)))
	// 	writeLocalCatalog(catalog)
	// }

	// function removeFromCatalog(key: string) {

	// 	console.info('Remove from Catalog', key)

	// 	if (!catalog) return console.error(`Catalog was not initialized correctly`)

	// 	if (catalog.delete(key)) {
	// 		console.info('deleted', key)
	// 		setCatalog(new Map(catalog))
	// 		writeLocalCatalog(catalog)
	// 		return
	// 	}

	// 	console.error(`Can't remove ${key}, it's not in the Catalog`)
	// }

	// return (
	// 	<CatalogContext.Provider value={{ Catalog, addToCatalog, removeFromCatalog }}>
	// 		<Header />

	// 		{ Catalog && Catalog.size > 0 && (
	// 			<div style={{ marginBottom: 50, padding: 10 }}>
	// 				<h2>My Catalog <button onClick={ () => setShowNewEntry(true) }>Add an entry</button></h2>

	// 				{ showNewEntry && <NewEntry token={ props.token } /> }

	// 				<ul>
	// 					{ Array.from(Catalog).map(([key, val]) => (
	// 						<li key={ key } style={{ marginBottom: 20 }}>
	// 							<div>
	// 								<span><Artists artists={ val.data.artists } /> — { val.data.name }</span>
	// 								<button style={{ marginLeft: 5 }} onClick={ () => removeFromCatalog(key) }>Remove</button>
	// 							</div>
	// 							<Tags tags={ val.tags } />
	// 							<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
	// 						</li>
	// 					))}
	// 				</ul>
	// 			</div>
	// 		) }

	// 		{ Catalog?.size === 0 && <EmptyCatalog token={ props.token } /> }

	// 		<Footer />
	// 	</CatalogContext.Provider>
	// )
}
