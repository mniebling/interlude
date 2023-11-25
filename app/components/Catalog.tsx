import { Button } from '@mui/base'
import { Fragment, useState } from 'react'
import { Artists } from './Artists'
import { EditEntryModal, useEditEntryModal } from './EditEntryModal'
import { Tags } from './Tags'
import css from './Catalog.module.css'

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

			<h1>My Catalog</h1>
			<Button onClick={ openEditEntryModal }>Add an entry</Button>

			<ul className={ css.entryList }>
				{ Array.from(props.catalog).map(([key, val]) => (
					<li className={ css.entry } key={ key }>
						<div className={ css.title }>
							<div>{ val.data.name }</div>
							<div className={ css.artists }><Artists artists={ val.data.artists } /></div>
						</div>
						<div className={ css.tags }>
							<Tags tags={ val.tags } />
						</div>
						<div className={ css.actions }>
							<Button style={{ marginLeft: 15 }} onClick={ () => editEntry(val) }>Edit</Button>
							<Button style={{ marginLeft: 5 }} onClick={ () => removeEntry(val) }>Remove</Button>
						</div>
					</li>
				))}
			</ul>
		</Fragment>
	)
}
