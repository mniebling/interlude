import { Button } from '@mui/base'
import { Fragment, useEffect, useState } from 'react'
import { Artists } from './Artists'
import { EditEntry } from './EditEntry'
import { Tags } from './Tags'

export interface CatalogProps {
	catalog: Interlude.Catalog
}

export function Catalog(props: CatalogProps) {

	// These two state objects are only used to manage the edit/add UI.
	// Should definitely figure out a way to refactor all this into one place and invoke it.
	const [entry, setEntry] = useState<Interlude.CatalogEntry>()
	const [showEditEntry, setShowEditEntry] = useState<boolean>(false)

	useEffect(() => {
		setShowEditEntry(false)
	}, [props.catalog])

	function editEntry(entry: Interlude.CatalogEntry) {
		setShowEditEntry(true)
		setEntry(entry)
	}

	function removeEntry(entry: Interlude.CatalogEntry) {
		// TODO: This can become generic if we need to manage multiple events.
		window.dispatchEvent(new CustomEvent<string>('Interlude:RemoveFromCatalog', { detail: entry.data.id }))
	}

	return (
		<Fragment>
			{ showEditEntry && <EditEntry entry={ entry } /> }
			<h2 style={{ alignItems: 'center', display: 'flex' }}>
				<span style={{ marginRight: 25 }}>My Catalog</span>
				<Button onClick={ () => setShowEditEntry(true) }>Add an entry</Button>
			</h2>

			<hr />

			<ul>
				{ Array.from(props.catalog).map(([key, val]) => (
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
		</Fragment>
	)
}
