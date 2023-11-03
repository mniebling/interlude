// import { CatalogueContext, getLocalCatalogue, writeLocalCatalogue } from '../../common'
// import { Artists, EmptyCatalogue, Footer, Header, NewEntry, Tags } from '../../components'
import { Fragment, useEffect, useState } from 'react'
import { SpotifyTokenResult } from '@/api/spotify-token'


export function HomePage() {

	const [authToken, setAuthToken] = useState<string | null>(null)
	const [status, setStatus] = useState<boolean | undefined>()

	useEffect(() => {
		getStatus().then(setStatus)
		getAuthToken().then(setAuthToken)
	}, [])

	async function getStatus() {

		const response = await fetch('/api/status')
		console.log(response.ok)
		return response.ok
	}

	async function getAuthToken() {

		const response = await fetch('/api/spotify-token')

		if (!response.ok) {
			console.error(`Auth request failed`)
		}

		const result = await response.json() as SpotifyTokenResult
		return result.token
	}


	return (
		<Fragment>
			<h1>Interlude</h1>
			<p>Api online: { (status || '').toString() }</p>
			<p>Auth token: { authToken }</p>
		</Fragment>
	)

	// const [catalogue, setCatalogue] = useState<Interlude.Catalogue | null>(null)
	// const [showNewEntry, setShowNewEntry] = useState<boolean>(false)

	// useEffect(() => {
		// setCatalogue(getLocalCatalogue())
	// }, [])

	// function addToCatalogue(entry: Interlude.CatalogueEntry) {

	// 	console.info('Add to catalogue', entry)

	// 	if (!catalogue) return console.error(`Catalogue was not initialized correctly`)
	// 	if (catalogue.get(entry.data.id)) return console.error(`Already in the catalogue, update is TODO`)

	// 	setShowNewEntry(false)
	// 	setCatalogue(new Map(catalogue.set(entry.data.id, entry)))
	// 	writeLocalCatalogue(catalogue)
	// }

	// function removeFromCatalogue(key: string) {

	// 	console.info('Remove from catalogue', key)

	// 	if (!catalogue) return console.error(`Catalogue was not initialized correctly`)

	// 	if (catalogue.delete(key)) {
	// 		console.info('deleted', key)
	// 		setCatalogue(new Map(catalogue))
	// 		writeLocalCatalogue(catalogue)
	// 		return
	// 	}

	// 	console.error(`Can't remove ${key}, it's not in the catalogue`)
	// }

	// return (
	// 	<CatalogueContext.Provider value={{ catalogue, addToCatalogue, removeFromCatalogue }}>
	// 		<Header />

	// 		{ catalogue && catalogue.size > 0 && (
	// 			<div style={{ marginBottom: 50, padding: 10 }}>
	// 				<h2>My Catalogue <button onClick={ () => setShowNewEntry(true) }>Add an entry</button></h2>

	// 				{ showNewEntry && <NewEntry token={ props.token } /> }

	// 				<ul>
	// 					{ Array.from(catalogue).map(([key, val]) => (
	// 						<li key={ key } style={{ marginBottom: 20 }}>
	// 							<div>
	// 								<span><Artists artists={ val.data.artists } /> — { val.data.name }</span>
	// 								<button style={{ marginLeft: 5 }} onClick={ () => removeFromCatalogue(key) }>Remove</button>
	// 							</div>
	// 							<Tags tags={ val.tags } />
	// 							<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
	// 						</li>
	// 					))}
	// 				</ul>
	// 			</div>
	// 		) }

	// 		{ catalogue?.size === 0 && <EmptyCatalogue token={ props.token } /> }

	// 		<Footer />
	// 	</CatalogueContext.Provider>
	// )
}
