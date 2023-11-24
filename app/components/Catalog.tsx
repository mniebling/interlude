import { Button } from '@mui/base'
import { Fragment, useState } from 'react'
import { Artists } from './Artists'
import { EditEntryModal, useEditEntryModal } from './EditEntryModal'
import { Tags } from './Tags'

export interface CatalogProps {
	catalog: Interlude.Catalog
}

export function Catalog(props: CatalogProps) {

	const { showEditEntryModal, closeEditEntryModal, openEditEntryModal } = useEditEntryModal()

	const [entry, setEntry] = useState<Interlude.CatalogEntry>()

	function editEntry(entry: Interlude.CatalogEntry) {
		setEntry(entry)
		openEditEntryModal()
	}

	function removeEntry(entry: Interlude.CatalogEntry) {
		// TODO: This can become generic if we need to manage multiple events.
		window.dispatchEvent(new CustomEvent<string>('Interlude:RemoveFromCatalog', { detail: entry.data.id }))
		closeEditEntryModal()
	}

	return (
		<Fragment>
			{ showEditEntryModal && <EditEntryModal entry={ entry } close={ closeEditEntryModal } /> }

			<h2 style={{ alignItems: 'center', display: 'flex' }}>
				<span style={{ marginRight: 25 }}>My Catalog</span>
				<Button onClick={ openEditEntryModal }>Add an entry</Button>
			</h2>

			<ul style={{ borderTop: '1px solid var(--color-subtle)', paddingTop: '20px' }}>
				{ Array.from(props.catalog).map(([key, val]) => (
					<li key={ key } style={{ marginBottom: 20 }}>
						<div>
							<span><Artists artists={ val.data.artists } /> — { val.data.name }</span>
							<Button style={{ marginLeft: 15 }} onClick={ () => editEntry(val) }>Edit</Button>
							<Button style={{ marginLeft: 5 }} onClick={ () => removeEntry(val) }>Remove</Button>
						</div>
						<Tags tags={ val.tags } />
						<div style={{ color: '#555', fontSize: '0.9rem', marginTop: 10, maxWidth: 400 }}>{ val.notes }</div>
					</li>
				))}
			</ul>
		</Fragment>
	)
}
