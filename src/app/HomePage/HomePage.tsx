'use client'

import { useEffect, useState } from 'react'
import { getLocalCatalogue, writeLocalCatalogue } from '../../common/local-storage'
import { Artists, NewEntry, Tags } from '../../components'
import { Footer } from './Footer'
import { Header } from './Header'

export interface HomePageProps {
	/** The Spotify API bearer token, will remove this from client components eventually */
	token: string
}

export default function HomePage(props: HomePageProps) {

	const [catalogue, setCatalogue] = useState<Interlude.Catalogue>()
	const [showNewEntry, setShowNewEntry] = useState<boolean>(false)

	useEffect(() => {
		setCatalogue(getLocalCatalogue())
	}, [])

	function addToCatalogue(entry: Interlude.CatalogueEntry) {

		if (!catalogue) return console.error(`Catalogue was not initialized correctly`)
		if (catalogue.get(entry.data.id)) return console.error(`Already in the catalogue, update is TODO`)

		setShowNewEntry(false)
		setCatalogue(new Map(catalogue.set(entry.data.id, entry)))
		writeLocalCatalogue(catalogue)
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
			<Header />

			{ catalogue && catalogue.size > 0 && (
				<div style={{ marginBottom: 50, padding: 10 }}>
					<h2>My Catalogue <button onClick={ () => setShowNewEntry(true) }>Add an entry</button></h2>

					{ showNewEntry && <NewEntry token={ props.token } onAdd={ (entry) => addToCatalogue(entry) } /> }

					<ul>
						{ Array.from(catalogue).map(([key, val]) => (
							<li key={ key } style={{ marginBottom: 20 }}>
								<div>
									<span><Artists artists={ val.data.artists } /> — { val.data.name }</span>
									<button style={{ marginLeft: 5 }} onClick={ () => removeFromCatalogue(key) }>Remove</button>
								</div>
								<Tags tags={ val.tags } />
								<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
							</li>
						))}
					</ul>
				</div>
			) }

			{ catalogue?.size === 0 && (
				<div style={{ padding: 10 }}>
					<div>Interlude is an app to help organize and think about the music you listen to.</div>
					<div style={{ marginBottom: 20 }}>Right now, your catalogue is empty. Find an album, write some tags or notes and add it!</div>

					<NewEntry token={ props.token } onAdd={ (entry) => addToCatalogue(entry) } />
				</div>
			) }

			<Footer />
		</>
	)
}
