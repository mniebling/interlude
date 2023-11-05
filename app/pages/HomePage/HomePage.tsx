// import { CatalogContext, getLocalCatalog, writeLocalCatalog } from '../../common'
// import { Artists, EmptyCatalog, Footer, Header, NewEntry, Tags } from '../../components'
import { Fragment, useEffect, useState } from 'react'
import { SpotifyTokenResult } from '@/api/spotify-token'
import { EmptyCatalog } from '@/app/components/EmptyCatalogue'


export function HomePage() {

	const [authToken, setAuthToken] = useState<string | null>(null)

	useEffect(() => {
		getAuthToken().then(setAuthToken)
	}, [])

	async function getAuthToken() {

		const response = await fetch('/api/spotify-token')
		const result = await response.json() as SpotifyTokenResult
		return result.token
	}

	if (!authToken) return null

	return (
		<Fragment>
			<h1>Interlude</h1>
			<p>Api online: { (status || '').toString() }</p>
			<p>Auth token: { authToken }</p>

			<EmptyCatalog token={ authToken } />
		</Fragment>
	)

	// const [catalog, setCatalog] = useState<Interlude.Catalog | null>(null)
	// const [showNewEntry, setShowNewEntry] = useState<boolean>(false)

	// useEffect(() => {
		// setCatalog(getLocalCatalog())
	// }, [])

	// function addToCatalog(entry: Interlude.CatalogEntry) {

	// 	console.info('Add to Catalog', entry)

	// 	if (!Catalog) return console.error(`Catalog was not initialized correctly`)
	// 	if (Catalog.get(entry.data.id)) return console.error(`Already in the Catalog, update is TODO`)

	// 	setShowNewEntry(false)
	// 	setCatalog(new Map(Catalog.set(entry.data.id, entry)))
	// 	writeLocalCatalog(Catalog)
	// }

	// function removeFromCatalog(key: string) {

	// 	console.info('Remove from Catalog', key)

	// 	if (!Catalog) return console.error(`Catalog was not initialized correctly`)

	// 	if (Catalog.delete(key)) {
	// 		console.info('deleted', key)
	// 		setCatalog(new Map(Catalog))
	// 		writeLocalCatalog(Catalog)
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
